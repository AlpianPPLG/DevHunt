# Product Tracking

Detailed documentation on how product tracking works in DevHunt and how to implement it effectively.

## 🎯 Tracking Overview

Product tracking in DevHunt monitors user interactions with developer tools to provide valuable analytics insights. This system tracks views, clicks, engagement metrics, and performance indicators to help tool creators understand how their submissions are performing.

## 📡 Tracking Implementation

### Frontend Tracking

#### View Tracking
Automatic tracking of product page views using a custom React hook:

```tsx
// lib/hooks/use-analytics.ts
import { useEffect } from "react"

export function useProductAnalytics(productId: string) {
  const trackView = useCallback(async () => {
    try {
      await fetch("/api/products/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId,
          eventType: "view"
        })
      })
    } catch (error) {
      console.error("Failed to track view:", error)
    }
  }, [productId])

  const trackClick = useCallback(async (elementType: string, elementId?: string) => {
    try {
      await fetch("/api/products/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId,
          eventType: "click",
          elementType,
          elementId
        })
      })
    } catch (error) {
      console.error("Failed to track click:", error)
    }
  }, [productId])

  return { trackView, trackClick }
}
```

#### Component Integration
Integrating tracking into product components:

```tsx
// components/product/product-page.tsx
import { useProductAnalytics } from "@/lib/hooks/use-analytics"

function ProductPage({ product }: { product: Product }) {
  const { trackView, trackClick } = useProductAnalytics(product.id)

  useEffect(() => {
    // Track page view when component mounts
    trackView()
  }, [trackView])

  const handleThumbnailClick = () => {
    trackClick("thumbnail", "product-thumbnail")
  }

  const handleWebsiteClick = () => {
    trackClick("website-link", "visit-website")
  }

  return (
    <div className="product-page">
      <div onClick={handleThumbnailClick}>
        <ThumbnailImage src={product.thumbnail_url} alt={product.name} />
      </div>
      
      <h1>{product.name}</h1>
      <p>{product.tagline}</p>
      
      <button onClick={handleWebsiteClick}>
        Visit Website
      </button>
      
      {/* Other product details */}
    </div>
  )
}
```

#### Click Tracking Component
A reusable component for tracking clicks on specific elements:

```tsx
// components/analytics/click-tracker.tsx
import { useProductAnalytics } from "@/lib/hooks/use-analytics"
import { ReactNode } from "react"

interface ClickTrackerProps {
  productId: string
  elementType: string
  elementId?: string
  children: ReactNode
  className?: string
}

export function ClickTracker({
  productId,
  elementType,
  elementId,
  children,
  className
}: ClickTrackerProps) {
  const { trackClick } = useProductAnalytics(productId)

  const handleClick = (e: React.MouseEvent) => {
    trackClick(elementType, elementId)
    // Preserve any existing onClick handlers
    if (React.isValidElement(children) && children.props.onClick) {
      children.props.onClick(e)
    }
  }

  // Clone the child element and add our click handler
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      className: className || children.props.className
    })
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
```

### Backend Tracking API

#### Tracking Endpoint
API route for handling tracking events:

```ts
// app/api/products/track/route.ts
import { NextRequest } from "next/server"
import { recordTrackingEvent } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, eventType, elementType, elementId } = body

    // Validate required fields
    if (!productId || !eventType) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      )
    }

    // Extract request metadata
    const ipAddress = request.headers.get("x-forwarded-for") || 
                     request.headers.get("x-real-ip") || 
                     "unknown"
    
    const userAgent = request.headers.get("user-agent") || "unknown"
    const referrer = request.headers.get("referer") || "direct"

    // Record the tracking event
    await recordTrackingEvent({
      productId,
      eventType,
      elementType,
      elementId,
      userId: request.headers.get("x-user-id") || null,
      sessionId: request.headers.get("x-session-id") || null,
      ipAddress,
      userAgent,
      referrer
    })

    // Update cached metrics
    await updateProductMetrics(productId)

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    )
  } catch (error) {
    console.error("Tracking error:", error)
    return new Response(
      JSON.stringify({ error: "Failed to record tracking event" }),
      { status: 500 }
    )
  }
}
```

