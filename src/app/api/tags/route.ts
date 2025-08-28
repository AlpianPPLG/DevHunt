import { NextResponse } from "next/server"
import { queryRows } from "@/lib/database"

export async function GET() {
  try {
    const tags = await queryRows("SELECT id, name, description FROM tags ORDER BY name ASC")
    return NextResponse.json({ tags })
  } catch (error) {
    console.error("Failed to fetch tags:", error)
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 })
  }
}
