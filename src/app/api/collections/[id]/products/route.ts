import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth"
import { queryRow, executeQuery } from "@/lib/database"

const AddProductSchema = z.object({
  product_id: z.string().min(1),
  note: z.string().max(500).optional()
})

// POST - Add product to collection
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const { id: collectionId } = await context.params
    const body = await request.json()
    const validatedData = AddProductSchema.parse(body)

    // Verify collection exists and user owns it
    const collection = await queryRow(
      "SELECT id, user_id FROM collections WHERE id = ?",
      [collectionId]
    )

    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      )
    }

    if (collection.user_id !== user.id) {
      return NextResponse.json(
        { error: "You can only add products to your own collections" },
        { status: 403 }
      )
    }

    // Verify product exists
    const product = await queryRow(
      "SELECT id FROM products WHERE id = ? AND status = 'active'",
      [validatedData.product_id]
    )

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Check if product is already in collection
    const existingEntry = await queryRow(
      "SELECT collection_id FROM collection_products WHERE collection_id = ? AND product_id = ?",
      [collectionId, validatedData.product_id]
    )

    if (existingEntry) {
      return NextResponse.json(
        { error: "Product is already in this collection" },
        { status: 400 }
      )
    }

    // Check collection size limit (max 50 products per collection)
    const productCount = await queryRow(
      "SELECT COUNT(*) as count FROM collection_products WHERE collection_id = ?",
      [collectionId]
    )

    if (productCount.count >= 50) {
      return NextResponse.json(
        { error: "Maximum 50 products allowed per collection" },
        { status: 400 }
      )
    }

    // Add product to collection
    await executeQuery(
      "INSERT INTO collection_products (collection_id, product_id, note) VALUES (?, ?, ?)",
      [collectionId, validatedData.product_id, validatedData.note || null]
    )

    // Update collection timestamp
    await executeQuery(
      "UPDATE collections SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [collectionId]
    )

    return NextResponse.json({
      message: "Product added to collection successfully"
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Failed to add product to collection:", error)
    return NextResponse.json(
      { error: "Failed to add product to collection" },
      { status: 500 }
    )
  }
}

// DELETE - Remove product from collection
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const { id: collectionId } = await context.params
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      )
    }

    // Verify collection exists and user owns it
    const collection = await queryRow(
      "SELECT id, user_id FROM collections WHERE id = ?",
      [collectionId]
    )

    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      )
    }

    if (collection.user_id !== user.id) {
      return NextResponse.json(
        { error: "You can only remove products from your own collections" },
        { status: 403 }
      )
    }

    // Check if product is in collection
    const existingEntry = await queryRow(
      "SELECT collection_id FROM collection_products WHERE collection_id = ? AND product_id = ?",
      [collectionId, productId]
    )

    if (!existingEntry) {
      return NextResponse.json(
        { error: "Product not found in collection" },
        { status: 404 }
      )
    }

    // Remove product from collection
    await executeQuery(
      "DELETE FROM collection_products WHERE collection_id = ? AND product_id = ?",
      [collectionId, productId]
    )

    // Update collection timestamp
    await executeQuery(
      "UPDATE collections SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [collectionId]
    )

    return NextResponse.json({
      message: "Product removed from collection successfully"
    })

  } catch (error) {
    console.error("Failed to remove product from collection:", error)
    return NextResponse.json(
      { error: "Failed to remove product from collection" },
      { status: 500 }
    )
  }
}