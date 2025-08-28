import { useCallback, useEffect, useRef } from 'react'
import { useAuth } from '@/lib/hooks/use-auth'

interface AnalyticsEvent {
  type: 'view' | 'click'
  clickType?: 'thumbnail' | 'title' | 'tagline' | 'external_link'
  productId: string
  metadata?: Record<string, any>
}

interface UseAnalyticsOptions {
  autoTrackViews?: boolean
  autoTrackClicks?: boolean
  debounceMs?: number
}

export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const { user } = useAuth()
  const { autoTrackViews = true, autoTrackClicks = true, debounceMs = 1000 } = options
  const viewTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const trackedViews = useRef<Set<string>>(new Set())

  // Track product view
  const trackView = useCallback(async (productId: string, metadata?: Record<string, any>) => {
    try {
      const response = await fetch(`/api/products/${productId}/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'view',
          metadata
        }),
      })

      if (!response.ok) {
        console.warn('Failed to track product view:', response.statusText)
      }
    } catch (error) {
      console.warn('Failed to track product view:', error)
    }
  }, [])

  // Track product click
  const trackClick = useCallback(async (productId: string, clickType: string, metadata?: Record<string, any>) => {
    try {
      const response = await fetch(`/api/products/${productId}/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'click',
          clickType,
          metadata
        }),
      })

      if (!response.ok) {
        console.warn('Failed to track product click:', response.statusText)
      }
    } catch (error) {
      console.warn('Failed to track product click:', error)
    }
  }, [])

  // Track custom analytics event
  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    try {
      const response = await fetch(`/api/products/${event.productId}/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })

      if (!response.ok) {
        console.warn('Failed to track analytics event:', response.statusText)
      }
    } catch (error) {
      console.warn('Failed to track analytics event:', error)
    }
  }, [])

  // Auto-track product views when component mounts
  const trackProductView = useCallback((productId: string, metadata?: Record<string, any>) => {
    if (!autoTrackViews || trackedViews.current.has(productId)) {
      return
    }

    // Debounce view tracking to avoid spam
    if (viewTimeoutRef.current) {
      clearTimeout(viewTimeoutRef.current)
    }

    viewTimeoutRef.current = setTimeout(() => {
      trackView(productId, metadata)
      trackedViews.current.add(productId)
    }, debounceMs)
  }, [autoTrackViews, debounceMs, trackView])

  // Auto-track clicks on product elements
  const trackProductClick = useCallback((productId: string, clickType: string, metadata?: Record<string, any>) => {
    if (!autoTrackClicks) {
      return
    }

    trackClick(productId, clickType, metadata)
  }, [autoTrackClicks, trackClick])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (viewTimeoutRef.current) {
        clearTimeout(viewTimeoutRef.current)
      }
    }
  }, [])

  // Track user engagement metrics
  const trackEngagement = useCallback(async (productId: string, engagementType: string, metadata?: Record<string, any>) => {
    try {
      const response = await fetch(`/api/analytics/engagement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          engagementType,
          userId: user?.id,
          metadata
        }),
      })

      if (!response.ok) {
        console.warn('Failed to track engagement:', response.statusText)
      }
    } catch (error) {
      console.warn('Failed to track engagement:', error)
    }
  }, [user?.id])

  // Track time spent on product page
  const trackTimeSpent = useCallback(async (productId: string, timeSpentMs: number) => {
    try {
      const response = await fetch(`/api/analytics/time-spent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          timeSpentMs,
          userId: user?.id
        }),
      })

      if (!response.ok) {
        console.warn('Failed to track time spent:', response.statusText)
      }
    } catch (error) {
      console.warn('Failed to track time spent:', error)
    }
  }, [user?.id])

  // Track scroll depth
  const trackScrollDepth = useCallback(async (productId: string, scrollDepth: number) => {
    try {
      const response = await fetch(`/api/analytics/scroll-depth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          scrollDepth,
          userId: user?.id
        }),
      })

      if (!response.ok) {
        console.warn('Failed to track scroll depth:', response.statusText)
      }
    } catch (error) {
      console.warn('Failed to track scroll depth:', error)
    }
  }, [user?.id])

  // Get analytics data for a product
  const getProductAnalytics = useCallback(async (productId: string) => {
    try {
      const [viewsResponse, clicksResponse] = await Promise.all([
        fetch(`/api/products/${productId}/track?type=view`),
        fetch(`/api/products/${productId}/track?type=click`)
      ])

      const viewsData = await viewsResponse.json()
      const clicksData = await clicksResponse.json()

      return {
        views: viewsData.stats,
        clicks: clicksData.stats
      }
    } catch (error) {
      console.warn('Failed to get product analytics:', error)
      return { views: {}, clicks: {} }
    }
  }, [])

  return {
    trackView,
    trackClick,
    trackEvent,
    trackProductView,
    trackProductClick,
    trackEngagement,
    trackTimeSpent,
    trackScrollDepth,
    getProductAnalytics,
    isTrackingEnabled: autoTrackViews || autoTrackClicks
  }
}

// Hook for tracking specific product interactions
export function useProductAnalytics(productId: string, options?: UseAnalyticsOptions) {
  const analytics = useAnalytics(options)

  const trackView = useCallback(() => {
    analytics.trackProductView(productId)
  }, [analytics, productId])

  const trackClick = useCallback((clickType: string, metadata?: Record<string, any>) => {
    analytics.trackProductClick(productId, clickType, metadata)
  }, [analytics, productId])

  const trackEngagement = useCallback((engagementType: string, metadata?: Record<string, any>) => {
    analytics.trackEngagement(productId, engagementType, metadata)
  }, [analytics, productId])

  const trackTimeSpent = useCallback((timeSpentMs: number) => {
    analytics.trackTimeSpent(productId, timeSpentMs)
  }, [analytics, productId])

  const trackScrollDepth = useCallback((scrollDepth: number) => {
    analytics.trackScrollDepth(productId, scrollDepth)
  }, [analytics, productId])

  const getAnalytics = useCallback(() => {
    return analytics.getProductAnalytics(productId)
  }, [analytics, productId])

  return {
    trackView,
    trackClick,
    trackEngagement,
    trackTimeSpent,
    trackScrollDepth,
    getAnalytics,
    isTrackingEnabled: analytics.isTrackingEnabled
  }
}
