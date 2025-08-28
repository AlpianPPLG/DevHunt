"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Target,
  Award,
  Download,
  Share2,
  Filter
} from "lucide-react"
import { UserAnalyticsDashboard } from "@/components/analytics/user-analytics-dashboard"
import { useAuth } from "@/lib/hooks/use-auth"

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")
  const [] = useState(false)

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
          <p className="text-muted-foreground mb-4">
            Please log in to view your analytics
          </p>
          <Button>Login to Continue</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track your posting performance and engagement metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Time Range:</span>
          <Button
            variant={timeRange === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("7d")}
          >
            7 Days
          </Button>
          <Button
            variant={timeRange === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("30d")}
          >
            30 Days
          </Button>
          <Button
            variant={timeRange === "90d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("90d")}
          >
            90 Days
          </Button>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <UserAnalyticsDashboard 
        username={user.username} 
        className="mb-8"
      />

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Growth Insights
            </CardTitle>
            <CardDescription>
              Key metrics showing your content growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Content Velocity</span>
                <Badge variant="secondary">+15% this month</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Engagement Growth</span>
                <Badge variant="secondary">+8% this week</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Reach Expansion</span>
                <Badge variant="secondary">+22% this month</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Performance Goals
            </CardTitle>
            <CardDescription>
              Track your progress towards goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Monthly Posts</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">4/5</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Engagement Rate</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">25%/30%</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '83%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Community Growth</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">2/3</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Recommendations for Growth
          </CardTitle>
          <CardDescription>
            Actionable insights to improve your posting performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2 text-blue-800">Posting Frequency</h4>
              <p className="text-sm text-blue-700 mb-3">
                Increase your posting frequency to maintain consistent engagement
              </p>
              <Button size="sm" variant="outline" className="w-full">
                View Schedule
              </Button>
            </div>
            
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2 text-green-800">Content Quality</h4>
              <p className="text-sm text-green-700 mb-3">
                Focus on high-quality thumbnails and compelling descriptions
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Learn More
              </Button>
            </div>
            
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold mb-2 text-purple-800">Community Engagement</h4>
              <p className="text-sm text-purple-700 mb-3">
                Engage more with other users' content to build relationships
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Explore Content
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
