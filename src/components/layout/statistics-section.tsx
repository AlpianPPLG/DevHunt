// d:\Development\devhunt\src\components\layout\statistics-section.tsx
"use client"

import { useState, useEffect } from "react"
import { 
  Package, Users, Eye, ThumbsUp
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface Statistic {
  label: string
  value: string
  icon: React.ReactNode
  color: string
}

export function StatisticsSection() {
  const [statistics, setStatistics] = useState<Statistic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulating API call with mock data
    setTimeout(() => {
      setStatistics([
        {
          label: "Developer Tools",
          value: "5,000+",
          icon: <Package className="h-6 w-6" />,
          color: "bg-blue-500/10 text-blue-500"
        },
        {
          label: "Community Members",
          value: "20,000+",
          icon: <Users className="h-6 w-6" />,
          color: "bg-green-500/10 text-green-500"
        },
        {
          label: "Monthly Visitors",
          value: "100,000+",
          icon: <Eye className="h-6 w-6" />,
          color: "bg-purple-500/10 text-purple-500"
        },
        {
          label: "Upvotes Given",
          value: "250,000+",
          icon: <ThumbsUp className="h-6 w-6" />,
          color: "bg-orange-500/10 text-orange-500"
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">DevHunt in Numbers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our growing community of developers discovering and sharing tools
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-6 border rounded-lg bg-card">
                <div className="flex items-center justify-center mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
                <div className="text-center">
                  <Skeleton className="h-8 w-24 mx-auto mb-2" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>
              </div>
            ))
          ) : (
            statistics.map((stat, index) => (
              <div key={index} className="p-6 border rounded-lg bg-card">
                <div className="flex items-center justify-center mb-4">
                  <div className={cn("h-16 w-16 rounded-full flex items-center justify-center", stat.color)}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default StatisticsSection;