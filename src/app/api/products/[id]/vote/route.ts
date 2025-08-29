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
    const searchParams = request.nextUrl.searchParams
    const voteType = searchParams.get('type') || 'upvote'
    
    if (!['upvote', 'downvote'].includes(voteType)) {
      return NextResponse.json({ error: "Invalid vote type" }, { status: 400 })
    }

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Check if product exists
    const product = await queryRow("SELECT id FROM products WHERE id = ?", [productId])
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Check if user already voted with this vote type
    const existingVote = await queryRow(
      "SELECT user_id FROM votes WHERE user_id = ? AND product_id = ? AND vote_type = ?", 
      [user.id, productId, voteType]
    )

    if (existingVote) {
      return NextResponse.json({ error: `You have already ${voteType}d this product` }, { status: 400 })
    }

    // If user has the opposite vote type, remove it first
    const oppositeVoteType = voteType === 'upvote' ? 'downvote' : 'upvote'
    await executeQuery(
      "DELETE FROM votes WHERE user_id = ? AND product_id = ? AND vote_type = ?",
      [user.id, productId, oppositeVoteType]
    )

    // Add vote
    await executeQuery(
      "INSERT INTO votes (user_id, product_id, vote_type) VALUES (?, ?, ?)",
      [user.id, productId, voteType]
    )

    // Get updated vote counts
    const upvoteCount = await queryRow(
      "SELECT COUNT(*) as count FROM votes WHERE product_id = ? AND vote_type = 'upvote'", 
      [productId]
    )
    
    const downvoteCount = await queryRow(
      "SELECT COUNT(*) as count FROM votes WHERE product_id = ? AND vote_type = 'downvote'", 
      [productId]
    )

    return NextResponse.json({
      message: `${voteType} added successfully`,
      upvoteCount: upvoteCount.count,
      downvoteCount: downvoteCount.count,
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
    const searchParams = request.nextUrl.searchParams
    const voteType = searchParams.get('type') || 'upvote'
    
    if (!['upvote', 'downvote'].includes(voteType)) {
      return NextResponse.json({ error: "Invalid vote type" }, { status: 400 })
    }

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Remove vote
    await executeQuery(
      "DELETE FROM votes WHERE user_id = ? AND product_id = ? AND vote_type = ?", 
      [user.id, productId, voteType]
    )

    // Get updated vote counts
    const upvoteCount = await queryRow(
      "SELECT COUNT(*) as count FROM votes WHERE product_id = ? AND vote_type = 'upvote'", 
      [productId]
    )
    
    const downvoteCount = await queryRow(
      "SELECT COUNT(*) as count FROM votes WHERE product_id = ? AND vote_type = 'downvote'", 
      [productId]
    )

    return NextResponse.json({
      message: `${voteType} removed successfully`,
      upvoteCount: upvoteCount.count,
      downvoteCount: downvoteCount.count,
      isVoted: false,
    })
  } catch (error) {
    console.error("Unvote error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}