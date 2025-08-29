/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { AnalyticsFilterOptions } from "./analytics-filter"

interface ActiveFiltersProps {
  options: AnalyticsFilterOptions
  onRemove: (key: keyof AnalyticsFilterOptions | 'all', value?: any) => void
}

export function ActiveFilters({ options, onRemove }: ActiveFiltersProps) {
  // Skip these default values when displaying filters
  const defaultValues = {
    dateRange: "30d",
    sortBy: "performance",
    showOnlyActive: false,
    includedMetrics: ["views", "votes", "comments", "engagement"]
  }
  
  // Get category label from value
  const getCategoryLabel = (value: string) => {
    const categories: Record<string, string> = {
      "dev-tools": "Development Tools",
      "design": "Design Tools",
      "productivity": "Productivity",
      "ai": "AI & ML",
      "saas": "SaaS"
    }
    return categories[value] || value
  }
  
  // Generate badges for active filters
  const getFilterBadges = () => {
    const badges = []
    
    // Category filter
    if (options.productCategory) {
      badges.push(
        <Badge 
          key="category" 
          variant="outline" 
          className="flex items-center gap-1 bg-blue-50"
        >
          Category: {getCategoryLabel(options.productCategory)}
          <X 
            className="h-3 w-3 cursor-pointer hover:text-destructive" 
            onClick={() => onRemove('productCategory')}
          />
        </Badge>
      )
    }
    
    // Min views
    if (options.minViews && options.minViews > 0) {
      badges.push(
        <Badge 
          key="minViews" 
          variant="outline" 
          className="flex items-center gap-1 bg-green-50"
        >
          Min Views: {options.minViews}
          <X 
            className="h-3 w-3 cursor-pointer hover:text-destructive" 
            onClick={() => onRemove('minViews')}
          />
        </Badge>
      )
    }
    
    // Min votes
    if (options.minVotes && options.minVotes > 0) {
      badges.push(
        <Badge 
          key="minVotes" 
          variant="outline" 
          className="flex items-center gap-1 bg-yellow-50"
        >
          Min Votes: {options.minVotes}
          <X 
            className="h-3 w-3 cursor-pointer hover:text-destructive" 
            onClick={() => onRemove('minVotes')}
          />
        </Badge>
      )
    }
    
    // Min comments
    if (options.minComments && options.minComments > 0) {
      badges.push(
        <Badge 
          key="minComments" 
          variant="outline" 
          className="flex items-center gap-1 bg-purple-50"
        >
          Min Comments: {options.minComments}
          <X 
            className="h-3 w-3 cursor-pointer hover:text-destructive" 
            onClick={() => onRemove('minComments')}
          />
        </Badge>
      )
    }
    
    // Show only active
    if (options.showOnlyActive) {
      badges.push(
        <Badge 
          key="showOnlyActive" 
          variant="outline" 
          className="flex items-center gap-1 bg-orange-50"
        >
          Active Products Only
          <X 
            className="h-3 w-3 cursor-pointer hover:text-destructive" 
            onClick={() => onRemove('showOnlyActive')}
          />
        </Badge>
      )
    }
    
    // Custom metrics selection
    const defaultMetrics = defaultValues.includedMetrics
    if (options.includedMetrics && 
        JSON.stringify(options.includedMetrics.sort()) !== JSON.stringify(defaultMetrics.sort())) {
      badges.push(
        <Badge 
          key="metrics" 
          variant="outline" 
          className="flex items-center gap-1 bg-red-50"
        >
          Custom Metrics
          <X 
            className="h-3 w-3 cursor-pointer hover:text-destructive" 
            onClick={() => onRemove('includedMetrics', defaultMetrics)}
          />
        </Badge>
      )
    }
    
    // Sort option if not default
    if (options.sortBy !== defaultValues.sortBy) {
      const sortLabels: Record<string, string> = {
        "performance": "Overall Performance",
        "views": "Most Views",
        "votes": "Most Votes", 
        "comments": "Most Comments",
        "newest": "Newest First",
        "oldest": "Oldest First"
      }
      
      badges.push(
        <Badge 
          key="sortBy" 
          variant="outline" 
          className="flex items-center gap-1 bg-gray-100"
        >
          Sort: {sortLabels[options.sortBy] || options.sortBy}
          <X 
            className="h-3 w-3 cursor-pointer hover:text-destructive" 
            onClick={() => onRemove('sortBy', defaultValues.sortBy)}
          />
        </Badge>
      )
    }
    
    return badges
  }
  
  const badges = getFilterBadges()
  
  if (badges.length === 0) {
    return null
  }
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {badges}
      {badges.length > 1 && (
        <Badge 
          variant="outline" 
          className="flex items-center gap-1 bg-red-100 hover:bg-red-200 cursor-pointer"
          onClick={() => onRemove('all')}
        >
          Clear All Filters
          <X className="h-3 w-3" />
        </Badge>
      )}
    </div>
  )
}