#### Database Integration
Database functions for storing tracking data:

```ts
// lib/database.ts
import { pool } from "@/lib/database/connection"

interface TrackingEvent {
  productId: string
  eventType: string
  elementType?: string
  elementId?: string
  userId?: string
  sessionId?: string
  ipAddress: string
  userAgent: string
  referrer: string
}

export async function recordTrackingEvent(event: TrackingEvent) {
  const query = `
    INSERT INTO product_tracking (
      product_id, event_type, element_type, element_id,
      user_id, session_id, ip_address, user_agent, referrer
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  const values = [
    event.productId,
    event.eventType,
    event.elementType || null,
    event.elementId || null,
    event.userId || null,
    event.sessionId || null,
    event.ipAddress,
    event.userAgent,
    event.referrer
  ]

  await pool.execute(query, values)
}

export async function updateProductMetrics(productId: string) {
  // Update view count
  const viewQuery = `
    UPDATE products 
    SET view_count = (
      SELECT COUNT(*) 
      FROM product_tracking 
      WHERE product_id = ? AND event_type = 'view'
    ) WHERE id = ?
  `
  
  await pool.execute(viewQuery, [productId, productId])

  // Update click count
  const clickQuery = `
    UPDATE products 
    SET click_count = (
      SELECT COUNT(*) 
      FROM product_tracking 
      WHERE product_id = ? AND event_type = 'click'
    ) WHERE id = ?
  `
  
  await pool.execute(clickQuery, [productId, productId])
}
```

## 📊 Data Collection

### View Tracking Data
Information collected when users view product pages:

#### Basic Information
- Product ID
- Timestamp
- User ID (if authenticated)
- Session ID
- IP address
- User agent
- Referrer URL

#### Technical Details
- Screen resolution
- Device type
- Browser information
- Operating system
- View duration (calculated)

#### Context Information
- Traffic source
- Campaign parameters
- UTM tracking
- Custom dimensions

### Click Tracking Data
Information collected when users interact with product elements:

#### Interaction Details
- Product ID
- Element type (thumbnail, link, button, etc.)
- Element ID (specific element identifier)
- Click coordinates (optional)
- Timestamp
- User ID (if authenticated)
- Session ID

#### Context Information
- Page URL
- Scroll position
- Time on page
- Previous interactions
- Conversion funnel stage

## 🔄 Data Processing

### Real-time Processing
Immediate handling of tracking events:

```ts
// lib/analytics/realtime.ts
import { redis } from "@/lib/redis"

export async function processRealtimeEvent(event: TrackingEvent) {
  // Update real-time counters
  await redis.incr(`product:${event.productId}:views`)
  await redis.incr(`product:${event.productId}:clicks`)
  
  // Store recent events for session analysis
  const eventKey = `session:${event.sessionId}:events`
  await redis.lpush(eventKey, JSON.stringify(event))
  await redis.expire(eventKey, 3600) // Expire after 1 hour
  
  // Update user activity
  if (event.userId) {
    await redis.zadd(
      "user:activity", 
      Date.now(), 
      `${event.userId}:${event.eventType}`
    )
  }
}
```

### Batch Processing
Scheduled jobs for aggregating and analyzing data:

```ts
// lib/analytics/batch.ts
import { pool } from "@/lib/database/connection"

