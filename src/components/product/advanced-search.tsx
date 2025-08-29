"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Search, X, SlidersHorizontal } from "lucide-react"

interface SearchFilters {
  query: string
  tags: string[]
  pricing: string
  sort: string
  dateRange: string
}

interface Tag {
  id: number
  name: string
}

export function AdvancedSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get("q") || "",
    tags: searchParams.get("tags")?.split(",").filter(Boolean) || [],
    pricing: searchParams.get("pricing") || "all",
    sort: searchParams.get("sort") || "trending",
    dateRange: searchParams.get("dateRange") || "all"
  })

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/tags")
      if (response.ok) {
        const data = await response.json()
        setAvailableTags(data.tags)
      }
    } catch (error) {
      console.error("Failed to fetch tags:", error)
    }
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    
    if (filters.query.trim()) {
      params.set("q", filters.query.trim())
    }
    
    if (filters.tags.length > 0) {
      params.set("tags", filters.tags.join(","))
    }
    
    if (filters.pricing && filters.pricing !== "all") {
      params.set("pricing", filters.pricing)
    }
    
    if (filters.sort && filters.sort !== "trending") {
      params.set("sort", filters.sort)
    }
    
    if (filters.dateRange && filters.dateRange !== "all") {
      params.set("dateRange", filters.dateRange)
    }

    const queryString = params.toString()
    const url = queryString ? `/dashboard?${queryString}` : "/dashboard"
    router.push(url)
    setIsFilterOpen(false)
  }

  const clearFilters = () => {
    setFilters({
      query: "",
      tags: [],
      pricing: "all",
      sort: "trending",
      dateRange: "all"
    })
    router.push("/dashboard")
    setIsFilterOpen(false)
  }

  const removeTag = (tagToRemove: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addTag = (tagToAdd: string) => {
    if (!filters.tags.includes(tagToAdd)) {
      setFilters(prev => ({
        ...prev,
        tags: [...prev.tags, tagToAdd]
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilters()
  }

  const activeFiltersCount = [
    filters.query,
    filters.tags.length > 0 ? "tags" : "",
    filters.pricing && filters.pricing !== "all" ? "pricing" : "",
    filters.dateRange && filters.dateRange !== "all" ? "dateRange" : ""
  ].filter(Boolean).length

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search developer tools..."
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            className="pl-10"
          />
        </div>
        
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              </div>
              
              <Separator />
              
              {/* Tags Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <Select onValueChange={addTag}>
                  <SelectTrigger>
                    <SelectValue placeholder="Add tags..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTags
                      .filter(tag => !filters.tags.includes(tag.name))
                      .map(tag => (
                        <SelectItem key={tag.id} value={tag.name}>
                          {tag.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                
                {filters.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {filters.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}             </div>
              
              {/* Pricing Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Pricing</label>
                <Select value={filters.pricing} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, pricing: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="All pricing models" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All pricing models</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="freemium">Freemium</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="open_source">Open Source</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Sort Order */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort by</label>
                <Select value={filters.sort} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, sort: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="most_voted">Most Voted</SelectItem>
                    <SelectItem value="alphabetical">A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select value={filters.dateRange} onValueChange={(value) => 
                  setFilters(prev => ({ ...prev, dateRange: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              {/* Apply Button */}
              <Button onClick={applyFilters} className="w-full">
                Apply Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button type="submit">
          <Search className="h-4 w-4" />
        </Button>
      </form>
      
      {/* Active Filters Display */}
      {(filters.query || filters.tags.length > 0 || (filters.pricing && filters.pricing !== "all") || (filters.dateRange && filters.dateRange !== "all")) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters.query && (
            <Badge variant="outline">
              Search: {filters.query}
              <button
                onClick={() => setFilters(prev => ({ ...prev, query: "" }))}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.tags.map(tag => (
            <Badge key={tag} variant="outline">
              Tag: {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {filters.pricing && filters.pricing !== "all" && (
            <Badge variant="outline">
              Pricing: {filters.pricing}
              <button
                onClick={() => setFilters(prev => ({ ...prev, pricing: "all" }))}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.dateRange && filters.dateRange !== "all" && (
            <Badge variant="outline">
              Date: {filters.dateRange}
              <button
                onClick={() => setFilters(prev => ({ ...prev, dateRange: "all" }))}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}

export default AdvancedSearch