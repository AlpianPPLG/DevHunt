/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { queryRows, queryRow, executeQuery } from "@/lib/database"

// Achievement definitions
const ACHIEVEMENTS = {
  FIRST_SUBMISSION: {
    name: "First Launch",
    description: "Submitted your first product",
    points: 50,
    type: "submission"
  },
  SUBMISSION_STREAK_5: {
    name: "Prolific Creator",
    description: "Submitted 5 products",
    points: 100,
    type: "submission"
  },
  SUBMISSION_STREAK_10: {
    name: "Product Machine",
    description: "Submitted 10 products",
    points: 200,
    type: "submission"
  },
  FIRST_VOTE: {
    name: "Community Supporter",
    description: "Cast your first vote",
    points: 10,
    type: "engagement"
  },
  VOTE_STREAK_50: {
    name: "Active Voter",
    description: "Cast 50 votes",
    points: 75,
    type: "engagement"
  },
  VOTE_STREAK_100: {
    name: "Community Champion",
    description: "Cast 100 votes",
    points: 150,
    type: "engagement"
  },
  VOTES_RECEIVED_50: {
    name: "Popular Creator",
    description: "Received 50 votes on your products",
    points: 100,
    type: "recognition"
  },
  VOTES_RECEIVED_100: {
    name: "Trending Maker",
    description: "Received 100 votes on your products",
    points: 200,
    type: "recognition"
  },
  VOTES_RECEIVED_500: {
    name: "Community Favorite",
    description: "Received 500 votes on your products",
    points: 500,
    type: "recognition"
  },
  FIRST_COMMENT: {
    name: "Conversationalist",
    description: "Made your first comment",
    points: 15,
    type: "engagement"
  },
  COMMENT_STREAK_25: {
    name: "Active Commenter",
    description: "Made 25 comments",
    points: 50,
    type: "engagement"
  },
  FIRST_COLLECTION: {
    name: "Curator",
    description: "Created your first collection",
    points: 25,
    type: "curation"
  },
  COLLECTION_STREAK_5: {
    name: "Master Curator",
    description: "Created 5 collections",
    points: 100,
    type: "curation"
  },
  EARLY_ADOPTER: {
    name: "Early Adopter",
    description: "Joined DevHunt in the first month",
    points: 100,
    type: "special"
  }
}

// Reputation levels
const REPUTATION_LEVELS = [
  { level: "newcomer", min_points: 0, max_points: 99 },
  { level: "contributor", min_points: 100, max_points: 499 },
  { level: "expert", min_points: 500, max_points: 1499 },
  { level: "veteran", min_points: 1500, max_points: 4999 },
  { level: "legend", min_points: 5000, max_points: Infinity }
]

function getReputationLevel(points: number): string {
  for (const level of REPUTATION_LEVELS) {
    if (points >= level.min_points && points <= level.max_points) {
      return level.level
    }
  }
  return "newcomer"
}

// POST - Calculate and update user reputation
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
    const { user_id, action } = body

    // Only allow users to calculate their own reputation or admin actions
    if (user_id && user_id !== user.id) {
      return NextResponse.json(
        { error: "You can only calculate your own reputation" },
        { status: 403 }
      )
    }

    const targetUserId = user_id || user.id
    await calculateUserReputation(targetUserId, action)

    return NextResponse.json({ message: "Reputation updated successfully" })

  } catch (error) {
    console.error("Failed to update reputation:", error)
    return NextResponse.json(
      { error: "Failed to update reputation" },
      { status: 500 }
    )
  }
}

