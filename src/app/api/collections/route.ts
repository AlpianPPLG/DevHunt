import { NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth"
import { queryRows, queryRow, executeQuery } from "@/lib/database"

const CreateCollectionSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  is_public: z.boolean().default(true)
})

const UpdateCollectionSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(1000).optional(),
  is_public: z.boolean().optional()
})

// Generate URL-friendly slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    + "-" + Math.random().toString(36).substr(2, 6)
}

// GET - Fetch collections
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const isPublic = searchParams.get("public") === "true"
    const featured = searchParams.get("featured") === "true"
    
    const user = await getCurrentUser()
    
    let query = `
      SELECT 
        c.id, c.name, c.description, c.slug, c.is_public, c.is_featured,
        c.view_count, c.created_at, c.updated_at,
        u.name as creator_name, u.username as creator_username,
        u.avatar_url as creator_avatar,
        COUNT(cp.product_id) as product_count
      FROM collections c
      JOIN users u ON c.user_id = u.id
      LEFT JOIN collection_products cp ON c.id = cp.collection_id
    `
    
    const conditions: string[] = []
    const params: any[] = []
    
    // Filter by user
    if (userId) {
      conditions.push("c.user_id = ?")
      params.push(userId)
    }
    
    // Filter by public collections only (unless viewing own collections)
    if (isPublic || (!user || user.id !== userId)) {
      conditions.push("c.is_public = true")
    }
    
    // Filter by featured collections
    if (featured) {
      conditions.push("c.is_featured = true")
    }
    
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ")
    }
    
    query += `
      GROUP BY c.id, c.name, c.description, c.slug, c.is_public, c.is_featured,
               c.view_count, c.created_at, c.updated_at, u.name, u.username, u.avatar_url
      ORDER BY c.is_featured DESC, c.updated_at DESC
      LIMIT 50
    `
    
    const collections = await queryRows(query, params)
    
    return NextResponse.json({ collections })
  } catch (error) {
    console.error("Failed to fetch collections:", error)
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 }
    )
  }
}

// POST - Create new collection
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = CreateCollectionSchema.parse(body)

    // Check collection limit (max 20 collections per user)
    const collectionCount = await queryRow(
      "SELECT COUNT(*) as count FROM collections WHERE user_id = ?",
      [user.id]
    )

    if (collectionCount.count >= 20) {
      return NextResponse.json(
        { error: "Maximum 20 collections allowed per user" },
        { status: 400 }
      )
    }

    // Generate unique slug
    const slug = generateSlug(validatedData.name)
    const collectionId = `coll-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create collection
    await executeQuery(
      `INSERT INTO collections (id, name, description, slug, user_id, is_public)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        collectionId,
        validatedData.name,
        validatedData.description || null,
        slug,
        user.id,
        validatedData.is_public
      ]
    )

    // Update user collections count
    await executeQuery(
      "UPDATE users SET collections_count = collections_count + 1 WHERE id = ?",
      [user.id]
    )

    // Fetch the created collection
    const newCollection = await queryRow(
      `SELECT 
        c.id, c.name, c.description, c.slug, c.is_public, c.is_featured,
        c.view_count, c.created_at, c.updated_at,
        u.name as creator_name, u.username as creator_username,
        u.avatar_url as creator_avatar,
        0 as product_count
       FROM collections c
       JOIN users u ON c.user_id = u.id
       WHERE c.id = ?`,
      [collectionId]
    )

    return NextResponse.json({
      message: "Collection created successfully",
      collection: newCollection
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Failed to create collection:", error)
    return NextResponse.json(
      { error: "Failed to create collection" },
      { status: 500 }
    )
  }
}