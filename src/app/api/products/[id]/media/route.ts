import { NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth"
import { queryRows, queryRow, executeQuery } from "@/lib/database"

const MediaUploadSchema = z.object({
  media_type: z.enum(["image", "video", "gif", "logo"]),
  media_url: z.string().url(),
  thumbnail_url: z.string().url().optional(),
  caption: z.string().max(500).optional(),
  alt_text: z.string().max(255).optional(),
  display_order: z.number().int().min(0).default(0),
  file_size: z.number().int().positive().optional(),
  mime_type: z.string().optional()
})

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET - Fetch product media
export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id: productId } = await params

    // Verify product exists and get its thumbnail_url
    const product = await queryRow(
      "SELECT id, thumbnail_url FROM products WHERE id = ?",
      [productId]
    )

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Fetch media for the product
    const media = await queryRows(
      `SELECT 
        id, media_type, media_url, thumbnail_url, caption, 
        alt_text, display_order, file_size, mime_type, created_at
       FROM product_media 
       WHERE product_id = ? 
       ORDER BY display_order ASC, created_at ASC`,
      [productId]
    )

    // If no dedicated media exists but product has thumbnail_url, create a fallback media item
    if (media.length === 0 && product.thumbnail_url) {
      const fallbackMedia = [{
        id: `thumbnail-${productId}`,
        media_type: "image",
        media_url: product.thumbnail_url,
        thumbnail_url: product.thumbnail_url,
        caption: null,
        alt_text: "Product thumbnail",
        display_order: 0,
        file_size: null,
        mime_type: "image",
        created_at: new Date().toISOString()
      }]
      return NextResponse.json({ media: fallbackMedia })
    }

    return NextResponse.json({ media })
  } catch (error) {
    console.error("Failed to fetch product media:", error)
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    )
  }
}

// POST - Upload new media
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

    // Validate request body
    const validatedData = MediaUploadSchema.parse(body)

    // Verify product exists and user owns it
    const product = await queryRow(
      "SELECT id, submitter_id FROM products WHERE id = ?",
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
        { error: "You can only add media to your own products" },
        { status: 403 }
      )
    }

    // Check media limit (max 10 media items per product)
    const mediaCount = await queryRow(
      "SELECT COUNT(*) as count FROM product_media WHERE product_id = ?",
      [productId]
    )

    if (mediaCount.count >= 10) {
      return NextResponse.json(
        { error: "Maximum 10 media items allowed per product" },
        { status: 400 }
      )
    }

    // Insert new media
    const mediaId = `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    await executeQuery(
      `INSERT INTO product_media 
       (id, product_id, media_type, media_url, thumbnail_url, caption, alt_text, display_order, file_size, mime_type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        mediaId,
        productId,
        validatedData.media_type,
        validatedData.media_url,
        validatedData.thumbnail_url || null,
        validatedData.caption || null,
        validatedData.alt_text || null,
        validatedData.display_order,
        validatedData.file_size || null,
        validatedData.mime_type || null
      ]
    )

    // Fetch the created media
    const newMedia = await queryRow(
      `SELECT 
        id, media_type, media_url, thumbnail_url, caption, 
        alt_text, display_order, file_size, mime_type, created_at
       FROM product_media WHERE id = ?`,
      [mediaId]
    )

    return NextResponse.json({ 
      message: "Media uploaded successfully",
      media: newMedia 
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Failed to upload media:", error)
    return NextResponse.json(
      { error: "Failed to upload media" },
      { status: 500 }
    )
  }
}

// DELETE - Remove media
export async function DELETE(
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

    const { searchParams } = new URL(request.url)
    const mediaId = searchParams.get("mediaId")

    if (!mediaId) {
      return NextResponse.json(
        { error: "Media ID required" },
        { status: 400 }
      )
    }

    // Verify media exists and user owns the product
    const media = await queryRow(
      `SELECT pm.id, p.submitter_id 
       FROM product_media pm
       JOIN products p ON pm.product_id = p.id
       WHERE pm.id = ?`,
      [mediaId]
    )

    if (!media) {
      return NextResponse.json(
        { error: "Media not found" },
        { status: 404 }
      )
    }

    if (media.submitter_id !== user.id) {
      return NextResponse.json(
        { error: "You can only delete media from your own products" },
        { status: 403 }
      )
    }

    // Delete the media
    await executeQuery(
      "DELETE FROM product_media WHERE id = ?",
      [mediaId]
    )

    return NextResponse.json({ message: "Media deleted successfully" })

  } catch (error) {
    console.error("Failed to delete media:", error)
    return NextResponse.json(
      { error: "Failed to delete media" },
      { status: 500 }
    )
  }
}