// GET - Get user reputation and achievements
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const username = searchParams.get("username")

    if (!userId && !username) {
      return NextResponse.json(
        { error: "User ID or username required" },
        { status: 400 }
      )
    }

    let user
    if (userId) {
      user = await queryRow(
        "SELECT id, username, total_points, reputation_level FROM users WHERE id = ?",
        [userId]
      )
    } else {
      user = await queryRow(
        "SELECT id, username, total_points, reputation_level FROM users WHERE username = ?",
        [username]
      )
    }

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Get user achievements
    const achievements = await queryRows(
      `SELECT achievement_type, achievement_name, achievement_description,
              points_awarded, earned_at
       FROM user_achievements
       WHERE user_id = ?
       ORDER BY earned_at DESC`,
      [user.id]
    )

    // Get reputation breakdown
    const reputation = await queryRow(
      `SELECT 
        submission_points,
        vote_points,
        comment_points,
        collection_points,
        total_points,
        reputation_level,
        last_calculated
       FROM user_reputation
       WHERE user_id = ?`,
      [user.id]
    )

    // Get leaderboard position
    const leaderboardPosition = await queryRow(
      `SELECT COUNT(*) + 1 as position
       FROM users
       WHERE total_points > ?`,
      [user.total_points]
    )

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        total_points: user.total_points,
        reputation_level: user.reputation_level,
        leaderboard_position: leaderboardPosition.position
      },
      achievements,
      reputation: reputation || {
        submission_points: 0,
        vote_points: 0,
        comment_points: 0,
        collection_points: 0,
        total_points: 0,
        reputation_level: "newcomer",
        last_calculated: null
      }
    })

  } catch (error) {
    console.error("Failed to fetch reputation:", error)
    return NextResponse.json(
      { error: "Failed to fetch reputation" },
      { status: 500 }
    )
  }
}

