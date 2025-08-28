"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, X, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface MediaItem {
  id: string
  media_type: "image" | "video" | "gif" | "logo"
  media_url: string
  thumbnail_url?: string
  caption?: string
  alt_text?: string
  display_order: number
  file_size?: number
  mime_type?: string
  created_at: string
}

interface MediaGalleryProps {
  productId: string
  className?: string
  showControls?: boolean
  maxHeight?: string
}

export function MediaGallery({ 
  productId, 
  className,
  showControls = true,
  maxHeight = "400px"
}: MediaGalleryProps) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchMedia()
  }, [productId])

  const fetchMedia = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/products/${productId}/media`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch media")
      }

      const data = await response.json()
      setMedia(data.media)
    } catch (error) {
      console.error("Failed to fetch media:", error)
      setError("Failed to load media")
    } finally {
      setIsLoading(false)
    }
  }

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length)
  }

  const prevMedia = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length)
  }

  const getMediaTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "gif":
        return <span className="text-xs font-bold">GIF</span>
      default:
        return null
    }
  }

  const renderMedia = (item: MediaItem, isMain = false) => {
    const mediaClass = cn(
      "w-full object-cover rounded-lg",
      isMain ? `max-h-[${maxHeight}]` : "h-20 w-20"
    )

    if (item.media_type === "video") {
      return (
        <div className="relative">
          <video 
            src={item.media_url}
            poster={item.thumbnail_url}
            className={mediaClass}
            controls={isMain}
            muted
            playsInline
          />
          {!isMain && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
              <Play className="h-6 w-6 text-white" />
            </div>
          )}
        </div>
      )
    }

    return (
      <img
        src={item.media_url}
        alt={item.alt_text || item.caption || "Product media"}
        className={mediaClass}
        loading="lazy"
      />
    )
  }

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className={`bg-muted animate-pulse rounded-lg`} style={{ height: maxHeight }} />
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 w-20 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (error || media.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <div className={`bg-muted rounded-lg flex items-center justify-center`} style={{ height: maxHeight }}>
          <div className="text-center space-y-2">
            <div className="text-4xl">📸</div>
            <p className="text-muted-foreground">
              {error || "No media available"}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const currentMedia = media[currentIndex]

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Media Display */}
      <div className="relative group">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <div className="cursor-pointer relative">
              {renderMedia(currentMedia, true)}
              
              {/* Media Type Badge */}
              {currentMedia.media_type !== "image" && (
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 left-2 bg-black/50 text-white border-0"
                >
                  {getMediaTypeIcon(currentMedia.media_type)}
                  <span className="ml-1 capitalize">{currentMedia.media_type}</span>
                </Badge>
              )}

              {/* Expand Icon */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary" className="bg-black/50 border-0">
                  <ExternalLink className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              {renderMedia(currentMedia, true)}
              {currentMedia.caption && (
                <div className="p-4 bg-background">
                  <p className="text-sm text-muted-foreground">{currentMedia.caption}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Navigation Controls */}
        {showControls && media.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevMedia}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextMedia}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Caption */}
      {currentMedia.caption && (
        <p className="text-sm text-muted-foreground">{currentMedia.caption}</p>
      )}

      {/* Thumbnail Navigation */}
      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {media.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "flex-shrink-0 relative rounded-lg overflow-hidden border-2 transition-all",
                index === currentIndex 
                  ? "border-primary" 
                  : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              {renderMedia(item)}
              
              {/* Media Type Indicator */}
              {item.media_type !== "image" && (
                <div className="absolute bottom-1 right-1">
                  <div className="bg-black/60 rounded px-1 py-0.5 text-white text-xs">
                    {getMediaTypeIcon(item.media_type)}
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Media Count */}
      {media.length > 1 && (
        <div className="text-center">
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} of {media.length}
          </span>
        </div>
      )}
    </div>
  )
}

export default MediaGallery