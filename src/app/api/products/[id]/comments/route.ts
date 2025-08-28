import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { executeQuery, queryRows } from "@/lib/database"
import { z } from "zod"

interface RouteParams {
  params: Promise<{ id: string }>
}

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment too long"),
  parent_comment_id: z.string().optional(),
})

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: productId } = await params

    // Fetch all comments for the product with user info
    const comments = await queryRows(
      `SELECT 
        c.id, c.content, c.parent_comment_id, c.created_at,
        u.id as user_id, u.name as user_name, u.username, u.avatar_url
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.product_id = ?
       ORDER BY c.created_at ASC`,
      [productId],
    )

    // Build threaded structure
    const commentMap = new Map()
    const rootComments: any[] = []

    // First pass: create comment objects
    comments.forEach((comment: any) => {
      commentMap.set(comment.id, {
        ...comment,
        replies: [],
      })
    })

    // Second pass: build tree structure
    comments.forEach((comment: any) => {
      const commentObj = commentMap.get(comment.id)
      if (comment.parent_comment_id) {
        const parent = commentMap.get(comment.parent_comment_id)
        if (parent) {
          parent.replies.push(commentObj)
        }
      } else {
        rootComments.push(commentObj)
      }
    })

    return NextResponse.json({ comments: rootComments })
  } catch (error) {
    console.error("Failed to fetch comments:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: productId } = await params
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { content, parent_comment_id } = commentSchema.parse(body)

    // Create comment
    const commentId = crypto.randomUUID()
    await executeQuery(
      "INSERT INTO comments (id, content, user_id, product_id, parent_comment_id) VALUES (?, ?, ?, ?, ?)",
      [commentId, content, user.id, productId, parent_comment_id || null],
    )

    // Fetch the created comment with user info
    const newComment = await queryRows(
      `SELECT 
        c.id, c.content, c.parent_comment_id, c.created_at,
        u.id as user_id, u.name as user_name, u.username, u.avatar_url
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.id = ?`,
      [commentId],
    )

    return NextResponse.json({ message: "Comment created successfully", comment: newComment[0] }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }

    console.error("Comment creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
