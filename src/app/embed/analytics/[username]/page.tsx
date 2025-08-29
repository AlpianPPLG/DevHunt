"use client"

import { useSearchParams } from "next/navigation"
import { UserAnalyticsDashboard } from "@/components/analytics/user-analytics-dashboard"
import { Card, CardContent } from "@/components/ui/card"

export default function EmbeddedAnalytics({ params }: { params: { username: string } }) {
  const { username } = params
  const searchParams = useSearchParams()
  const timeRange = (searchParams.get('timeRange') as "7d" | "30d" | "90d") || "30d"
  
  // Construct filter options from query params
  const filterOptions = {
    dateRange: timeRange,
    sortBy: searchParams.get('sortBy') || "performance",
    showOnlyActive: searchParams.get('activeOnly') === 'true',
    includedMetrics: searchParams.get('metrics')?.split(',') || ["views", "votes", "comments", "engagement"],
    productCategory: searchParams.get('category') || undefined,
    minViews: searchParams.get('minViews') ? Number(searchParams.get('minViews')) : undefined,
    minVotes: searchParams.get('minVotes') ? Number(searchParams.get('minVotes')) : undefined,
    minComments: searchParams.get('minComments') ? Number(searchParams.get('minComments')) : undefined,
  }

  return (
    <div className="p-2">
      <Card>
        <CardContent className="p-4">
          {/* Small header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">Analytics for @{username}</h2>
              <p className="text-xs text-muted-foreground">
                {timeRange === "7d" && "Last 7 Days"}
                {timeRange === "30d" && "Last 30 Days"}
                {timeRange === "90d" && "Last 90 Days"}
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              Powered by <span className="font-semibold">DevHunt</span>
            </div>
          </div>
          
          {/* Analytics Dashboard (Compact Mode) */}
          <UserAnalyticsDashboard 
            username={username}
            timeRange={timeRange}
            filterOptions={filterOptions}
          />
        </CardContent>
      </Card>
    </div>
  )
}