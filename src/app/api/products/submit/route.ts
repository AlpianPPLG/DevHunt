import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { executeQuery, queryRow } from "@/lib/database"
import { z } from "zod"

const submitProductSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters").max(100, "Product name too long"),
  tagline: z.string().min(10, "Tagline must be at least 10 characters").max(255, "Tagline too long"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  website_url: z.string().url("Please enter a valid website URL"),
  thumbnail_url: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
  github_url: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal("")),
  demo_url: z.string().url("Please enter a valid demo URL").optional().or(z.literal("")),
  tags: z.array(z.string()).min(1, "Please select at least one tag").max(5, "Maximum 5 tags allowed"),
})

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()
    const { name, tagline, description, website_url, thumbnail_url, github_url, demo_url, tags } = submitProductSchema.parse(body)

    // Check if product with same name or URL already exists
    const existingProduct = await queryRow("SELECT id FROM products WHERE name = ? OR website_url = ?", [
      name,
      website_url,
    ])

    if (existingProduct) {
      return NextResponse.json({ error: "A product with this name or website URL already exists" }, { status: 400 })
    }

    // Create product
    const productId = crypto.randomUUID()
    await executeQuery(
      "INSERT INTO products (id, name, tagline, description, website_url, thumbnail_url, github_url, demo_url, submitter_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [productId, name, tagline, description, website_url, thumbnail_url || null, github_url || null, demo_url || null, user.id],
    )

    // Handle tags
    for (const tagName of tags) {
      // Get or create tag
      let tag = await queryRow("SELECT id FROM tags WHERE name = ?", [tagName])

      if (!tag) {
        await executeQuery("INSERT INTO tags (name) VALUES (?)", [tagName])
        tag = await queryRow("SELECT id FROM tags WHERE name = ?", [tagName])
      }

      // Link product to tag
      await executeQuery("INSERT INTO product_tags (product_id, tag_id) VALUES (?, ?)", [productId, tag.id])
    }

    return NextResponse.json({ message: "Product submitted successfully", productId }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || "Validation error" }, { status: 400 })
    }

    console.error("Product submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
