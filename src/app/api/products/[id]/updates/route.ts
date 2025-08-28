import { NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth"
import { queryRows, queryRow, executeQuery } from "@/lib/database"

interface RouteParams {
  params: Promise<{ id: string }>
}

const CreateUpdateSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(5000),
  version: z.string().max(50).optional(),
  update_type: z.enum(["feature", "bugfix", "breaking", "security", "other"]).default("other"),
  is_major: z.boolean().default(false)
})

// GET - Fetch product updates
export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id: productId } = await params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "20")

    // Verify product exists
    const product = await queryRow(
      "SELECT id, name FROM products WHERE id = ? AND status = 'active'",
      [productId]
    )

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Fetch updates
    const updates = await queryRows(
      `SELECT 
        id, title, content, version, update_type, is_major, created_at
       FROM product_updates
       WHERE product_id = ?
       ORDER BY created_at DESC
       LIMIT ?`,
      [productId, Math.min(limit, 50)]
    )

    return NextResponse.json({
      product: {
        id: product.id,
        name: product.name
      },
      updates
    })

  } catch (error) {
    console.error("Failed to fetch product updates:", error)
    return NextResponse.json(
      { error: "Failed to fetch updates" },
      { status: 500 }
    )
  }
}

// POST - Create new update
export async function POST(
  request: Request,
  { params }: RouteParams
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const { id: productId } = await params
    const body = await request.json()
    const validatedData = CreateUpdateSchema.parse(body)

    // Verify product exists and user owns it
    const product = await queryRow(
      "SELECT id, submitter_id FROM products WHERE id = ? AND status = 'active'",
      [productId]
    )

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    if (product.submitter_id !== user.id) {
      return NextResponse.json(
        { error: "You can only post updates for your own products" },
        { status: 403 }
      )
    }

    // Check update limit (max 50 updates per product)
    const updateCount = await queryRow(
      "SELECT COUNT(*) as count FROM product_updates WHERE product_id = ?",
      [productId]
    )

    if (updateCount.count >= 50) {
      return NextResponse.json(
        { error: "Maximum 50 updates allowed per product" },
        { status: 400 }
      )
    }

    // Create update
    const updateId = `update-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    await executeQuery(
      `INSERT INTO product_updates 
       (id, product_id, title, content, version, update_type, is_major)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        updateId,
        productId,
        validatedData.title,
        validatedData.content,
        validatedData.version || null,
        validatedData.update_type,
        validatedData.is_major
      ]
    )

    // Update product's updated_at timestamp
    await executeQuery(
      "UPDATE products SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [productId]
    )

    // Fetch the created update
    const newUpdate = await queryRow(
      `SELECT 
        id, title, content, version, update_type, is_major, created_at
       FROM product_updates 
       WHERE id = ?`,
      [updateId]
    )

    return NextResponse.json({
      message: "Update posted successfully",
      update: newUpdate
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Failed to create update:", error)
    return NextResponse.json(
      { error: "Failed to create update" },
      { status: 500 }
    )
  }
}