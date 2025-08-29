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
    const { searchParams } = request.nextUrl
    
    // Parse filter parameters
    const timeRange = searchParams.get('timeRange') || '30d'
    const category = searchParams.get('category') || undefined
    const minViews = searchParams.get('minViews') ? parseInt(searchParams.get('minViews')!) : undefined
    const minVotes = searchParams.get('minVotes') ? parseInt(searchParams.get('minVotes')!) : undefined
    const minComments = searchParams.get('minComments') ? parseInt(searchParams.get('minComments')!) : undefined
    const sortBy = searchParams.get('sortBy') || 'performance'
    const activeOnly = searchParams.get('activeOnly') === 'true'
    
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
    
    // Calculate date ranges based on timeRange parameter
    let startDate: Date
    switch (timeRange) {
      case '7d':
        startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '90d':
        startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      case '6m':
        startDate = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000)
        break
      case '1y':
        startDate = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      case 'all':
        startDate = new Date(0) // Beginning of time
        break
      default: // 30d is the default
        startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
    }
    
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Build additional filter conditions for product queries
    const productFilters = []
    const filterParams = []
    
    if (category) {
      productFilters.push('pt.tag_id IN (SELECT id FROM tags WHERE name LIKE ?)')
      filterParams.push(`%${category}%`)
    }
    
    if (minViews && minViews > 0) {
      productFilters.push('COALESCE(view_counts.total_views, 0) >= ?')
      filterParams.push(minViews)
    }
    
    if (minVotes && minVotes > 0) {
      productFilters.push('COALESCE(vote_counts.total_votes, 0) >= ?')
      filterParams.push(minVotes)
    }
    
    if (minComments && minComments > 0) {
      productFilters.push('COALESCE(comment_counts.total_comments, 0) >= ?')
      filterParams.push(minComments)
    }
    
    if (activeOnly) {
      productFilters.push('p.status = "active"')
    }
    
    const additionalWhereClause = productFilters.length > 0 
      ? 'AND ' + productFilters.join(' AND ') 
      : ''

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
      LEFT JOIN product_tags pt ON p.id = pt.product_id
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
      WHERE u.id = ? ${additionalWhereClause}
      GROUP BY u.id
    `, [userId, ...filterParams])

    // 2. Recent Activity (Based on selected time range)
    const recentActivityQuery = `
      SELECT 
        'vote' as activity_type,
        'received' as direction,
        COUNT(*) as count,
        DATE(v.created_at) as date
      FROM votes v
      JOIN products p ON v.product_id = p.id
      LEFT JOIN product_tags pt ON p.id = pt.product_id
      WHERE p.submitter_id = ? 
        AND v.created_at >= ?
        ${additionalWhereClause}
      GROUP BY DATE(v.created_at)
      
      UNION ALL
      
      SELECT 
        'comment' as activity_type,
        'received' as direction,
        COUNT(*) as count,
        DATE(c.created_at) as date
      FROM comments c
      JOIN products p ON c.product_id = p.id
      LEFT JOIN product_tags pt ON p.id = pt.product_id
      WHERE p.submitter_id = ? 
        AND c.created_at >= ?
        ${additionalWhereClause}
      GROUP BY DATE(c.created_at)
      
      UNION ALL
      
      SELECT 
        'view' as activity_type,
        'received' as direction,
        COUNT(*) as count,
        DATE(pv.viewed_at) as date
      FROM product_views pv
      JOIN products p ON pv.product_id = p.id
      LEFT JOIN product_tags pt ON p.id = pt.product_id
      WHERE p.submitter_id = ? 
        AND pv.viewed_at >= ?
        ${additionalWhereClause}
      GROUP BY DATE(pv.viewed_at)
      
      ORDER BY date DESC
    `
    
    // Parameters for each part of the UNION query
    const activityParams = [
      userId, startDate, ...filterParams,
      userId, startDate, ...filterParams,
      userId, startDate, ...filterParams
    ]
    
    const recentActivity = await queryRows(recentActivityQuery, activityParams)

    // Build the ORDER BY clause based on sortBy parameter
    let orderByClause = 'performance_score DESC, p.created_at DESC'
    
    switch (sortBy) {
      case 'views':
        orderByClause = 'total_views DESC, performance_score DESC'
        break
      case 'votes':
        orderByClause = 'total_votes DESC, performance_score DESC'
        break
      case 'comments':
        orderByClause = 'total_comments DESC, performance_score DESC'
        break
      case 'newest':
        orderByClause = 'p.created_at DESC'
        break
      case 'oldest':
        orderByClause = 'p.created_at ASC'
        break
      // Default is 'performance' which is already set
    }

    // 3. Product Performance Ranking
    const productPerformanceQuery = `
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
      LEFT JOIN product_tags pt ON p.id = pt.product_id
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
      LEFT JOIN (
        SELECT 
          product_id,
          COUNT(*) as total_clicks
        FROM product_clicks 
        GROUP BY product_id
      ) click_counts ON p.id = click_counts.product_id
      WHERE p.submitter_id = ? ${additionalWhereClause}
      GROUP BY p.id
      ORDER BY ${orderByClause}
    `
    
    // Combine parameters for the query
    const combinedParams = [userId, ...filterParams]
    
    const productPerformance = await queryRows(productPerformanceQuery, combinedParams)

    // 4. Engagement Trends (Based on selected time range)
    const engagementTrendsQuery = `
      SELECT 
        DATE(v.created_at) as date,
        COUNT(*) as votes,
        0 as comments,
        0 as views
      FROM votes v
      JOIN products p ON v.product_id = p.id
      LEFT JOIN product_tags pt ON p.id = pt.product_id
      WHERE p.submitter_id = ? 
        AND v.created_at >= ?
        ${additionalWhereClause}
      GROUP BY DATE(v.created_at)
      
      UNION ALL
      
      SELECT 
        DATE(c.created_at) as date,
        0 as votes,
        COUNT(*) as comments,
        0 as views
      FROM comments c
      JOIN products p ON c.product_id = p.id
      LEFT JOIN product_tags pt ON p.id = pt.product_id
      WHERE p.submitter_id = ? 
        AND c.created_at >= ?
        ${additionalWhereClause}
      GROUP BY DATE(c.created_at)
      
      UNION ALL
      
      SELECT 
        DATE(pv.viewed_at) as date,
        0 as votes,
        0 as comments,
        COUNT(*) as views
      FROM product_views pv
      JOIN products p ON pv.product_id = p.id
      LEFT JOIN product_tags pt ON p.id = pt.product_id
      WHERE p.submitter_id = ? 
        AND pv.viewed_at >= ?
        ${additionalWhereClause}
      GROUP BY DATE(pv.viewed_at)
      
      ORDER BY date DESC
    `
    
    // Combine parameters for each part of the UNION query
    const unionParams = [
      userId, startDate, ...filterParams,
      userId, startDate, ...filterParams,
      userId, startDate, ...filterParams
    ]
    
    const engagementTrends = await queryRows(engagementTrendsQuery, unionParams)

    // 5. User Activity
    const userActivity = await queryRow(`
      SELECT
        (SELECT COUNT(*) FROM products WHERE submitter_id = ?) as products_submitted,
        (SELECT COUNT(DISTINCT product_id) FROM votes WHERE user_id = ?) as products_voted_on,
        (SELECT COUNT(DISTINCT product_id) FROM comments WHERE user_id = ?) as products_commented_on,
        (SELECT COUNT(DISTINCT product_id) FROM product_views WHERE user_id = ?) as products_viewed,
        (SELECT COUNT(DISTINCT product_id) FROM product_clicks WHERE user_id = ?) as products_clicked
    `, [userId, userId, userId, userId, userId])

    // 6. Growth Metrics
    const growthMetrics = await queryRow(`
      SELECT
        (SELECT COUNT(*) FROM products WHERE submitter_id = ? AND created_at >= ?) as products_this_month,
        (SELECT COUNT(*) FROM products WHERE submitter_id = ? AND created_at >= ?) as products_this_week,
        (SELECT COUNT(*) FROM products WHERE submitter_id = ? AND created_at >= ?) as products_today
    `, [userId, startDate, userId, lastWeek, userId, yesterday])

    // 7. Top Products
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
      LEFT JOIN product_tags pt ON p.id = pt.product_id
      LEFT JOIN (
        SELECT product_id, COUNT(*) as total_votes
        FROM votes 
        GROUP BY product_id
      ) vote_counts ON p.id = vote_counts.product_id
      LEFT JOIN (
        SELECT product_id, COUNT(*) as total_comments
        FROM comments 
        GROUP BY product_id
      ) comment_counts ON p.id = comment_counts.product_id
      LEFT JOIN (
        SELECT product_id, COUNT(*) as total_views
        FROM product_views 
        GROUP BY product_id
      ) view_counts ON p.id = view_counts.product_id
      WHERE p.submitter_id = ? ${additionalWhereClause}
      GROUP BY p.id
      ORDER BY total_votes DESC, total_views DESC
      LIMIT 5
    `, [userId, ...filterParams])

    // Calculate engagement rate
    const totalEngagement = (
      (overallStats?.total_votes_received || 0) + 
      (overallStats?.total_comments_received || 0)
    )
    const totalViews = overallStats?.total_views_received || 0
    const engagementRate = totalViews > 0 
      ? Math.round((totalEngagement / totalViews) * 100) 
      : 0

    // Prepare the response
    const analytics = {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        joined_at: user.created_at
      },
      overview: {
        ...overallStats,
        engagement_rate: engagementRate
      },
      recent_activity: recentActivity,
      product_performance: productPerformance,
      engagement_trends: engagementTrends,
      user_activity: userActivity,
      growth_metrics: growthMetrics,
      top_products: topProducts,
      generated_at: new Date().toISOString(),
      filter_applied: {
        timeRange,
        category,
        minViews,
        minVotes,
        minComments,
        sortBy,
        activeOnly
      }
    }

    return NextResponse.json(analytics)

  } catch (error) {
    console.error("Failed to fetch analytics:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}