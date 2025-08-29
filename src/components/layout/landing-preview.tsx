"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

interface Product {
  id: string
  name: string
  tagline: string
  description: string
  website_url: string
  thumbnail_url?: string
  created_at: string
  submitter_name: string
  submitter_username: string
  submitter_avatar?: string
  vote_count: number
  tags: Array<{ id: number; name: string }>
  trending_indicators?: {
    recent_votes_24h: number
    recent_votes_7d: number
    comment_count: number
    recent_comments_24h: number
    trending_score: number
  }
}

export function LandingPreview() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchPreviewProducts()
  }, [])

  const fetchPreviewProducts = async () => {
    try {
      setIsLoading(true)
      // Fetch only trending products, limited to 3 for preview
      const response = await fetch("/api/products?sort=trending&limit=3")

      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()
      setProducts(data.products.slice(0, 3)) // Ensure max 3 products
    } catch (error) {
      console.error("Failed to fetch preview products:", error)
      setError("Failed to load trending tools preview.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard
              product={product}
              // Disable voting for non-authenticated users
              onVote={undefined}
              isVoted={false}
              isVoting={false}
              currentVoteCount={product.vote_count}
            />
            {/* Overlay for non-authenticated users */}
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <div className="text-center space-y-3">
                <p className="text-sm font-medium">Join DevHunt to interact</p>
                <Button asChild size="sm">
                  <Link href="/register">Sign Up Now</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LandingPreview