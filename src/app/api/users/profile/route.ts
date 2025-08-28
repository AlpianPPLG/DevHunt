import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { executeQuery, queryRow } from "@/lib/database"
import { z, ZodError } from "zod"

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  bio: z.string().max(500, "Bio too long").optional(),
  avatar_url: z.string().url("Please enter a valid avatar URL").optional().or(z.literal("")),
})

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { name, username, bio, avatar_url } = updateProfileSchema.parse(body)

    // Check if username is taken by another user
    if (username !== user.username) {
      const existingUser = await queryRow("SELECT id FROM users WHERE username = ? AND id != ?", [username, user.id])
      if (existingUser) {
        return NextResponse.json({ error: "Username is already taken" }, { status: 400 })
      }
    }

    // Update user profile
    await executeQuery(
      "UPDATE users SET name = ?, username = ?, bio = ?, avatar_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [name, username, bio || null, avatar_url || null, user.id],
    )

    return NextResponse.json({ message: "Profile updated successfully" })
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const firstError = error.issues[0]
      return NextResponse.json({ error: firstError?.message || "Validation error" }, { status: 400 })
    }

    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
