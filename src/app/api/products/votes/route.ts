/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { queryRows } from "@/lib/database"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ upvotes: [], downvotes: [] })
    }

    // Get all products the user has voted for, separated by vote type
    const votes = await queryRows(
      "SELECT product_id, vote_type FROM votes WHERE user_id = ?", 
      [user.id]
    )

    // Separate upvotes and downvotes
    const upvotes = votes
      .filter((vote: any) => vote.vote_type === 'upvote')
      .map((vote: any) => vote.product_id)
    
    const downvotes = votes
      .filter((vote: any) => vote.vote_type === 'downvote')
      .map((vote: any) => vote.product_id)

    return NextResponse.json({ 
      votes: upvotes, // For backward compatibility with existing code
      upvotes, 
      downvotes 
    })
  } catch (error) {
    console.error("Failed to fetch user votes:", error)
    return NextResponse.json({ error: "Failed to fetch votes" }, { status: 500 })
  }
}