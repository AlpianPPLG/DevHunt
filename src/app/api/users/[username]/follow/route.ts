import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { queryRow, executeQuery } from "@/lib/database"

interface RouteParams {
  params: Promise<{ username: string }>
}

// POST - Follow user
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const { username } = await params

    // Get target user
    const targetUser = await queryRow(
      "SELECT id FROM users WHERE username = ?",
      [username]
    )

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    if (targetUser.id === user.id) {
      return NextResponse.json(
        { error: "You cannot follow yourself" },
        { status: 400 }
      )
    }

    // Check if already following
    const existingFollow = await queryRow(
      "SELECT follower_id FROM user_follows WHERE follower_id = ? AND following_id = ?",
      [user.id, targetUser.id]
    )

    if (existingFollow) {
      return NextResponse.json(
        { error: "You are already following this user" },
        { status: 400 }
      )
    }

    // Add follow relationship
    await executeQuery(
      "INSERT INTO user_follows (follower_id, following_id) VALUES (?, ?)",
      [user.id, targetUser.id]
    )

    // Update follower counts
    await executeQuery(
      "UPDATE users SET following_count = following_count + 1 WHERE id = ?",
      [user.id]
    )
    
    await executeQuery(
      "UPDATE users SET followers_count = followers_count + 1 WHERE id = ?",
      [targetUser.id]
    )

    return NextResponse.json({
      message: "Successfully followed user"
    }, { status: 201 })

  } catch (error) {
    console.error("Failed to follow user:", error)
    return NextResponse.json(
      { error: "Failed to follow user" },
      { status: 500 }
    )
  }
}

// DELETE - Unfollow user
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const { username } = await params

    // Get target user
    const targetUser = await queryRow(
      "SELECT id FROM users WHERE username = ?",
      [username]
    )

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Check if following
    const existingFollow = await queryRow(
      "SELECT follower_id FROM user_follows WHERE follower_id = ? AND following_id = ?",
      [user.id, targetUser.id]
    )

    if (!existingFollow) {
      return NextResponse.json(
        { error: "You are not following this user" },
        { status: 400 }
      )
    }

    // Remove follow relationship
    await executeQuery(
      "DELETE FROM user_follows WHERE follower_id = ? AND following_id = ?",
      [user.id, targetUser.id]
    )

    // Update follower counts
    await executeQuery(
      "UPDATE users SET following_count = following_count - 1 WHERE id = ?",
      [user.id]
    )
    
    await executeQuery(
      "UPDATE users SET followers_count = followers_count - 1 WHERE id = ?",
      [targetUser.id]
    )

    return NextResponse.json({
      message: "Successfully unfollowed user"
    })

  } catch (error) {
    console.error("Failed to unfollow user:", error)
    return NextResponse.json(
      { error: "Failed to unfollow user" },
      { status: 500 }
    )
  }
}