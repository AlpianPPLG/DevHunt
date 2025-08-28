import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { executeQuery, queryRow } from "@/lib/database"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: productId } = await params
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Check if product exists
    const product = await queryRow("SELECT id FROM products WHERE id = ?", [productId])
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Check if user already voted
    const existingVote = await queryRow("SELECT user_id FROM votes WHERE user_id = ? AND product_id = ?", [
      user.id,
      productId,
    ])

    if (existingVote) {
      return NextResponse.json({ error: "You have already voted for this product" }, { status: 400 })
    }

    // Add vote
    await executeQuery("INSERT INTO votes (user_id, product_id) VALUES (?, ?)", [user.id, productId])

    // Get updated vote count
    const voteCount = await queryRow("SELECT COUNT(*) as count FROM votes WHERE product_id = ?", [productId])

    return NextResponse.json({
      message: "Vote added successfully",
      voteCount: voteCount.count,
      isVoted: true,
    })
  } catch (error) {
    console.error("Vote error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id: productId } = await params
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Remove vote
    const result = await executeQuery("DELETE FROM votes WHERE user_id = ? AND product_id = ?", [user.id, productId])

    // Get updated vote count
    const voteCount = await queryRow("SELECT COUNT(*) as count FROM votes WHERE product_id = ?", [productId])

    return NextResponse.json({
      message: "Vote removed successfully",
      voteCount: voteCount.count,
      isVoted: false,
    })
  } catch (error) {
    console.error("Unvote error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
