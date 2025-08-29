"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserAnalyticsDashboard } from "@/components/analytics/user-analytics-dashboard"
import { 
  ArrowLeft,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/hooks/use-auth"
import { useSearchParams } from "next/navigation"

export default function SharedAnalyticsPage({ params }: { params: { username: string } }) {
  const { username } = params
  const searchParams = useSearchParams()
  const [, setAnalyticsData] = useState<any>(null)
  const timeRange = (searchParams.get('timeRange') as "7d" | "30d" | "90d") || "30d"
  const { user } = useAuth()
  
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

  // Check if this is the owner viewing
  const isOwner = user?.username === username
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              @{username}'s Analytics
              {isOwner && (
                <Button variant="link" size="sm" asChild className="ml-2">
                  <Link href="/analytics">
                    Edit <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              )}
            </h1>
            <p className="text-muted-foreground">
              Shared performance metrics and insights
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">Time Range:</span>
          <Card className="inline-block px-3 py-1 text-sm">
            {timeRange === "7d" && "7 Days"}
            {timeRange === "30d" && "30 Days"}
            {timeRange === "90d" && "90 Days"}
          </Card>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <UserAnalyticsDashboard 
        username={username} 
        className="mb-8"
        timeRange={timeRange}
        filterOptions={filterOptions}
        onDataLoad={setAnalyticsData}
      />
      
      {/* Footer */}
      <div className="mt-16 text-center text-sm text-muted-foreground border-t pt-4">
        <p>Shared analytics dashboard powered by DevHunt</p>
        <p className="mt-1">
          <Link href="/" className="underline hover:text-primary">
            Create your own analytics dashboard
          </Link>
        </p>
      </div>
    </div>
  )
}