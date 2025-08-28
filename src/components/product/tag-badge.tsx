"use client"

import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"

interface TagBadgeProps {
  tag: { id: number; name: string }
  variant?: "default" | "secondary" | "outline"
  clickable?: boolean
}

export function TagBadge({ tag, variant = "secondary", clickable = false }: TagBadgeProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = () => {
    if (!clickable) return

    const params = new URLSearchParams(searchParams.toString())
    params.set("tag", tag.name)
    router.push(`/?${params.toString()}`)
  }

  return (
    <Badge
      variant={variant}
      className={`text-xs ${clickable ? "cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors" : ""}`}
      onClick={clickable ? handleClick : undefined}
    >
      {tag.name}
    </Badge>
  )
}
