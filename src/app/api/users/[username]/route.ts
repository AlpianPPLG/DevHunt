import { NextResponse } from "next/server"
import { queryRow, queryRows } from "@/lib/database"
import { getCurrentUser } from "@/lib/auth"

interface RouteParams {
  params: Promise<{ username: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { username } = await params
    const currentUser = await getCurrentUser()

    // Get user info with enhanced profile data
    const user = await queryRow(
      `SELECT 
        id, name, username, email, avatar_url, bio, location, website_url,
        twitter_handle, github_username, total_points, reputation_level,
        followers_count, following_count, products_count, collections_count,
        created_at
       FROM users WHERE username = ?`,
      [username],
    )

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if current user is following this user
    let isFollowing = false
    if (currentUser) {
      const followRecord = await queryRow(
        "SELECT follower_id FROM user_follows WHERE follower_id = ? AND following_id = ?",
        [currentUser.id, user.id]
      )
      isFollowing = !!followRecord
    }

    // Get user's submitted products with vote counts
    const products = await queryRows(
      `SELECT 
        p.id, p.name, p.tagline, p.description, p.website_url, p.thumbnail_url, p.created_at,
        COUNT(v.user_id) as vote_count
       FROM products p
       LEFT JOIN votes v ON p.id = v.product_id
       WHERE p.submitter_id = ?
       GROUP BY p.id
       ORDER BY p.created_at DESC`,
      [user.id],
    )

    // Get user's public collections
    const collections = await queryRows(
      `SELECT 
        c.id, c.name, c.description, c.slug, c.view_count,
        c.created_at, c.updated_at,
        COUNT(cp.product_id) as product_count
       FROM collections c
       LEFT JOIN collection_products cp ON c.id = cp.collection_id
       WHERE c.user_id = ? AND c.is_public = true
       GROUP BY c.id, c.name, c.description, c.slug, c.view_count,
                c.created_at, c.updated_at
       ORDER BY c.updated_at DESC
       LIMIT 10`,
      [user.id],
    )

    // Get user's recent achievements
    const achievements = await queryRows(
      `SELECT achievement_type, achievement_name, achievement_description,
              points_awarded, earned_at
       FROM user_achievements
       WHERE user_id = ?
       ORDER BY earned_at DESC
       LIMIT 10`,
      [user.id],
    )

    // Get user's recent comments
    const comments = await queryRows(
      `SELECT 
        c.id, c.content, c.created_at,
        p.id as product_id, p.name as product_name
       FROM comments c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ? AND c.parent_comment_id IS NULL
       ORDER BY c.created_at DESC
       LIMIT 10`,
      [user.id],
    )

    // Get additional stats
    const additionalStats = {
      totalViews: await queryRow(
        `SELECT SUM(view_count) as total
         FROM products
         WHERE submitter_id = ?`,
        [user.id]
      ),
      topTags: await queryRows(
        `SELECT t.name, COUNT(*) as usage_count
         FROM tags t
         JOIN product_tags pt ON t.id = pt.tag_id
         JOIN products p ON pt.product_id = p.id
         WHERE p.submitter_id = ?
         GROUP BY t.id, t.name
         ORDER BY usage_count DESC
         LIMIT 5`,
        [user.id]
      )
    }

    // Get user stats
    const stats = await queryRow(
      `SELECT 
        COUNT(DISTINCT p.id) as products_count,
        COUNT(DISTINCT c.id) as comments_count,
        COALESCE(SUM(vote_counts.vote_count), 0) as total_votes_received
       FROM users u
       LEFT JOIN products p ON u.id = p.submitter_id
       LEFT JOIN comments c ON u.id = c.user_id
       LEFT JOIN (
         SELECT p.id, COUNT(v.user_id) as vote_count
         FROM products p
         LEFT JOIN votes v ON p.id = v.product_id
         WHERE p.submitter_id = ?
         GROUP BY p.id
       ) vote_counts ON p.id = vote_counts.id
       WHERE u.id = ?`,
      [user.id, user.id],
    )

    return NextResponse.json({
      user: {
        ...user,
        // Don't expose email to other users
        email: currentUser?.id === user.id ? user.email : undefined
      },
      products,
      collections,
      achievements,
      comments,
      stats: {
        productsCount: stats?.products_count || 0,
        commentsCount: stats?.comments_count || 0,
        totalVotesReceived: stats?.total_votes_received || 0,
        totalViews: additionalStats.totalViews?.total || 0,
        topTags: additionalStats.topTags || []
      },
      isFollowing,
      isOwnProfile: currentUser?.id === user.id
    })
  } catch (error) {
    console.error("Failed to fetch user profile:", error)
    return NextResponse.json({ error: "Failed to fetch user profile" }, { status: 500 })
  }
}
