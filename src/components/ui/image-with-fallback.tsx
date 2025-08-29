"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Camera } from 'lucide-react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  fallbackClassName?: string
}

export function ImageWithFallback({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  fallbackClassName = "bg-muted flex items-center justify-center",
  ...props
}: ImageWithFallbackProps & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "fill" | "width" | "height" | "className">) {
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (error) {
    return (
      <div 
        className={`${fallbackClassName} ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      >
        <Camera className="h-8 w-8 text-muted-foreground/50" />
      </div>
    )
  }

  if (!mounted) {
    // SSR placeholder to preserve layout and avoid hydration diffs from extensions mutating <img>
    return (
      <div
        suppressHydrationWarning
        className={className}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  )
}

export default ImageWithFallback