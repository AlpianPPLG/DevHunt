import { NextResponse } from "next/server"
import { queryRows } from "@/lib/database"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tagFilter = searchParams.get("tag")
    const sortBy = searchParams.get("sort") || "trending" // Default to trending
    const limit = parseInt(searchParams.get("limit") || "50") // Default to 50, max 50
    
    // Advanced search parameters
    const searchQuery = searchParams.get("q")
    const tagsFilter = searchParams.get("tags")?.split(",").filter(Boolean) || []
    const dateRangeFilter = searchParams.get("dateRange")

    let query = `
      SELECT 
        p.id,
        p.name,
        p.tagline,
        p.description,
        p.website_url,
        p.thumbnail_url,
        p.created_at,
        u.name as submitter_name,
        u.username as submitter_username,
        u.avatar_url as submitter_avatar,
        SUM(CASE WHEN v.vote_type = 'upvote' THEN 1 ELSE 0 END) as upvote_count,
        SUM(CASE WHEN v.vote_type = 'downvote' THEN 1 ELSE 0 END) as downvote_count,
        COUNT(v.user_id) as vote_count,
        COUNT(v_recent.user_id) as recent_votes_24h,
        COUNT(v_week.user_id) as recent_votes_7d,
        COUNT(c.id) as comment_count,
        COUNT(c_recent.id) as recent_comments_24h`

    // Different sorting algorithms
    if (sortBy === "trending") {
      // Advanced trending score: combines recent activity, vote velocity, and recency
      query += `,
        (
          -- Recent vote weight (24h votes * 10)
          (COUNT(v_recent.user_id) * 10) +
          -- Weekly vote momentum (7d votes * 3)
          (COUNT(v_week.user_id) * 3) +
          -- Comment engagement (recent comments * 5)
          (COUNT(c_recent.id) * 5) +
          -- Total votes baseline
          COUNT(v.user_id) +
          -- Recency boost for products less than 7 days old
          CASE 
            WHEN TIMESTAMPDIFF(HOUR, p.created_at, NOW()) <= 168 
            THEN (168 - TIMESTAMPDIFF(HOUR, p.created_at, NOW())) / 10
            ELSE 0
          END
        ) as trending_score`
    } else {
      // Simple hot score for other sorting
      query += `,
        (COUNT(v.user_id) * LOG(TIMESTAMPDIFF(HOUR, p.created_at, NOW()) + 2)) as hot_score`
    }

    query += `
      FROM products p
      LEFT JOIN users u ON p.submitter_id = u.id
      LEFT JOIN votes v ON p.id = v.product_id
      LEFT JOIN votes v_recent ON p.id = v_recent.product_id 
        AND v_recent.created_at >= NOW() - INTERVAL 24 HOUR
      LEFT JOIN votes v_week ON p.id = v_week.product_id 
        AND v_week.created_at >= NOW() - INTERVAL 7 DAY
      LEFT JOIN comments c ON p.id = c.product_id
      LEFT JOIN comments c_recent ON p.id = c_recent.product_id 
        AND c_recent.created_at >= NOW() - INTERVAL 24 HOUR`

    const params: any[] = []
    const whereConditions: string[] = []
    
    // Add search query filter
    if (searchQuery) {
      whereConditions.push(`(
        p.name LIKE ? OR 
        p.tagline LIKE ? OR 
        p.description LIKE ?
      )`)
      const searchPattern = `%${searchQuery}%`
      params.push(searchPattern, searchPattern, searchPattern)
    }
    
    // Add date range filter
    if (dateRangeFilter) {
      switch (dateRangeFilter) {
        case "today":
          whereConditions.push("p.created_at >= DATE_SUB(NOW(), INTERVAL 1 DAY)")
          break
        case "week":
          whereConditions.push("p.created_at >= DATE_SUB(NOW(), INTERVAL 1 WEEK)")
          break
        case "month":
          whereConditions.push("p.created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)")
          break
        case "year":
          whereConditions.push("p.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)")
          break
      }
    }

    // Handle tag filtering (both single tag and multiple tags)
    const allTagFilters = []
    if (tagFilter) allTagFilters.push(tagFilter)
    if (tagsFilter.length > 0) allTagFilters.push(...tagsFilter)
    
    if (allTagFilters.length > 0) {
      query += `
        JOIN product_tags pt ON p.id = pt.product_id
        JOIN tags t ON pt.tag_id = t.id`
      
      const tagPlaceholders = allTagFilters.map(() => "?").join(",")
      whereConditions.push(`t.name IN (${tagPlaceholders})`)
      params.push(...allTagFilters)
    }
    
    // Apply WHERE conditions
    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(" AND ")}`
    }

    query += `
      GROUP BY p.id, p.name, p.tagline, p.description, p.website_url, p.thumbnail_url, p.created_at, u.name, u.username, u.avatar_url`

    // Order by the appropriate score
    if (sortBy === "trending") {
      query += `
      ORDER BY trending_score DESC, recent_votes_24h DESC, p.created_at DESC`
    } else if (sortBy === "newest") {
      query += `
      ORDER BY p.created_at DESC`
    } else if (sortBy === "most_voted") {
      query += `
      ORDER BY vote_count DESC, p.created_at DESC`
    } else if (sortBy === "alphabetical") {
      query += `
      ORDER BY p.name ASC`
    } else {
      query += `
      ORDER BY hot_score DESC, p.created_at DESC`
    }

    query += `
      LIMIT ${Math.min(Math.max(1, limit), 50)}` // Ensure limit is between 1-50

    const products = await queryRows(query, params)

    // Get tags for each product
    const productsWithTags = await Promise.all(
      products.map(async (product: any) => {
        const tags = await queryRows(
          `SELECT t.id, t.name 
           FROM tags t 
           JOIN product_tags pt ON t.id = pt.tag_id 
           WHERE pt.product_id = ?`,
          [product.id],
        )
        return { 
          ...product, 
          tags,
          // Add metadata for trending indicators
          trending_indicators: {
            recent_votes_24h: product.recent_votes_24h || 0,
            recent_votes_7d: product.recent_votes_7d || 0,
            comment_count: product.comment_count || 0,
            recent_comments_24h: product.recent_comments_24h || 0,
            trending_score: product.trending_score || 0
          }
        }
      }),
    )

    return NextResponse.json({ 
      products: productsWithTags,
      meta: {
        sort: sortBy,
        tag: tagFilter,
        total: products.length
      }
    })
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
