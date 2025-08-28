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
import { Loader2, Plus, X, Check, ChevronsUpDown, Info } from "lucide-react"
import { getUrlHelpMessage, isDirectImageUrl, extractDomain } from "@/lib/utils"
import { cn } from "@/lib/utils"

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
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [thumbnailHelpMessage, setThumbnailHelpMessage] = useState<string>("")
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
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Generate thumbnail preview and help message
    if (name === "thumbnail_url" && value) {
      try {
        new URL(value)
        setThumbnailPreview(value)
        setThumbnailHelpMessage(getUrlHelpMessage(value))
      } catch {
        setThumbnailPreview(null)
        setThumbnailHelpMessage("❌ Invalid URL format. Please enter a valid URL.")
      }
    } else if (name === "thumbnail_url") {
      setThumbnailPreview(null)
      setThumbnailHelpMessage("")
    }
  }

  // Check if this is a Pinterest page URL that needs conversion
  const isPinterestPageUrl = formData.thumbnail_url && (
    formData.thumbnail_url.includes('pin.it/') || 
    (formData.thumbnail_url.includes('pinterest.com') && !formData.thumbnail_url.includes('i.pinimg.com'))
  )

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
            
            {/* Pinterest Warning for Page URLs */}
            {isPinterestPageUrl && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">⚠️ Pinterest Page URL Detected</span>
                </div>
                <p className="text-sm text-yellow-700 mb-2">
                  You've entered a Pinterest page link, but we need the direct image URL.
                </p>
                <div className="text-xs text-yellow-600">
                  <strong>How to get the direct image URL:</strong>
                  <ol className="list-decimal list-inside mt-1 space-y-1">
                    <li>Go to the Pinterest page: <a href={formData.thumbnail_url} target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-800">{formData.thumbnail_url}</a></li>
                    <li>Right-click on the image you want to use</li>
                    <li>Select "Copy image address" or "Copy image URL"</li>
                    <li>Paste the copied URL here</li>
                  </ol>
                </div>
                <div className="mt-2 p-2 bg-yellow-100 rounded text-xs">
                  <strong>Example:</strong> Instead of <code className="bg-yellow-200 px-1 rounded">{formData.thumbnail_url}</code>, 
                  use <code className="bg-yellow-200 px-1 rounded">https://i.pinimg.com/originals/actual-image.jpg</code>
                </div>
              </div>
            )}
            
            {/* URL Help Message */}
            {thumbnailHelpMessage && !isPinterestPageUrl && (
              <div className={cn(
                "p-3 rounded-md text-sm border",
                thumbnailHelpMessage.includes("✅") 
                  ? "bg-green-50 border-green-200 text-green-800" 
                  : thumbnailHelpMessage.includes("⚠️") 
                  ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                  : "bg-red-50 border-red-200 text-red-800"
              )}>
                {thumbnailHelpMessage}
                
                {/* Pinterest specific help */}
                {thumbnailHelpMessage.includes("Pinterest") && (
                  <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                    <p className="font-medium">How to get direct Pinterest image URL:</p>
                    <ol className="list-decimal list-inside mt-1 space-y-1">
                      <li>Go to the Pinterest pin page</li>
                      <li>Right-click on the image</li>
                      <li>Select "Copy image address" or "Copy image URL"</li>
                      <li>Paste the copied URL here</li>
                    </ol>
                    <p className="mt-2 text-blue-700">
                      <strong>Example:</strong> Instead of <code>https://pin.it/3FjHo9YqN</code>, 
                      use <code>https://i.pinimg.com/originals/actual-image.jpg</code>
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Thumbnail Preview */}
            {thumbnailPreview && !isPinterestPageUrl && (
              <div className="mt-3">
                <Label className="text-sm font-medium">Preview:</Label>
                <div className="mt-2 w-24 h-24 border rounded-lg overflow-hidden">
                  <img
                    src={thumbnailPreview.startsWith('/') || thumbnailPreview.startsWith('data:') 
                      ? thumbnailPreview 
                      : `/api/images/proxy?url=${encodeURIComponent(thumbnailPreview)}`
                    }
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Source: {extractDomain(thumbnailPreview)}
                </p>
              </div>
            )}
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
