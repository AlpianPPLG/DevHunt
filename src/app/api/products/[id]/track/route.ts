import { NextRequest, NextResponse } from "next/server"
import { queryRow, executeQuery } from "@/lib/database"
import { getCurrentUser } from "@/lib/auth" // Using the project's auth system

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const { type, clickType } = await request.json()
    
    // Get user using the project's auth system
    const user = await getCurrentUser()
    const userId = user?.id || null
    
    // Get client IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer') || null

    // Validate product exists
    const product = await queryRow(
      "SELECT id FROM products WHERE id = ?",
      [id]
    )

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    if (type === 'view') {
      // Track product view
      await executeQuery(`
        INSERT INTO product_views (product_id, user_id, ip_address, user_agent, referrer)
        VALUES (?, ?, ?, ?, ?)
      `, [id, userId, ipAddress, userAgent, referrer])

      // Update product performance cache
      await executeQuery(`
        INSERT INTO product_performance (product_id, total_views, last_calculated)
        VALUES (?, 1, NOW())
        ON DUPLICATE KEY UPDATE 
          total_views = total_views + 1,
          last_calculated = NOW()
      `, [id])

    } else if (type === 'click') {
      // Validate click type
      const validClickTypes = ['thumbnail', 'title', 'tagline', 'external_link']
      if (!validClickTypes.includes(clickType)) {
        return NextResponse.json(
          { error: "Invalid click type" },
          { status: 400 }
        )
      }

      // Track product click
      await executeQuery(`
        INSERT INTO product_clicks (product_id, user_id, click_type, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?)
      `, [id, userId, clickType, ipAddress, userAgent])

      // Update product performance cache
      await executeQuery(`
        INSERT INTO product_performance (product_id, total_clicks, last_calculated)
        VALUES (?, 1, NOW())
        ON DUPLICATE KEY UPDATE 
          total_clicks = total_clicks + 1,
          last_calculated = NOW()
      `, [id])
    }

    // Log user activity if authenticated
    if (userId) {
      const activityType = type === 'view' ? 'product_view' : 'product_click'
      const metadata = type === 'click' ? JSON.stringify({ click_type: clickType }) : null
      
      await executeQuery(`
        INSERT INTO user_activity_log (user_id, activity_type, target_id, target_type, metadata, ip_address, user_agent)
        VALUES (?, ?, ?, 'product', ?, ?, ?)
      `, [userId, activityType, id, metadata, ipAddress, userAgent])
    }

    // Update daily analytics summary
    const today = new Date().toISOString().split('T')[0]
    
    if (type === 'view') {
      await executeQuery(`
        INSERT INTO analytics_summary (user_id, date, views_received, updated_at)
        SELECT submitter_id, ?, 1, NOW()
        FROM products WHERE id = ?
        ON DUPLICATE KEY UPDATE 
          views_received = views_received + 1,
          updated_at = NOW()
      `, [today, id])
    } else if (type === 'click') {
      await executeQuery(`
        INSERT INTO analytics_summary (user_id, date, clicks_received, updated_at)
        SELECT submitter_id, ?, 1, NOW()
        FROM products WHERE id = ?
        ON DUPLICATE KEY UPDATE 
          clicks_received = clicks_received + 1,
          updated_at = NOW()
      `, [today, id])
    }

    return NextResponse.json({ 
      success: true, 
      message: `Product ${type} tracked successfully` 
    })

  } catch (error) {
    console.error("Failed to track product activity:", error)
    return NextResponse.json(
      { error: "Failed to track activity" },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'view'

    // Get tracking statistics for the product
    let stats
    if (type === 'view') {
      stats = await queryRow(`
        SELECT 
          COUNT(*) as total_views,
          COUNT(DISTINCT user_id) as unique_viewers,
          COUNT(DISTINCT DATE(viewed_at)) as days_with_views
        FROM product_views 
        WHERE product_id = ?
      `, [id])
    } else if (type === 'click') {
      stats = await queryRow(`
        SELECT 
          COUNT(*) as total_clicks,
          COUNT(DISTINCT user_id) as unique_clickers,
          COUNT(DISTINCT click_type) as click_types_used
        FROM product_clicks 
        WHERE product_id = ?
      `, [id])
    }

    return NextResponse.json({ 
      product_id: id,
      type,
      stats: stats || {}
    })

  } catch (error) {
    console.error("Failed to get tracking stats:", error)
    return NextResponse.json(
      { error: "Failed to get tracking statistics" },
      { status: 500 }
    )
  }
}
