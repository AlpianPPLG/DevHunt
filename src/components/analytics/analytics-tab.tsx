"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  MessageSquare, 
  Eye, 
  ThumbsUp, 
  Target,
  Award,
  Clock,
  BarChart3
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalyticsTabProps {
  username: string
  className?: string
}

export function AnalyticsTab({ username, className }: AnalyticsTabProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className={cn("space-y-6", className)}>
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Track your posting performance and engagement
          </p>
        </div>
        <Button variant="outline" size="sm">
          <BarChart3 className="h-4 w-4 mr-2" />
          View Full Dashboard
        </Button>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Products</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <ThumbsUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Total Votes</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <MessageSquare className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Comments</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <Target className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">25%</div>
            <p className="text-xs text-muted-foreground">Engagement</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Growth This Month</CardTitle>
                <CardDescription>Your posting activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Week</span>
                    <Badge variant="secondary">1 new</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Month</span>
                    <Badge variant="secondary">3 new</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total</span>
                    <Badge variant="default">4 products</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engagement Metrics</CardTitle>
                <CardDescription>How your content performs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg Votes/Product</span>
                    <span className="font-medium">0.5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg Comments/Product</span>
                    <span className="font-medium">0.5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Engagement Rate</span>
                    <span className="font-medium text-green-600">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Performing Products</CardTitle>
              <CardDescription>Your best content by engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "React 21", votes: 1, comments: 1, views: 5, rank: 1 },
                  { name: "Next.js 15", votes: 0, comments: 1, views: 3, rank: 2 },
                  { name: "TypeScript 5.0", votes: 0, comments: 0, views: 2, rank: 3 }
                ].map((product) => (
                  <div key={product.rank} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                      {product.rank}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {product.votes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {product.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {product.views}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity Trends</CardTitle>
              <CardDescription>Last 7 days of engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "Today", votes: 1, comments: 1, views: 2 },
                  { date: "Yesterday", votes: 0, comments: 0, views: 1 },
                  { date: "2 days ago", votes: 0, comments: 1, views: 1 },
                  { date: "3 days ago", votes: 1, comments: 0, views: 1 }
                ].map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">{day.date}</span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-xs">
                        <ThumbsUp className="h-3 w-3 text-blue-500" />
                        {day.votes}
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <MessageSquare className="h-3 w-3 text-green-500" />
                        {day.comments}
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <Eye className="h-3 w-3 text-purple-500" />
                        {day.views}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Activity Summary</CardTitle>
              <CardDescription>What you've been doing on DevHunt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <Award className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <div className="text-lg font-bold">4</div>
                    <p className="text-xs text-muted-foreground">Products Submitted</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <ThumbsUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-lg font-bold">2</div>
                    <p className="text-xs text-muted-foreground">Products Voted On</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Recent Actions</h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Submitted "React 21" 17 minutes ago</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Voted on "Next.js 15" about 1 hour ago</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Commented on "TypeScript 5.0" 2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <h4 className="font-semibold mb-2">Want More Detailed Analytics?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Get comprehensive insights into your posting performance, engagement trends, and growth metrics.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Full Analytics Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