export async function aggregateDailyMetrics() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const dateString = yesterday.toISOString().split('T')[0]

  // Aggregate views by product
  const viewQuery = `
    INSERT INTO daily_product_metrics (product_id, date, view_count)
    SELECT 
      product_id,
      DATE(created_at) as date,
      COUNT(*) as view_count
    FROM product_tracking
    WHERE event_type = 'view' 
    AND DATE(created_at) = ?
    GROUP BY product_id, DATE(created_at)
    ON DUPLICATE KEY UPDATE view_count = VALUES(view_count)
  `

  await pool.execute(viewQuery, [dateString])

  // Aggregate clicks by product and element
  const clickQuery = `
    INSERT INTO daily_product_metrics (product_id, date, click_count)
    SELECT 
      product_id,
      DATE(created_at) as date,
      COUNT(*) as click_count
    FROM product_tracking
    WHERE event_type = 'click' 
    AND DATE(created_at) = ?
    GROUP BY product_id, DATE(created_at)
    ON DUPLICATE KEY UPDATE click_count = VALUES(click_count)
  `

  await pool.execute(clickQuery, [dateString])
}
```

### Performance Scoring
Calculating product performance scores:

```ts
// lib/analytics/scoring.ts
export async function calculatePerformanceScore(productId: string) {
  // Get metrics from database
  const metrics = await getProductMetrics(productId)
  
  // Normalize metrics to 0-100 scale
  const normalizedViews = normalizeMetric(metrics.views, globalMaxViews)
  const normalizedVotes = normalizeMetric(metrics.votes, globalMaxVotes)
  const normalizedComments = normalizeMetric(metrics.comments, globalMaxComments)
  const normalizedClicks = normalizeMetric(metrics.clicks, globalMaxClicks)
  
  // Apply weights
  const score = (
    normalizedVotes * 0.4 +
    normalizedComments * 0.3 +
    normalizedViews * 0.2 +
    normalizedClicks * 0.1
  )
  
  // Apply recency boost
  const recencyMultiplier = calculateRecencyMultiplier(metrics.lastActivity)
  const finalScore = score * recencyMultiplier
  
  // Store the score
  await updateProductScore(productId, finalScore)
  
  return finalScore
}
```

## 🛠️ Tracking Customization

### Custom Event Types
Extending tracking for specific use cases:

```tsx
// Custom tracking for product demos
const trackDemoStart = () => {
  trackClick("demo", "start-demo")
}

const trackDemoCompletion = () => {
  trackClick("demo", "complete-demo")
}

const trackDemoExit = () => {
  trackClick("demo", "exit-demo")
}
```

### Element-Specific Tracking
Tracking specific UI elements:

```tsx
// Tracking media gallery interactions
const MediaGallery = ({ media, productId }: { media: Media[], productId: string }) => {
  return (
    <div className="media-gallery">
      {media.map((item, index) => (
        <ClickTracker
          key={item.id}
          productId={productId}
          elementType="media-item"
          elementId={`media-${index}`}
        >
          <img src={item.url} alt={item.caption} />
        </ClickTracker>
      ))}
    </div>
  )
}
```

### User Journey Tracking
Tracking user paths through the application:

```tsx
// Tracking user flow
useEffect(() => {
  // Track when user enters product page
  trackView()
  
  // Track when user leaves product page
  return () => {
    trackClick("navigation", "leave-product-page")
  }
}, [])

const handleNavigation = (destination: string) => {
  trackClick("navigation", `go-to-${destination}`)
  // Perform navigation
}
```

## 📈 Analytics Integration

### Dashboard Updates
Real-time dashboard updates:

```tsx
// components/analytics/live-metrics.tsx
import { useProductAnalytics } from "@/lib/hooks/use-analytics"
import { useEffect, useState } from "react"

export function LiveMetrics({ productId }: { productId: string }) {
  const [metrics, setMetrics] = useState({
    views: 0,
    clicks: 0,
    engagement: 0
  })

  useEffect(() => {
    const channel = new BroadcastChannel(`product-${productId}-updates`)
    
    channel.onmessage = (event) => {
      setMetrics(event.data)
    }
    
    return () => {
      channel.close()
    }
  }, [productId])

  return (
    <div className="live-metrics">
      <div>Views: {metrics.views}</div>
      <div>Clicks: {metrics.clicks}</div>
      <div>Engagement: {metrics.engagement}%</div>
    </div>
  )
}
```

### Performance Alerts
Notifying users of significant changes:

```ts
// lib/analytics/alerts.ts
export async function checkPerformanceAlerts(productId: string) {
  const currentScore = await getProductScore(productId)
  const previousScore = await getPreviousProductScore(productId)
  
  const change = ((currentScore - previousScore) / previousScore) * 100
  
  // Alert if performance drops significantly
  if (change < -20) {
    await sendAlert({
      type: "performance_drop",
      productId,
      message: `Performance dropped by ${Math.abs(change).toFixed(1)}%`,
      severity: "warning"
    })
  }
  
  // Alert if performance improves significantly
  if (change > 50) {
    await sendAlert({
      type: "performance_improvement",
      productId,
      message: `Performance improved by ${change.toFixed(1)}%`,
      severity: "success"
    })
  }
}
```

## 🔍 Debugging and Testing

### Tracking Validation
Ensuring tracking events are recorded correctly:

```ts
// __tests__/tracking.test.ts
import { recordTrackingEvent } from "@/lib/database"
import { mockTrackingEvent } from "@/__tests__/mocks/analytics"

