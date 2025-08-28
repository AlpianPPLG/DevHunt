"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface Tag {
  id: number
  name: string
  description?: string
}

export function TagFilter() {
  const [tags, setTags] = useState<Tag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTag = searchParams.get("tag")

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/tags")
      if (response.ok) {
        const data = await response.json()
        setTags(data.tags)
      }
    } catch (error) {
      console.error("Failed to fetch tags:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTagClick = (tagName: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (activeTag === tagName) {
      // Remove filter if clicking active tag
      params.delete("tag")
    } else {
      // Set new tag filter
      params.set("tag", tagName)
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : "/"
    router.push(newUrl)
  }

  const clearFilter = () => {
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-6 w-16 bg-muted animate-pulse rounded-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-muted-foreground">Filter by tag:</span>

        {activeTag && (
          <div className="flex items-center gap-2">
            <Badge variant="default" className="flex items-center gap-1">
              {activeTag}
              <button onClick={clearFilter} className="ml-1 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Button
            key={tag.id}
            variant={activeTag === tag.name ? "default" : "outline"}
            size="sm"
            onClick={() => handleTagClick(tag.name)}
            className="h-8 text-xs"
          >
            {tag.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