async function calculateUserReputation(userId: string, action?: string) {
  // Get current reputation
  let reputation = await queryRow(
    "SELECT * FROM user_reputation WHERE user_id = ?",
    [userId]
  )

  if (!reputation) {
    // Initialize reputation record
    await executeQuery(
      `INSERT INTO user_reputation (user_id, total_points, submission_points, vote_points, comment_points, collection_points, reputation_level)
       VALUES (?, 0, 0, 0, 0, 0, 'newcomer')`,
      [userId]
    )
    reputation = {
      user_id: userId,
      total_points: 0,
      submission_points: 0,
      vote_points: 0,
      comment_points: 0,
      collection_points: 0,
      reputation_level: "newcomer"
    }
  }

  // Calculate points from different activities
  const stats = await queryRow(
    `SELECT 
      COUNT(DISTINCT p.id) as products_submitted,
      COUNT(DISTINCT v.product_id) as votes_cast,
      COUNT(DISTINCT c.id) as comments_made,
      COUNT(DISTINCT col.id) as collections_created,
      COALESCE(SUM(votes_received.vote_count), 0) as votes_received
     FROM users u
     LEFT JOIN products p ON u.id = p.submitter_id
     LEFT JOIN votes v ON u.id = v.user_id
     LEFT JOIN comments c ON u.id = c.user_id
     LEFT JOIN collections col ON u.id = col.user_id
     LEFT JOIN (
       SELECT p.submitter_id, COUNT(v.user_id) as vote_count
       FROM products p
       LEFT JOIN votes v ON p.id = v.product_id
       GROUP BY p.submitter_id
     ) votes_received ON u.id = votes_received.submitter_id
     WHERE u.id = ?
     GROUP BY u.id`,
    [userId]
  )

  // Calculate points
  const submissionPoints = (stats.products_submitted || 0) * 50 // 50 points per product
  const votePoints = (stats.votes_cast || 0) * 2 // 2 points per vote cast
  const commentPoints = (stats.comments_made || 0) * 5 // 5 points per comment
  const collectionPoints = (stats.collections_created || 0) * 25 // 25 points per collection
  const recognitionPoints = (stats.votes_received || 0) * 3 // 3 points per vote received

  const totalPoints = submissionPoints + votePoints + commentPoints + collectionPoints + recognitionPoints
  const newLevel = getReputationLevel(totalPoints)

  // Update reputation
  await executeQuery(
    `UPDATE user_reputation SET
      submission_points = ?,
      vote_points = ?,
      comment_points = ?,
      collection_points = ?,
      total_points = ?,
      reputation_level = ?,
      last_calculated = CURRENT_TIMESTAMP
     WHERE user_id = ?`,
    [submissionPoints + recognitionPoints, votePoints, commentPoints, collectionPoints, totalPoints, newLevel, userId]
  )

  // Update user table
  await executeQuery(
    "UPDATE users SET total_points = ?, reputation_level = ? WHERE id = ?",
    [totalPoints, newLevel, userId]
  )

  // Check for new achievements
  await checkAchievements(userId, stats, action)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function checkAchievements(userId: string, stats: any, action?: string) {
  const existingAchievements = await queryRows(
    "SELECT achievement_type FROM user_achievements WHERE user_id = ?",
    [userId]
  )
  
  const earnedTypes = new Set(existingAchievements.map((a: any) => a.achievement_type))
  const newAchievements = []

  // Check submission achievements
  if (stats.products_submitted >= 1 && !earnedTypes.has("FIRST_SUBMISSION")) {
    newAchievements.push("FIRST_SUBMISSION")
  }
  if (stats.products_submitted >= 5 && !earnedTypes.has("SUBMISSION_STREAK_5")) {
    newAchievements.push("SUBMISSION_STREAK_5")
  }
  if (stats.products_submitted >= 10 && !earnedTypes.has("SUBMISSION_STREAK_10")) {
    newAchievements.push("SUBMISSION_STREAK_10")
  }

  // Check vote achievements
  if (stats.votes_cast >= 1 && !earnedTypes.has("FIRST_VOTE")) {
    newAchievements.push("FIRST_VOTE")
  }
  if (stats.votes_cast >= 50 && !earnedTypes.has("VOTE_STREAK_50")) {
    newAchievements.push("VOTE_STREAK_50")
  }
  if (stats.votes_cast >= 100 && !earnedTypes.has("VOTE_STREAK_100")) {
    newAchievements.push("VOTE_STREAK_100")
  }

  // Check votes received achievements
  if (stats.votes_received >= 50 && !earnedTypes.has("VOTES_RECEIVED_50")) {
    newAchievements.push("VOTES_RECEIVED_50")
  }
  if (stats.votes_received >= 100 && !earnedTypes.has("VOTES_RECEIVED_100")) {
    newAchievements.push("VOTES_RECEIVED_100")
  }
  if (stats.votes_received >= 500 && !earnedTypes.has("VOTES_RECEIVED_500")) {
    newAchievements.push("VOTES_RECEIVED_500")
  }

  // Check comment achievements
  if (stats.comments_made >= 1 && !earnedTypes.has("FIRST_COMMENT")) {
    newAchievements.push("FIRST_COMMENT")
  }
  if (stats.comments_made >= 25 && !earnedTypes.has("COMMENT_STREAK_25")) {
    newAchievements.push("COMMENT_STREAK_25")
  }

  // Check collection achievements
  if (stats.collections_created >= 1 && !earnedTypes.has("FIRST_COLLECTION")) {
    newAchievements.push("FIRST_COLLECTION")
  }
  if (stats.collections_created >= 5 && !earnedTypes.has("COLLECTION_STREAK_5")) {
    newAchievements.push("COLLECTION_STREAK_5")
  }

  // Award new achievements
  for (const achievementType of newAchievements) {
    const achievement = ACHIEVEMENTS[achievementType as keyof typeof ACHIEVEMENTS]
    if (achievement) {
      const achievementId = `ach-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      await executeQuery(
        `INSERT INTO user_achievements 
         (id, user_id, achievement_type, achievement_name, achievement_description, points_awarded)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          achievementId,
          userId,
          achievementType,
          achievement.name,
          achievement.description,
          achievement.points
        ]
      )

      // Add bonus points
      await executeQuery(
        "UPDATE user_reputation SET total_points = total_points + ? WHERE user_id = ?",
        [achievement.points, userId]
      )
      
      await executeQuery(
        "UPDATE users SET total_points = total_points + ? WHERE id = ?",
        [achievement.points, userId]
      )
    }
  }
}