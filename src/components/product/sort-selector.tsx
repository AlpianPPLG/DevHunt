"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Clock, ThumbsUp } from "lucide-react"

const sortOptions = [
  {
    value: "trending",
    label: "Trending",
    icon: TrendingUp,
    description: "Based on recent activity and votes"
  },
  {
    value: "newest",
    label: "Newest",
    icon: Clock,
    description: "Most recently submitted"
  },
  {
    value: "most_voted",
    label: "Most Voted",
    icon: ThumbsUp,
    description: "Highest vote count"
  }
]

export function SortSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort") || "trending"
  const currentTag = searchParams.get("tag")

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams()
    
    if (value !== "trending") {
      params.set("sort", value)
    }
    
    if (currentTag) {
      params.set("tag", currentTag)
    }

    const queryString = params.toString()
    const url = queryString ? `/?${queryString}` : "/"
    
    router.push(url)
  }

  const currentOption = sortOptions.find(option => option.value === currentSort)

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          <div className="flex items-center gap-2">
            {currentOption?.icon && <currentOption.icon className="h-4 w-4" />}
            <span>{currentOption?.label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              <option.icon className="h-4 w-4" />
              <div>
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SortSelector