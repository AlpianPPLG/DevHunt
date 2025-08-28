import { NextRequest, NextResponse } from "next/server"
import { queryRows, queryRow } from "@/lib/database"

interface RouteParams {
  params: Promise<{ username: string }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { username } = await params
    
    // Get user ID from username
    const user = await queryRow(
      "SELECT id, name, username, created_at FROM users WHERE username = ?",
      [username]
    )

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const userId = user.id

    // Get current date and date ranges
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    // 1. Overall Statistics
    const overallStats = await queryRow(`
      SELECT 
        COUNT(DISTINCT p.id) as total_products,
        SUM(COALESCE(vote_counts.total_votes, 0)) as total_votes_received,
        SUM(COALESCE(comment_counts.total_comments, 0)) as total_comments_received,
        SUM(COALESCE(view_counts.total_views, 0)) as total_views_received,
        AVG(COALESCE(vote_counts.total_votes, 0)) as avg_votes_per_product,
        AVG(COALESCE(comment_counts.total_comments, 0)) as avg_comments_per_product,
        AVG(COALESCE(view_counts.total_views, 0)) as avg_views_per_product
      FROM users u
      LEFT JOIN products p ON u.id = p.submitter_id
      LEFT JOIN (
        SELECT 
          product_id,
          COUNT(*) as total_votes
        FROM votes 
        GROUP BY product_id
      ) vote_counts ON p.id = vote_counts.product_id
      LEFT JOIN (
        SELECT 
          product_id,
          COUNT(*) as total_comments
        FROM comments 
        GROUP BY product_id
      ) comment_counts ON p.id = comment_counts.product_id
      LEFT JOIN (
        SELECT 
          product_id,
          COUNT(*) as total_views
        FROM product_views 
        GROUP BY product_id
      ) view_counts ON p.id = view_counts.product_id
      WHERE u.id = ?
    `, [userId])

    // 2. Recent Activity (Last 7 days)
    const recentActivity = await queryRows(`
      SELECT 
        'vote' as activity_type,
        'received' as direction,
        COUNT(*) as count,
        DATE(v.created_at) as date
      FROM votes v
      JOIN products p ON v.product_id = p.id
      WHERE p.submitter_id = ? 
        AND v.created_at >= ?
      GROUP BY DATE(v.created_at)
      
      UNION ALL
      
      SELECT 
        'comment' as activity_type,
        'received' as direction,
        COUNT(*) as count,
        DATE(c.created_at) as date
      FROM comments c
      JOIN products p ON c.product_id = p.id
      WHERE p.submitter_id = ? 
        AND c.created_at >= ?
      GROUP BY DATE(c.created_at)
      
      UNION ALL
      
      SELECT 
        'view' as activity_type,
        'received' as direction,
        COUNT(*) as count,
        DATE(pv.viewed_at) as date
      FROM product_views pv
      JOIN products p ON pv.product_id = p.id
      WHERE p.submitter_id = ? 
        AND pv.viewed_at >= ?
      GROUP BY DATE(pv.viewed_at)
      
      ORDER BY date DESC
    `, [userId, lastWeek, userId, lastWeek, userId, lastWeek])

    // 3. Product Performance Ranking
    const productPerformance = await queryRows(`
      SELECT 
        p.id,
        p.name,
        p.tagline,
        p.thumbnail_url,
        p.created_at,
        COALESCE(vote_counts.total_votes, 0) as total_votes,
        COALESCE(comment_counts.total_comments, 0) as total_comments,
        COALESCE(view_counts.total_views, 0) as total_views,
        COALESCE(click_counts.total_clicks, 0) as total_clicks,
        ROUND(
          (COALESCE(vote_counts.total_votes, 0) * 0.4 + 
           COALESCE(comment_counts.total_comments, 0) * 0.3 + 
           COALESCE(view_counts.total_views, 0) * 0.2 + 
           COALESCE(click_counts.total_clicks, 0) * 0.1), 2
        ) as performance_score
      FROM products p
      LEFT JOIN (
        SELECT 
          product_id,
          COUNT(*) as total_votes
        FROM votes 
        GROUP BY product_id
      ) vote_counts ON p.id = vote_counts.product_id
      LEFT JOIN (
        SELECT 
          product_id,
          COUNT(*) as total_comments
        FROM comments 
        GROUP BY product_id
      ) comment_counts ON p.id = comment_counts.product_id
      LEFT JOIN (
        SELECT 
          product_id,
          COUNT(*) as total_views
        FROM product_views 
        GROUP BY product_id
      ) view_counts ON p.id = view_counts.total_views
      LEFT JOIN (
        SELECT 
          product_id,
          COUNT(*) as total_clicks
        FROM product_clicks 
        GROUP BY product_id
      ) click_counts ON p.id = click_counts.product_id
      WHERE p.submitter_id = ?
      ORDER BY performance_score DESC, p.created_at DESC
    `, [userId])