describe("Tracking", () => {
  it("records view events correctly", async () => {
    const event = {
      ...mockTrackingEvent,
      eventType: "view"
    }
    
    await recordTrackingEvent(event)
    
    const storedEvent = await getTrackingEvent(event.id)
    expect(storedEvent).toEqual(event)
  })
  
  it("records click events with element data", async () => {
    const event = {
      ...mockTrackingEvent,
      eventType: "click",
      elementType: "thumbnail",
      elementId: "product-thumbnail-123"
    }
    
    await recordTrackingEvent(event)
    
    const storedEvent = await getTrackingEvent(event.id)
    expect(storedEvent.elementType).toBe("thumbnail")
    expect(storedEvent.elementId).toBe("product-thumbnail-123")
  })
})
```

### Testing Tracking Components
Testing React components with tracking:

```tsx
// __tests__/components/click-tracker.test.tsx
import { render, fireEvent, screen } from "@testing-library/react"
import { ClickTracker } from "@/components/analytics/click-tracker"

// Mock the analytics hook
jest.mock("@/lib/hooks/use-analytics", () => ({
  useProductAnalytics: () => ({
    trackView: jest.fn(),
    trackClick: jest.fn()
  })
}))

describe("ClickTracker", () => {
  it("calls trackClick when clicked", () => {
    const trackClick = jest.fn()
    
    // Mock the hook to return our test function
    jest.spyOn(require("@/lib/hooks/use-analytics"), "useProductAnalytics")
      .mockReturnValue({ trackClick })
    
    render(
      <ClickTracker 
        productId="123" 
        elementType="button"
        elementId="test-button"
      >
        <button>Click me</button>
      </ClickTracker>
    )
    
    fireEvent.click(screen.getByText("Click me"))
    expect(trackClick).toHaveBeenCalledWith("button", "test-button")
  })
})
```

## 🚫 Privacy Considerations

### Data Anonymization
Protecting user privacy in tracking:

```ts
// lib/analytics/privacy.ts
export function anonymizeIpAddress(ip: string): string {
  // For IPv4, mask the last octet
  if (ip.includes('.')) {
    return ip.replace(/\.\d+$/, '.0')
  }
  
  // For IPv6, mask the last part
  if (ip.includes(':')) {
    return ip.replace(/:[0-9a-f]{1,4}$/i, ':0')
  }
  
  return ip
}

export function shouldTrackUser(userId: string | null): boolean {
  // Respect user privacy settings
  if (!userId) return true // Track anonymous users
  
  // Check user's tracking preferences
  const userPreferences = getUserPreferences(userId)
  return userPreferences.allowTracking !== false
}
```

### Consent Management
Handling user consent for tracking:

```tsx
// components/analytics/consent-banner.tsx
import { useState, useEffect } from "react"

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  
  useEffect(() => {
    const consent = localStorage.getItem("analytics-consent")
    if (consent === null) {
      setShowBanner(true)
    }
  }, [])
  
  const accept = () => {
    localStorage.setItem("analytics-consent", "accepted")
    setShowBanner(false)
  }
  
  const reject = () => {
    localStorage.setItem("analytics-consent", "rejected")
    setShowBanner(false)
  }
  
  if (!showBanner) return null
  
  return (
    <div className="consent-banner">
      <p>We use analytics to improve your experience. Accept to help us improve DevHunt.</p>
      <button onClick={accept}>Accept</button>
      <button onClick={reject}>Reject</button>
    </div>
  )
}
```

Product tracking in DevHunt provides valuable insights into user behavior and product performance while respecting user privacy and maintaining data accuracy. This comprehensive tracking system enables tool creators to understand how their submissions are performing and make data-driven decisions to improve engagement and visibility.