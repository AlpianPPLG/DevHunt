"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Eye, 
  ThumbsUp, 
  Calendar,
  BarChart3,
  Activity,
  Target,
  Award,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalyticsData {
  user: {
    id: string
    name: string
    username: string
    joined_at: string
  }
  overview: {
    total_products: number
    total_votes_received: number
    total_comments_received: number
    total_views_received: number
    avg_votes_per_product: number
    avg_comments_per_product: number
    avg_views_per_product: number
    engagement_rate: number
  }
  recent_activity: Array<{
    activity_type: string
    direction: string
    count: number
    date: string
  }>
  product_performance: Array<{
    id: string
    name: string
    tagline: string
    thumbnail_url?: string
    created_at: string
    total_votes: number
    total_comments: number
    total_views: number
    total_clicks: number
    performance_score: number
  }>
  engagement_trends: Array<{
    date: string
    votes: number
    comments: number
    views: number
  }>
  user_activity: {
    products_submitted: number
    products_voted_on: number
    products_commented_on: number
    products_viewed: number
    products_clicked: number
  }
  growth_metrics: {
    products_this_month: number
    products_this_week: number
    products_today: number
  }
  top_products: Array<{
    id: string
    name: string
    tagline: string
    thumbnail_url?: string
    created_at: string
    total_votes: number
    total_comments: number
    total_views: number
  }>
  generated_at: string
}

interface UserAnalyticsDashboardProps {
  username: string
  className?: string
}

export function UserAnalyticsDashboard({ username, className }: UserAnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")

  useEffect(() => {
    fetchAnalytics()
  }, [username, timeRange])

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true)
      setError("")
      
      const response = await fetch(`/api/users/${username}/analytics`)
      if (!response.ok) {
        throw new Error("Failed to fetch analytics")
      }
      
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load analytics")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-8 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error || !analytics) {
    return (
      <Card className={cn("", className)}>
        <CardContent className="p-6 text-center">
          <div className="text-destructive mb-2">Failed to load analytics</div>
          <Button onClick={fetchAnalytics} variant="outline">
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <BarChart3 className="h-4 w-4 text-gray-500" />
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Performance insights for {analytics.user.name} (@{analytics.user.username})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("7d")}
          >
            7D
          </Button>
          <Button
            variant={timeRange === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("30d")}
          >
            30D
          </Button>
          <Button
            variant={timeRange === "90d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("90d")}
          >
            90D
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.overview.total_products)}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.growth_metrics.products_this_month} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.overview.total_votes_received)}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.overview.avg_votes_per_product} avg per product
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.overview.total_comments_received)}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.overview.avg_comments_per_product} avg per product
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.overview.total_views_received)}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.overview.avg_views_per_product} avg per product
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Rate & Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.engagement_rate}%</div>
            <p className="text-xs text-muted-foreground">
              Votes + Comments / Views
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth This Week</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.growth_metrics.products_this_week}</div>
            <p className="text-xs text-muted-foreground">
              New products submitted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Activity</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.user_activity.products_voted_on}</div>
            <p className="text-xs text-muted-foreground">
              Products you've voted on
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Product Performance</TabsTrigger>
          <TabsTrigger value="trends">Engagement Trends</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="top">Top Products</TabsTrigger>
        </TabsList>

        {/* Product Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance Ranking</CardTitle>
              <CardDescription>
                Your products ranked by performance score (votes, comments, views, clicks)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.product_performance.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          Score: {product.performance_score}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{product.tagline}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {product.total_votes} votes
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {product.total_comments} comments
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {product.total_views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(product.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
              <CardDescription>
                Daily engagement metrics over the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.engagement_trends.slice(0, 10).map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{formatDate(trend.date)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm">
                        <ThumbsUp className="h-3 w-3 text-blue-500" />
                        {trend.votes}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <MessageSquare className="h-3 w-3 text-green-500" />
                        {trend.comments}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <Eye className="h-3 w-3 text-purple-500" />
                        {trend.views}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Activity on your products in the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.recent_activity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {activity.activity_type === 'vote' && <ThumbsUp className="h-4 w-4 text-blue-500" />}
                      {activity.activity_type === 'comment' && <MessageSquare className="h-4 w-4 text-green-500" />}
                      {activity.activity_type === 'view' && <Eye className="h-4 w-4 text-purple-500" />}
                      <span className="capitalize">{activity.activity_type}s received</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{activity.count}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(activity.date)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Top Products Tab */}
        <TabsContent value="top" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>
                Your best performing products by engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.top_products.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.tagline}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {product.total_votes} votes
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {product.total_comments} comments
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {product.total_views} views
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Analytics generated at {new Date(analytics.generated_at).toLocaleString()}</p>
        <p>Data updates in real-time</p>
      </div>
    </div>
  )
}