    // 4. Engagement Trends (Last 30 days)
    const engagementTrends = await queryRows(`
      SELECT 
        DATE(v.created_at) as date,
        COUNT(*) as votes,
        0 as comments,
        0 as views
      FROM votes v
      JOIN products p ON v.product_id = p.id
      WHERE p.submitter_id = ? 
        AND v.created_at >= ?
      GROUP BY DATE(v.created_at)
      
      UNION ALL
      
      SELECT 
        DATE(c.created_at) as date,
        0 as votes,
        COUNT(*) as comments,
        0 as views
      FROM comments c
      JOIN products p ON c.product_id = p.id
      WHERE p.submitter_id = ? 
        AND c.created_at >= ?
      GROUP BY DATE(c.created_at)
      
      UNION ALL
      
      SELECT 
        DATE(pv.viewed_at) as date,
        0 as votes,
        0 as comments,
        COUNT(*) as views
      FROM product_views pv
      JOIN products p ON pv.product_id = p.id
      WHERE p.submitter_id = ? 
        AND pv.viewed_at >= ?
      GROUP BY DATE(pv.viewed_at)
      
      ORDER BY date DESC
    `, [userId, lastMonth, userId, lastMonth, userId, lastMonth])

    // 5. User Activity Summary
    const userActivity = await queryRow(`
      SELECT 
        COUNT(DISTINCT p.id) as products_submitted,
        COUNT(DISTINCT v.product_id) as products_voted_on,
        COUNT(DISTINCT c.product_id) as products_commented_on,
        COUNT(DISTINCT pv.product_id) as products_viewed,
        COUNT(DISTINCT pc.product_id) as products_clicked
      FROM users u
      LEFT JOIN products p ON u.id = p.submitter_id
      LEFT JOIN votes v ON u.id = v.user_id
      LEFT JOIN comments c ON u.id = c.user_id
      LEFT JOIN product_views pv ON u.id = pv.user_id
      LEFT JOIN product_clicks pc ON u.id = pc.user_id
      WHERE u.id = ?
    `, [userId])

    // 6. Growth Metrics
    const growthMetrics = await queryRow(`
      SELECT 
        COUNT(CASE WHEN p.created_at >= ? THEN 1 END) as products_this_month,
        COUNT(CASE WHEN p.created_at >= ? THEN 1 END) as products_this_week,
        COUNT(CASE WHEN p.created_at >= ? THEN 1 END) as products_today
      FROM products p
      WHERE p.submitter_id = ?
    `, [lastMonth, lastWeek, today, userId])

    // 7. Top Performing Products
    const topProducts = await queryRows(`
      SELECT 
        p.id,
        p.name,
        p.tagline,
        p.thumbnail_url,
        p.created_at,
        COALESCE(vote_counts.total_votes, 0) as total_votes,
        COALESCE(comment_counts.total_comments, 0) as total_comments,
        COALESCE(view_counts.total_views, 0) as total_views
      FROM products p
      LEFT JOIN (
        SELECT 
          product_id,
          COUNT(*) as total_votes
        FROM votes 
        GROUP BY product_id
      ) vote_counts ON p.id = vote_counts.product_id
      LEFT JOIN (
        SELECT 
          product_id,
          COUNT(*) as total_comments
        FROM comments 
        GROUP BY product_id
      ) comment_counts ON p.id = comment_counts.product_id
      LEFT JOIN (
        SELECT 
          product_id,
          COUNT(*) as total_views
        FROM product_views 
        GROUP BY product_id
      ) view_counts ON p.id = view_counts.product_id
      WHERE p.submitter_id = ?
      ORDER BY (COALESCE(vote_counts.total_votes, 0) + COALESCE(comment_counts.total_comments, 0)) DESC
      LIMIT 5
    `, [userId])

    // 8. Engagement Rate Calculation
    const engagementRate = overallStats.total_views_received > 0 
      ? ((overallStats.total_votes_received + overallStats.total_comments_received) / overallStats.total_views_received * 100).toFixed(2)
      : "0"

    const analytics = {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        joined_at: user.created_at
      },
      overview: {
        total_products: overallStats.total_products || 0,
        total_votes_received: overallStats.total_votes_received || 0,
        total_comments_received: overallStats.total_comments_received || 0,
        total_views_received: overallStats.total_views_received || 0,
        avg_votes_per_product: Math.round((overallStats.avg_votes_per_product || 0) * 100) / 100,
        avg_comments_per_product: Math.round((overallStats.avg_comments_per_product || 0) * 100) / 100,
        avg_views_per_product: Math.round((overallStats.avg_views_per_product || 0) * 100) / 100,
        engagement_rate: parseFloat(engagementRate)
      },
      recent_activity: recentActivity,
      product_performance: productPerformance,
      engagement_trends: engagementTrends,
      user_activity: userActivity,
      growth_metrics: growthMetrics,
      top_products: topProducts,
      generated_at: new Date().toISOString()
    }

    return NextResponse.json(analytics)

  } catch (error) {
    console.error("Failed to fetch user analytics:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}
