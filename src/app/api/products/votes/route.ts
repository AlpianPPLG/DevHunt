import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { queryRows } from "@/lib/database"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ votes: [] })
    }

    // Get all products the user has voted for
    const votes = await queryRows("SELECT product_id FROM votes WHERE user_id = ?", [user.id])

    const votedProductIds = votes.map((vote: any) => vote.product_id)

    return NextResponse.json({ votes: votedProductIds })
  } catch (error) {
    console.error("Failed to fetch user votes:", error)
    return NextResponse.json({ error: "Failed to fetch votes" }, { status: 500 })
  }
}
