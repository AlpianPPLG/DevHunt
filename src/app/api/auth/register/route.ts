import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"
import { hashPassword, generateToken, setAuthCookie } from "@/lib/auth"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, username, email, password } = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = (await executeQuery("SELECT id FROM users WHERE email = ? OR username = ?", [
      email,
      username,
    ])) as any[]

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User with this email or username already exists" }, { status: 400 })
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    const userId = crypto.randomUUID()

    await executeQuery("INSERT INTO users (id, name, username, email, password) VALUES (?, ?, ?, ?, ?)", [
      userId,
      name,
      username,
      email,
      hashedPassword,
    ])

    // Generate token and set cookie
    const token = generateToken(userId)
    await setAuthCookie(token)

    return NextResponse.json({ message: "User created successfully", userId }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }

    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
