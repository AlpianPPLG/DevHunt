"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Image as ImageIcon, Video, FileVideo, FileImage, Info } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { getUrlHelpMessage, isDirectImageUrl, extractDomain } from "@/lib/utils"

interface MediaUploadProps {
  productId: string
  onUploadSuccess?: () => void
  className?: string
}

interface UploadData {
  media_type: "image" | "video" | "gif" | "logo"
  media_url: string
  thumbnail_url?: string
  caption?: string
  alt_text?: string
  display_order: number
}

export function MediaUpload({ 
  productId, 
  onUploadSuccess,
  className 
}: MediaUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [urlHelpMessage, setUrlHelpMessage] = useState<string>("")
  const [formData, setFormData] = useState<UploadData>({
    media_type: "image",
    media_url: "",
    thumbnail_url: "",
    caption: "",
    alt_text: "",
    display_order: 0
  })

  const handleInputChange = (field: keyof UploadData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleUrlChange = (field: "media_url" | "thumbnail_url", value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Generate preview and help message for media URL
    if (field === "media_url" && value) {
      try {
        new URL(value)
        setPreviewUrl(value)
        setUrlHelpMessage(getUrlHelpMessage(value))
      } catch {
        setPreviewUrl(null)
        setUrlHelpMessage("❌ Invalid URL format. Please enter a valid URL.")
      }
    } else if (field === "media_url") {
      setPreviewUrl(null)
      setUrlHelpMessage("")
    }
  }

  // Check if this is a Pinterest page URL that needs conversion
  const isPinterestPageUrl = formData.media_url && (
    formData.media_url.includes('pin.it/') || 
    (formData.media_url.includes('pinterest.com') && !formData.media_url.includes('i.pinimg.com'))
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsUploading(true)

    try {
      // Basic validation
      if (!formData.media_url.trim()) {
        throw new Error("Media URL is required")
      }

      // Validate URL format
      try {
        new URL(formData.media_url)
      } catch {
        throw new Error("Please enter a valid URL")
      }

      // For videos, require thumbnail URL
      if (formData.media_type === "video" && !formData.thumbnail_url?.trim()) {
        throw new Error("Thumbnail URL is required for videos")
      }

      const payload = {
        ...formData,
        display_order: Number(formData.display_order)
      }

      const response = await fetch(`/api/products/${productId}/media`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload media")
      }

      toast.success("Media uploaded successfully!")
      
      // Reset form
      setFormData({
        media_type: "image",
        media_url: "",
        thumbnail_url: "",
        caption: "",
        alt_text: "",
        display_order: 0
      })
      setPreviewUrl(null)
      setIsOpen(false)
      onUploadSuccess?.()

    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to upload media")
    } finally {
      setIsUploading(false)
    }
  }

  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "gif":
        return <FileImage className="h-4 w-4" />
      case "logo":
        return <FileImage className="h-4 w-4" />
      default:
        return <ImageIcon className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("gap-2", className)}>
          <Plus className="h-4 w-4" />
          Add Media
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Media to Product</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Media Type */}
          <div className="space-y-2">
            <Label>Media Type *</Label>
            <Select
              value={formData.media_type}
              onValueChange={(value: "image" | "video" | "gif" | "logo") => 
                handleInputChange("media_type", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Image
                  </div>
                </SelectItem>
                <SelectItem value="video">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Video
                  </div>
                </SelectItem>
                <SelectItem value="gif">
                  <div className="flex items-center gap-2">
                    <FileImage className="h-4 w-4" />
                    GIF
                  </div>
                </SelectItem>
                <SelectItem value="logo">
                  <div className="flex items-center gap-2">
                    <FileImage className="h-4 w-4" />
                    Logo
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Media URL */}
          <div className="space-y-2">
            <Label>Media URL *</Label>
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.media_url}
              onChange={(e) => handleUrlChange("media_url", e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Direct link to the media file (supports Pinterest, Imgur, etc.)
            </p>
            
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
                    <li>Go to the Pinterest page: <a href={formData.media_url} target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-800">{formData.media_url}</a></li>
                    <li>Right-click on the image you want to use</li>
                    <li>Select "Copy image address" or "Copy image URL"</li>
                    <li>Paste the copied URL here</li>
                  </ol>
                </div>
                <div className="mt-2 p-2 bg-yellow-100 rounded text-xs">
                  <strong>Example:</strong> Instead of <code className="bg-yellow-200 px-1 rounded">{formData.media_url}</code>, 
                  use <code className="bg-yellow-200 px-1 rounded">https://i.pinimg.com/originals/actual-image.jpg</code>
                </div>
              </div>
            )}
            
            {/* URL Help Message */}
            {urlHelpMessage && !isPinterestPageUrl && (
              <div className={cn(
                "p-3 rounded-md text-sm border",
                urlHelpMessage.includes("✅") 
                  ? "bg-green-50 border-green-200 text-green-800" 
                  : urlHelpMessage.includes("⚠️") 
                  ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                  : "bg-red-50 border-red-200 text-red-800"
              )}>
                {urlHelpMessage}
                
                {/* Pinterest specific help */}
                {urlHelpMessage.includes("Pinterest") && (
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
          </div>

          {/* Image Preview */}
          {previewUrl && formData.media_type === "image" && !isPinterestPageUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                <img
                  src={previewUrl.startsWith('/') || previewUrl.startsWith('data:') 
                    ? previewUrl 
                    : `/api/images/proxy?url=${encodeURIComponent(previewUrl)}`
                  }
                  alt="Preview"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Source: {extractDomain(previewUrl)}
              </p>
            </div>
          )}

          {/* Thumbnail URL for videos */}
          {formData.media_type === "video" && (
            <div className="space-y-2">
              <Label>Thumbnail URL *</Label>
              <Input
                type="url"
                placeholder="https://example.com/thumbnail.jpg"
                value={formData.thumbnail_url}
                onChange={(e) => handleInputChange("thumbnail_url", e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Preview image for the video
              </p>
            </div>
          )}

          {/* Caption */}
          <div className="space-y-2">
            <Label>Caption (optional)</Label>
            <Textarea
              placeholder="Describe what this media shows..."
              value={formData.caption}
              onChange={(e) => handleInputChange("caption", e.target.value)}
              rows={2}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {formData.caption?.length || 0}/500 characters
            </p>
          </div>

          {/* Alt Text */}
          <div className="space-y-2">
            <Label>Alt Text (optional)</Label>
            <Input
              placeholder="Alternative text for accessibility"
              value={formData.alt_text}
              onChange={(e) => handleInputChange("alt_text", e.target.value)}
              maxLength={255}
            />
            <p className="text-xs text-muted-foreground">
              Helps with accessibility and SEO
            </p>
          </div>

          {/* Display Order */}
          <div className="space-y-2">
            <Label>Display Order</Label>
            <Input
              type="number"
              min="0"
              value={formData.display_order}
              onChange={(e) => handleInputChange("display_order", parseInt(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first (0 = first)
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isUploading}
              className="flex-1"
            >
              {isUploading ? "Uploading..." : "Upload Media"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}