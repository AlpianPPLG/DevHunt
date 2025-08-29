/* eslint-disable @next/next/no-img-element */
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Generate proxy URL for external images
  const getProxyUrl = (url: string) => {
    if (!url || url.startsWith('/') || url.startsWith('data:')) {
      return url
    }
    return `/api/images/proxy?url=${encodeURIComponent(url)}`
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
            src={getProxyUrl(item.media_url)}
            poster={item.thumbnail_url ? getProxyUrl(item.thumbnail_url) : undefined}
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
      <div className="relative">
        <img
          src={getProxyUrl(item.media_url)}
          alt={item.alt_text || item.caption || "Product media"}
          className={mediaClass}
          loading="lazy"
          crossOrigin="anonymous"
        />
        {/* Show external link indicator for external images */}
        {!item.media_url.startsWith('/') && !item.media_url.startsWith('data:') && (
          <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
            <ExternalLink className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
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
      <div className="relative">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              {renderMedia(currentMedia, true)}
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="relative">
              {renderMedia(currentMedia, true)}
              <div className="absolute top-4 right-4">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-black/50 text-white hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Media Type Badge */}
        {currentMedia.media_type !== "image" && (
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-black/50 text-white">
              {getMediaTypeIcon(currentMedia.media_type)}
              {currentMedia.media_type.toUpperCase()}
            </Badge>
          </div>
        )}

        {/* Navigation Controls */}
        {showControls && media.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              onClick={prevMedia}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={nextMedia}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {media.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "cursor-pointer transition-all duration-200",
                index === currentIndex ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
              )}
              onClick={() => setCurrentIndex(index)}
            >
              {renderMedia(item, false)}
            </div>
          ))}
        </div>
      )}

      {/* Media Info */}
      {(currentMedia.caption || currentMedia.alt_text) && (
        <div className="text-sm text-muted-foreground">
          {currentMedia.caption && <p className="font-medium">{currentMedia.caption}</p>}
          {currentMedia.alt_text && <p className="text-xs">{currentMedia.alt_text}</p>}
        </div>
      )}
    </div>
  )
}

export default MediaGallery