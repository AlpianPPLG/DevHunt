"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Loader2, Plus, X, Check, ChevronsUpDown } from "lucide-react"

interface Tag {
  id: number
  name: string
  description?: string
}

export function SubmitForm() {
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    website_url: "",
    thumbnail_url: "",
    github_url: "",
    demo_url: "",
  })
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [newTag, setNewTag] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isTagsOpen, setIsTagsOpen] = useState(false)
  const router = useRouter()

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleTagSelect = (tagName: string) => {
    if (!selectedTags.includes(tagName) && selectedTags.length < 5) {
      setSelectedTags((prev) => [...prev, tagName])
    }
    setIsTagsOpen(false)
  }

  const handleTagRemove = (tagName: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagName))
  }

  const handleAddNewTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim()) && selectedTags.length < 5) {
      setSelectedTags((prev) => [...prev, newTag.trim()])
      setNewTag("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/products/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: selectedTags,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Submission failed")
        return
      }

      router.push(`/product/${data.productId}`)
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Submit a Developer Tool</CardTitle>
        <CardDescription>Share an amazing tool, library, or project with the developer community</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., React Hook Form"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline *</Label>
            <Input
              id="tagline"
              name="tagline"
              placeholder="e.g., Performant, flexible forms with easy validation"
              value={formData.tagline}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">A short, compelling description (10-255 characters)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide a detailed description of what this tool does, its key features, and why developers should use it..."
              value={formData.description}
              onChange={handleChange}
              required
              disabled={isLoading}
              rows={4}
            />
            <p className="text-sm text-muted-foreground">Detailed explanation (minimum 20 characters)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url">Website URL *</Label>
            <Input
              id="website_url"
              name="website_url"
              type="url"
              placeholder="https://react-hook-form.com"
              value={formData.website_url}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github_url">GitHub URL</Label>
            <Input
              id="github_url"
              name="github_url"
              type="url"
              placeholder="https://github.com/username/repository (optional)"
              value={formData.github_url}
              onChange={handleChange}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">Optional: Link to the GitHub repository</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo_url">Demo URL</Label>
            <Input
              id="demo_url"
              name="demo_url"
              type="url"
              placeholder="https://demo.example.com (optional)"
              value={formData.demo_url}
              onChange={handleChange}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">Optional: Link to a live demo or playground</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail_url">Logo/Thumbnail URL</Label>
            <Input
              id="thumbnail_url"
              name="thumbnail_url"
              type="url"
              placeholder="https://example.com/logo.png (optional)"
              value={formData.thumbnail_url}
              onChange={handleChange}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">Optional: URL to product logo or screenshot</p>
          </div>

          <div className="space-y-2">
            <Label>Tags * (1-5 tags)</Label>
            <div className="space-y-3">
              {/* Selected Tags */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="ml-1 hover:text-destructive"
                        disabled={isLoading}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Tag Selection */}
              {selectedTags.length < 5 && (
                <div className="flex gap-2">
                  <Popover open={isTagsOpen} onOpenChange={setIsTagsOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isTagsOpen}
                        className="justify-between bg-transparent"
                        disabled={isLoading}
                      >
                        Select tags...
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search tags..." />
                        <CommandList>
                          <CommandEmpty>No tags found.</CommandEmpty>
                          <CommandGroup>
                            {availableTags
                              .filter((tag) => !selectedTags.includes(tag.name))
                              .map((tag) => (
                                <CommandItem key={tag.id} onSelect={() => handleTagSelect(tag.name)}>
                                  <Check
                                    className={`mr-2 h-4 w-4 ${
                                      selectedTags.includes(tag.name) ? "opacity-100" : "opacity-0"
                                    }`}
                                  />
                                  {tag.name}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {/* Add New Tag */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="New tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      disabled={isLoading}
                      className="w-32"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddNewTag}
                      disabled={isLoading || !newTag.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Choose existing tags or create new ones (e.g., React, AI, Productivity)
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || selectedTags.length === 0}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Product"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
