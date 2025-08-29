"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "./product-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

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

export function ProductFeed() {
  const [products, setProducts] = useState<Product[]>([])
  const [userVotes, setUserVotes] = useState<string[]>([])
  const [votingStates, setVotingStates] = useState<Record<string, boolean>>({})
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTag = searchParams.get("tag")

  useEffect(() => {
    fetchProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTag, searchParams.get("sort")])

  useEffect(() => {
    fetchUserVotes()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      
      if (activeTag) {
        params.set("tag", activeTag)
      }
      
      const sortParam = searchParams.get("sort")
      if (sortParam) {
        params.set("sort", sortParam)
      }
      
      const url = `/api/products${params.toString() ? `?${params.toString()}` : ""}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()
      setProducts(data.products)

      // Initialize vote counts
      const counts: Record<string, number> = {}
      data.products.forEach((product: Product) => {
        counts[product.id] = product.vote_count
      })
      setVoteCounts(counts)
    } catch (error) {
      console.error("Failed to fetch products:", error)
      setError("Failed to load products. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserVotes = async () => {
    try {
      const response = await fetch("/api/products/votes")
      if (response.ok) {
        const data = await response.json()
        setUserVotes(data.votes)
      }
    } catch (error) {
      console.error("Failed to fetch user votes:", error)
    }
  }

  const handleVote = async (productId: string, isCurrentlyVoted: boolean) => {
    // Set voting state
    setVotingStates((prev) => ({ ...prev, [productId]: true }))

    try {
      const method = isCurrentlyVoted ? "DELETE" : "POST"
      const response = await fetch(`/api/products/${productId}/vote`, {
        method,
      })

      if (response.status === 401) {
        // User not authenticated, redirect to login
        router.push("/login")
        return
      }

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to vote")
      }

      const data = await response.json()

      // Update local state
      setUserVotes((prev) => {
        if (isCurrentlyVoted) {
          return prev.filter((id) => id !== productId)
        } else {
          return [...prev, productId]
        }
      })

      // Update vote count
      setVoteCounts((prev) => ({
        ...prev,
        [productId]: data.voteCount,
      }))
    } catch (error) {
      console.error("Vote error:", error)
      setError("Failed to vote. Please try again.")

      // Clear error after 3 seconds
      setTimeout(() => setError(""), 3000)
    } finally {
      // Clear voting state
      setVotingStates((prev) => ({ ...prev, [productId]: false }))
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
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

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground">
          {activeTag ? `No products found for "${activeTag}"` : "No products found"}
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          {activeTag
            ? "Try selecting a different tag or clear the filter."
            : "Be the first to submit a developer tool!"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onVote={handleVote}
          isVoted={userVotes.includes(product.id)}
          isVoting={votingStates[product.id] || false}
          currentVoteCount={voteCounts[product.id]}
        />
      ))}
    </div>
  )
}
