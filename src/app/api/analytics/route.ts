import { NextResponse } from "next/server"
import { z } from "zod"
import { getCurrentUser } from "@/lib/auth"
import { queryRow, executeQuery } from "@/lib/database"

const TrackViewSchema = z.object({
  product_id: z.string().min(1),
  session_id: z.string().optional(),
  referrer: z.string().optional(),
  user_agent: z.string().optional()
})

const TrackClickSchema = z.object({
  product_id: z.string().min(1),
  click_type: z.enum(["website", "external_link", "demo", "github"]),
  target_url: z.string().url().optional()
})

// POST - Track product view
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === "view") {
      return await trackView(request, body)
    } else if (action === "click") {
      return await trackClick(request, body)
    } else {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("Analytics tracking failed:", error)
    return NextResponse.json(
      { error: "Failed to track analytics" },
      { status: 500 }
    )
  }
}

async function trackView(request: Request, body: any) {
  const validatedData = TrackViewSchema.parse(body)
  const user = await getCurrentUser()

  // Get client IP and user agent
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1"
  const userAgent = request.headers.get("user-agent") || ""

  // Determine device type
  let deviceType = "desktop"
  if (userAgent.includes("Mobile")) {
    deviceType = "mobile"
  } else if (userAgent.includes("Tablet")) {
    deviceType = "tablet"
  }

  // Check if product exists
  const product = await queryRow(
    "SELECT id FROM products WHERE id = ?",
    [validatedData.product_id]
  )

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    )
  }

  // Check for recent view from same user/session to avoid spam
  const recentView = await queryRow(
    `SELECT id FROM product_views 
     WHERE product_id = ? 
     AND (user_id = ? OR session_id = ?)
     AND viewed_at > NOW() - INTERVAL 1 HOUR`,
    [
      validatedData.product_id,
      user?.id || null,
      validatedData.session_id || null
    ]
  )

  if (!recentView) {
    // Track the view
    const viewId = `view-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    await executeQuery(
      `INSERT INTO product_views 
       (id, product_id, user_id, session_id, ip_address, user_agent, referrer, device_type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        viewId,
        validatedData.product_id,
        user?.id || null,
        validatedData.session_id || null,
        ip,
        userAgent,
        validatedData.referrer || null,
        deviceType
      ]
    )

    // Note: view_count column doesn't exist, so we don't update it
  }

  return NextResponse.json({ success: true })
}

async function trackClick(request: Request, body: any) {
  const validatedData = TrackClickSchema.parse(body)
  const user = await getCurrentUser()

  // Get client IP and user agent
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1"
  const userAgent = request.headers.get("user-agent") || ""

  // Check if product exists
  const product = await queryRow(
    "SELECT id FROM products WHERE id = ?",
    [validatedData.product_id]
  )

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    )
  }

  // Track the click
  const clickId = `click-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  await executeQuery(
    `INSERT INTO product_clicks 
     (id, product_id, user_id, click_type, target_url, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      clickId,
      validatedData.product_id,
      user?.id || null,
      validatedData.click_type,
      validatedData.target_url || null,
      ip,
      userAgent
    ]
  )

  return NextResponse.json({ success: true })
}