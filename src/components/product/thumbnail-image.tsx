/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import { Camera, ExternalLink, AlertCircle, RefreshCw, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { getUrlHelpMessage } from "@/lib/utils"

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
  const [proxyUrl, setProxyUrl] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)
  const [urlAnalysis, setUrlAnalysis] = useState<string>("")

  // Generate proxy URL for external images
  useEffect(() => {
    if (src && !src.startsWith('/') && !src.startsWith('data:')) {
      // Use proxy for external URLs (Pinterest, etc.)
      const encodedUrl = encodeURIComponent(src)
      setProxyUrl(`/api/images/proxy?url=${encodedUrl}`)
      
      // Analyze URL and provide guidance
      setUrlAnalysis(getUrlHelpMessage(src))
    } else {
      setProxyUrl(null)
      setUrlAnalysis("")
    }
  }, [src])

  // Reset states when src changes
  useEffect(() => {
    setImageError(false)
    setImageLoaded(false)
    setRetryCount(0)
  }, [src])

  const handleRetry = () => {
    if (isRetrying) return
    
    setIsRetrying(true)
    setImageError(false)
    setRetryCount(prev => prev + 1)
    
    // Small delay before retry
    setTimeout(() => {
      setIsRetrying(false)
    }, 1000)
  }

  const handleImageError = (error: string) => {
    console.error(`Failed to load image: ${error}`)
    setImageError(true)
    
    // Log additional info for debugging
    if (proxyUrl) {
      console.log(`[ThumbnailImage] Proxy URL: ${proxyUrl}`)
      console.log(`[ThumbnailImage] Original URL: ${src}`)
      console.log(`[ThumbnailImage] URL Analysis: ${urlAnalysis}`)
    }
  }

  // Check if this is a Pinterest page URL that needs conversion
  const isPinterestPageUrl = src && (
    src.includes('pin.it/') || 
    (src.includes('pinterest.com') && !src.includes('i.pinimg.com'))
  )

  if (!src || imageError) {
    return (
      <div 
        className={cn(
          "bg-muted flex flex-col items-center justify-center text-muted-foreground relative",
          fallbackClassName,
          className
        )}
        style={{ width, height }}
      >
        {/* Error Icon */}
        <AlertCircle className="h-6 w-6 mb-2 text-destructive" />
        
        {/* Error Message */}
        <div className="text-xs text-center px-2">
          {proxyUrl ? (
            <div className="space-y-2">
              <p className="text-destructive font-medium">Image Failed to Load</p>
              
              {/* Pinterest specific guidance */}
              {isPinterestPageUrl && (
                <div className="bg-blue-50 border border-blue-200 rounded p-2 text-blue-800">
                  <div className="flex items-center gap-1 mb-1">
                    <Info className="h-3 w-3" />
                    <span className="font-medium text-xs">Pinterest URL Detected</span>
                  </div>
                  <p className="text-xs">
                    This is a Pinterest page link, not a direct image URL.
                  </p>
                  <div className="mt-2 text-xs">
                    <strong>How to fix:</strong>
                    <ol className="list-decimal list-inside mt-1 space-y-1">
                      <li>Go to the Pinterest page</li>
                      <li>Right-click on the image</li>
                      <li>Select Copy image address</li>
                      <li>Use that URL instead</li>
                    </ol>
                  </div>
                  <p className="text-xs mt-2">
                    <strong>Example:</strong> Instead of <code className="bg-blue-100 px-1 rounded">https://pin.it/2T0kR4APX</code>, 
                    use <code className="bg-blue-100 px-1 rounded">https://i.pinimg.com/originals/actual-image.jpg</code>
                  </p>
                </div>
              )}
              
              {/* General error message */}
              {!isPinterestPageUrl && (
                <p className="text-xs">External image unavailable</p>
              )}
              
              {/* Retry Button */}
              {retryCount < 3 && (
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="flex items-center gap-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary px-2 py-1 rounded transition-colors"
                >
                  <RefreshCw className={cn("h-3 w-3", isRetrying && "animate-spin")} />
                  {isRetrying ? "Retrying..." : "Retry"}
                </button>
              )}
            </div>
          ) : (
            <p>No image</p>
          )}
        </div>
        
        {/* Fallback Icon */}
        <Camera className="h-4 w-4 absolute bottom-1 right-1 opacity-50" />
      </div>
    )
  }

  // Use proxy URL for external images, direct URL for local images
  const imageSrc = proxyUrl || src

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
      
      {/* Show external link indicator for external images */}
      {proxyUrl && (
        <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1">
          <ExternalLink className="h-3 w-3 text-white" />
        </div>
      )}
      
      {/* Show Pinterest warning for page URLs */}
      {isPinterestPageUrl && (
        <div className="absolute top-1 left-1 bg-yellow-500 rounded-full p-1">
          <Info className="h-3 w-3 text-white" />
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-200",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setImageLoaded(true)}
        onError={() => handleImageError(imageSrc)}
        loading="lazy"
        crossOrigin="anonymous"
      />
    </div>
  )
}

export default ThumbnailImage