import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { queryRows, queryRow } from "@/lib/database"

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const productId = params.productId
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get("days") || "30")

    // Verify product exists and user owns it
    const product = await queryRow(
      "SELECT id, name, submitter_id FROM products WHERE id = ?",
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
        { error: "You can only view analytics for your own products" },
        { status: 403 }
      )
    }

    // Get date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Overview stats
    const overview = await queryRow(
      `SELECT 
        COUNT(DISTINCT pv.id) as total_views,
        COUNT(DISTINCT pc.id) as total_clicks,
        COUNT(DISTINCT v.user_id) as total_votes,
        COUNT(DISTINCT c.id) as total_comments
       FROM products p
       LEFT JOIN product_views pv ON p.id = pv.product_id
       LEFT JOIN product_clicks pc ON p.id = pc.product_id
       LEFT JOIN votes v ON p.id = v.product_id
       LEFT JOIN comments c ON p.id = c.product_id
       WHERE p.id = ?
       GROUP BY p.id`,
      [productId]
    )

    // Views over time (daily)
    const viewsOverTime = await queryRows(
      `SELECT 
        DATE(viewed_at) as date,
        COUNT(*) as views,
        COUNT(DISTINCT user_id) as unique_users,
        COUNT(DISTINCT session_id) as unique_sessions
       FROM product_views
       WHERE product_id = ? 
         AND viewed_at >= ?
         AND viewed_at <= ?
       GROUP BY DATE(viewed_at)
       ORDER BY date DESC`,
      [productId, startDate.toISOString(), endDate.toISOString()]
    )

    // Clicks by type
    const clicksByType = await queryRows(
      `SELECT 
        click_type,
        COUNT(*) as count
       FROM product_clicks
       WHERE product_id = ?
         AND clicked_at >= ?
         AND clicked_at <= ?
       GROUP BY click_type
       ORDER BY count DESC`,
      [productId, startDate.toISOString(), endDate.toISOString()]
    )

    // Device breakdown
    const deviceBreakdown = await queryRows(
      `SELECT 
        device_type,
        COUNT(*) as count,
        COUNT(DISTINCT user_id) as unique_users
       FROM product_views
       WHERE product_id = ?
         AND viewed_at >= ?
         AND viewed_at <= ?
       GROUP BY device_type
       ORDER BY count DESC`,
      [productId, startDate.toISOString(), endDate.toISOString()]
    )

    // Top referrers
    const topReferrers = await queryRows(
      `SELECT 
        COALESCE(referrer, 'Direct') as referrer,
        COUNT(*) as count
       FROM product_views
       WHERE product_id = ?
         AND viewed_at >= ?
         AND viewed_at <= ?
       GROUP BY referrer
       ORDER BY count DESC
       LIMIT 10`,
      [productId, startDate.toISOString(), endDate.toISOString()]
    )

    // User engagement (for registered users)
    const userEngagement = await queryRows(
      `SELECT 
        u.username,
        u.name,
        u.avatar_url,
        COUNT(DISTINCT pv.id) as view_count,
        COUNT(DISTINCT pc.id) as click_count,
        COUNT(DISTINCT v.user_id) as voted,
        COUNT(DISTINCT c.id) as comment_count,
        MAX(pv.viewed_at) as last_view
       FROM users u
       LEFT JOIN product_views pv ON u.id = pv.user_id AND pv.product_id = ?
       LEFT JOIN product_clicks pc ON u.id = pc.user_id AND pc.product_id = ?
       LEFT JOIN votes v ON u.id = v.user_id AND v.product_id = ?
       LEFT JOIN comments c ON u.id = c.user_id AND c.product_id = ?
       WHERE (pv.id IS NOT NULL OR pc.id IS NOT NULL OR v.user_id IS NOT NULL OR c.id IS NOT NULL)
         AND (pv.viewed_at >= ? OR pc.clicked_at >= ? OR v.created_at >= ? OR c.created_at >= ?)
       GROUP BY u.id, u.username, u.name, u.avatar_url
       HAVING (view_count > 0 OR click_count > 0 OR voted > 0 OR comment_count > 0)
       ORDER BY (view_count + click_count * 2 + voted * 5 + comment_count * 3) DESC
       LIMIT 20`,
      [
        productId, productId, productId, productId,
        startDate.toISOString(), startDate.toISOString(), 
        startDate.toISOString(), startDate.toISOString()
      ]
    )

    // Recent activity timeline
    const recentActivity = await queryRows(
      `SELECT 
        'view' as type,
        pv.viewed_at as timestamp,
        u.username,
        u.name,
        pv.device_type as metadata
       FROM product_views pv
       LEFT JOIN users u ON pv.user_id = u.id
       WHERE pv.product_id = ? AND pv.viewed_at >= ?
       
       UNION ALL
       
       SELECT 
        'click' as type,
        pc.clicked_at as timestamp,
        u.username,
        u.name,
        pc.click_type as metadata
       FROM product_clicks pc
       LEFT JOIN users u ON pc.user_id = u.id
       WHERE pc.product_id = ? AND pc.clicked_at >= ?
       
       UNION ALL
       
       SELECT 
        'vote' as type,
        v.created_at as timestamp,
        u.username,
        u.name,
        NULL as metadata
       FROM votes v
       JOIN users u ON v.user_id = u.id
       WHERE v.product_id = ? AND v.created_at >= ?
       
       UNION ALL
       
       SELECT 
        'comment' as type,
        c.created_at as timestamp,
        u.username,
        u.name,
        LEFT(c.content, 50) as metadata
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.product_id = ? AND c.created_at >= ?
       
       ORDER BY timestamp DESC
       LIMIT 50`,
      [
        productId, startDate.toISOString(),
        productId, startDate.toISOString(),
        productId, startDate.toISOString(),
        productId, startDate.toISOString()
      ]
    )

    return NextResponse.json({
      product: {
        id: product.id,
        name: product.name
      },
      period: {
        days,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
      },
      overview,
      views_over_time: viewsOverTime,
      clicks_by_type: clicksByType,
      device_breakdown: deviceBreakdown,
      top_referrers: topReferrers,
      user_engagement: userEngagement,
      recent_activity: recentActivity
    })

  } catch (error) {
    console.error("Failed to fetch analytics:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}