"use client"

import { useState } from "react"
import { Camera } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThumbnailImageProps {
  src?: string
  alt: string
  className?: string
  fallbackClassName?: string
  width?: number
  height?: number
}

export function ThumbnailImage({
  src,
  alt,
  className,
  fallbackClassName,
  width = 80,
  height = 80,
}: ThumbnailImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  if (!src || imageError) {
    return (
      <div 
        className={cn(
          "bg-muted flex items-center justify-center text-muted-foreground",
          fallbackClassName,
          className
        )}
        style={{ width, height }}
      >
        <Camera className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <Camera className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-200",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  )
}

export default ThumbnailImage