"use client"

import { useSearchParams } from "next/navigation"

const headerConfig = {
  trending: {
    title: "Trending Developer Tools",
    description: "Discover what the community is talking about today"
  },
  newest: {
    title: "Newest Developer Tools",
    description: "Latest tools submitted by the community"
  },
  most_voted: {
    title: "Most Voted Developer Tools", 
    description: "Top-rated tools loved by developers"
  }
}

export function TrendingHeader() {
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort") || "trending"
  const config = headerConfig[currentSort as keyof typeof headerConfig] || headerConfig.trending

  return (
    <div>
      <h2 className="text-2xl font-bold">{config.title}</h2>
      <p className="text-muted-foreground mt-1">{config.description}</p>
    </div>
  )
}

export default TrendingHeader