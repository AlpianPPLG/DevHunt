// d:\Development\devhunt\src\components\layout\recent-activity-section.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ThumbsUp, MessageSquare, PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

type ActivityType = "vote" | "comment" | "submit"

interface Activity {
  id: string
  type: ActivityType
  user: {
    id: string
    name: string
    username: string
    avatar?: string
  }
  product: {
    id: string
    name: string
    slug: string
  }
  timestamp: string
}

export function RecentActivitySection() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating API call with mock data
    setTimeout(() => {
      setActivities([
        {
          id: "1",
          type: "vote",
          user: {
            id: "u1",
            name: "Sarah Chen",
            username: "sarahchen",
            avatar: "https://github.com/shadcn.png"
          },
          product: {
            id: "p1",
            name: "React 21",
            slug: "react-21"
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 minutes ago
        },
        {
          id: "2",
          type: "comment",
          user: {
            id: "u2",
            name: "Alex Johnson",
            username: "alexj",
            avatar: "https://github.com/shadcn.png"
          },
          product: {
            id: "p2",
            name: "Next.js 15",
            slug: "nextjs-15"
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() // 45 minutes ago
        },
        {
          id: "3",
          type: "submit",
          user: {
            id: "u3",
            name: "Maria Garcia",
            username: "maria_g",
            avatar: "https://github.com/shadcn.png"
          },
          product: {
            id: "p3",
            name: "TypeScript 5.2",
            slug: "typescript-5-2"
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() // 2 hours ago
        },
        {
          id: "4",
          type: "vote",
          user: {
            id: "u4",
            name: "James Smith",
            username: "jamessmith",
          },
          product: {
            id: "p4",
            name: "Tailwind CSS 4",
            slug: "tailwind-css-4"
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString() // 3 hours ago
        },
        {
          id: "5",
          type: "comment",
          user: {
            id: "u5",
            name: "Olivia Williams",
            username: "oliviaw",
            avatar: "https://github.com/shadcn.png"
          },
          product: {
            id: "p1",
            name: "React 21",
            slug: "react-21"
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString() // 4 hours ago
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getActivityIcon = (type: ActivityType) => {
    switch(type) {
      case "vote": return <ThumbsUp className="h-4 w-4 text-green-500" />
      case "comment": return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "submit": return <PlusCircle className="h-4 w-4 text-purple-500" />
    }
  }

  const getActivityText = (activity: Activity) => {
    switch(activity.type) {
      case "vote": return <span>upvoted</span>
      case "comment": return <span>commented on</span>
      case "submit": return <span>submitted</span>
    }
  }

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Recent Activity</h2>
        <div className="space-y-4">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg flex items-start">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="p-4 border rounded-lg flex items-start">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="flex flex-wrap gap-1 items-center">
                    <Link href={`/user/${activity.user.username}`} className="font-medium hover:underline">
                      {activity.user.name}
                    </Link>
                    <span className="inline-flex items-center gap-1">
                      {getActivityIcon(activity.type)}
                      {getActivityText(activity)}
                    </span>
                    <Link href={`/product/${activity.product.slug}`} className="font-medium hover:underline">
                      {activity.product.name}
                    </Link>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default RecentActivitySection;