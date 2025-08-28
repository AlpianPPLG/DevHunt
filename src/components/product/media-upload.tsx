"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, Loader2, Plus } from "lucide-react"
import { toast } from "sonner"

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
      
      setIsOpen(false)
      onUploadSuccess?.()

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to upload media"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  const getPlaceholderText = () => {
    switch (formData.media_type) {
      case "video":
        return "https://example.com/video.mp4"
      case "gif":
        return "https://example.com/animation.gif"
      case "logo":
        return "https://example.com/logo.png"
      default:
        return "https://example.com/image.jpg"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <Plus className="h-4 w-4 mr-2" />
          Add Media
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Product Media</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Media Type */}
          <div className="space-y-2">
            <Label>Media Type</Label>
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
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="gif">GIF</SelectItem>
                <SelectItem value="logo">Logo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Media URL */}
          <div className="space-y-2">
            <Label>Media URL *</Label>
            <Input
              type="url"
              placeholder={getPlaceholderText()}
              value={formData.media_url}
              onChange={(e) => handleInputChange("media_url", e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Direct link to your media file (hosted on CDN, cloud storage, etc.)
            </p>
          </div>

          {/* Thumbnail URL (for videos) */}
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
              placeholder="0"
              value={formData.display_order}
              onChange={(e) => handleInputChange("display_order", parseInt(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first (0 = first)
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUploading}
              className="flex-1"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default MediaUpload