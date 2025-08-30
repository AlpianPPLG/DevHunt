"use client"

import Link from "next/link"
import { ChevronLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface DocPageProps {
  title: string
  description?: string
  children: React.ReactNode
  backHref?: string
  backLabel?: string
}

export function DocPage({
  title,
  description,
  children,
  backHref = "/docs",
  backLabel = "Back to Documentation",
}: DocPageProps) {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="h-8 px-2">
          <Link href={backHref}>
            <ChevronLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button variant="ghost" size="sm" asChild className="h-8 px-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  )
}