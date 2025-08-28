import { NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth"
import { queryRows, queryRow, executeQuery } from "@/lib/database"

const UpdateCollectionSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(1000).optional(),
  is_public: z.boolean().optional()
})

const AddProductSchema = z.object({
  product_id: z.string().min(1),
  note: z.string().max(500).optional()
})

// GET - Fetch collection details with products
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const collectionId = params.id
    const user = await getCurrentUser()

    // Fetch collection details
    const collection = await queryRow(
      `SELECT 
        c.id, c.name, c.description, c.slug, c.is_public, c.is_featured,
        c.view_count, c.created_at, c.updated_at, c.user_id,
        u.name as creator_name, u.username as creator_username,
        u.avatar_url as creator_avatar
       FROM collections c
       JOIN users u ON c.user_id = u.id
       WHERE c.id = ? OR c.slug = ?`,
      [collectionId, collectionId]
    )

    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      )
    }

    // Check if user can view this collection
    if (!collection.is_public && (!user || user.id !== collection.user_id)) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      )
    }

    // Increment view count (only if not the owner)
    if (!user || user.id !== collection.user_id) {
      await executeQuery(
        "UPDATE collections SET view_count = view_count + 1 WHERE id = ?",
        [collection.id]
      )
    }

    // Fetch products in the collection
    const products = await queryRows(
      `SELECT 
        p.id, p.name, p.tagline, p.description, p.website_url, p.thumbnail_url,
        p.created_at,
        u.name as submitter_name, u.username as submitter_username,
        u.avatar_url as submitter_avatar,
        cp.note, cp.added_at,
        COUNT(v.user_id) as vote_count
       FROM collection_products cp
       JOIN products p ON cp.product_id = p.id
       JOIN users u ON p.submitter_id = u.id
       LEFT JOIN votes v ON p.id = v.product_id
       WHERE cp.collection_id = ?
       GROUP BY p.id, p.name, p.tagline, p.description, p.website_url, p.thumbnail_url,
                p.created_at, u.name, u.username, u.avatar_url,
                cp.note, cp.added_at
       ORDER BY cp.added_at DESC`,
      [collection.id]
    )

    // Get tags for each product
    const productsWithTags = await Promise.all(
      products.map(async (product: any) => {
        const tags = await queryRows(
          `SELECT t.id, t.name 
           FROM tags t 
           JOIN product_tags pt ON t.id = pt.tag_id 
           WHERE pt.product_id = ?`,
          [product.id]
        )
        return { ...product, tags }
      })
    )

    return NextResponse.json({
      collection,
      products: productsWithTags,
      isOwner: user?.id === collection.user_id
    })

  } catch (error) {
    console.error("Failed to fetch collection:", error)
    return NextResponse.json(
      { error: "Failed to fetch collection" },
      { status: 500 }
    )
  }
}

// PUT - Update collection
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const collectionId = params.id
    const body = await request.json()
    const validatedData = UpdateCollectionSchema.parse(body)

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
        { error: "You can only update your own collections" },
        { status: 403 }
      )
    }

    // Build update query
    const updateFields: string[] = []
    const updateParams: any[] = []

    if (validatedData.name !== undefined) {
      updateFields.push("name = ?")
      updateParams.push(validatedData.name)
    }

    if (validatedData.description !== undefined) {
      updateFields.push("description = ?")
      updateParams.push(validatedData.description)
    }

    if (validatedData.is_public !== undefined) {
      updateFields.push("is_public = ?")
      updateParams.push(validatedData.is_public)
    }

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      )
    }

    updateFields.push("updated_at = CURRENT_TIMESTAMP")
    updateParams.push(collectionId)

    await executeQuery(
      `UPDATE collections SET ${updateFields.join(", ")} WHERE id = ?`,
      updateParams
    )

    return NextResponse.json({ message: "Collection updated successfully" })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Failed to update collection:", error)
    return NextResponse.json(
      { error: "Failed to update collection" },
      { status: 500 }
    )
  }
}

// DELETE - Delete collection
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const collectionId = params.id

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
        { error: "You can only delete your own collections" },
        { status: 403 }
      )
    }

    // Delete collection (products will be removed automatically due to foreign key)
    await executeQuery("DELETE FROM collections WHERE id = ?", [collectionId])

    // Update user collections count
    await executeQuery(
      "UPDATE users SET collections_count = collections_count - 1 WHERE id = ?",
      [user.id]
    )

    return NextResponse.json({ message: "Collection deleted successfully" })

  } catch (error) {
    console.error("Failed to delete collection:", error)
    return NextResponse.json(
      { error: "Failed to delete collection" },
      { status: 500 }
    )
  }
}