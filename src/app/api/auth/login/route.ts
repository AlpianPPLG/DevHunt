import { type NextRequest, NextResponse } from "next/server"
import { queryRow } from "@/lib/database"
import { verifyPassword, generateToken, setAuthCookie } from "@/lib/auth"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // Find user by email
    const user = await queryRow("SELECT id, name, username, email, password FROM users WHERE email = ?", [email])

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate token and set cookie
    const token = generateToken(user.id)
    await setAuthCookie(token)

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }

    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
