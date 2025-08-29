"use client"

import type React from "react"
import { useState } from "react"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TagBadge } from "./tag-badge"
import { ThumbnailImage } from "./thumbnail-image"
import { VoteButtons } from "./vote-buttons"
import { ExternalLink, MessageCircle, TrendingUp, Flame } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

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
  upvote_count?: number
  downvote_count?: number
  tags: Array<{ id: number; name: string }>
  trending_indicators?: {
    recent_votes_24h: number
    recent_votes_7d: number
    comment_count: number
    recent_comments_24h: number
    trending_score: number
  }
}

interface ProductCardProps {
  product: Product
  onVote?: (productId: string, isVoted: boolean) => Promise<void>
  isVoted?: boolean
  isVoting?: boolean
  currentVoteCount?: number
  currentUpvoteCount?: number
  currentDownvoteCount?: number
}

export function ProductCard({
  product,
  onVote,
  isVoted = false,
  isVoting = false,
  currentVoteCount,
  currentUpvoteCount,
  currentDownvoteCount,
}: ProductCardProps) {
  const [isVotingLocal, setIsVotingLocal] = useState(false)
  const [localVoteCount, setLocalVoteCount] = useState(currentVoteCount || 0)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleVote = async () => {
    if (isVoting || isVotingLocal) return

    setIsVotingLocal(true)
    try {
      await onVote?.(product.id, !isVoted)
      setLocalVoteCount(prev => isVoted ? prev - 1 : prev + 1)
    } finally {
      setIsVotingLocal(false)
    }
  }

  const isHot = localVoteCount >= 100
  const isTrending = localVoteCount >= 50

  // Calculate or use provided upvote and downvote counts
  const upvoteCount = currentUpvoteCount !== undefined
    ? currentUpvoteCount
    : product.upvote_count !== undefined
      ? product.upvote_count
      : product.vote_count
      
  const downvoteCount = currentDownvoteCount !== undefined
    ? currentDownvoteCount
    : product.downvote_count || 0

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Vote Buttons */}
          <VoteButtons
            productId={product.id}
            initialUpvoteCount={upvoteCount}
            initialDownvoteCount={downvoteCount}
          />

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              {/* Product Thumbnail */}
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <ThumbnailImage
                  src={product.thumbnail_url}
                  alt={product.name}
                  className="rounded-lg"
                  width={80}
                  height={80}
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Link href={`/product/${product.id}`} className="group">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      {isHot && (
                        <Badge variant="destructive" className="text-xs px-1.5 py-0.5 bg-orange-500 hover:bg-orange-600">
                          <Flame className="h-3 w-3 mr-1" />
                          Hot
                        </Badge>
                      )}
                      {isTrending && !isHot && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-blue-500 text-white hover:bg-blue-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{product.tagline}</p>
                  </div>

                  <Button variant="ghost" size="sm" asChild>
                    <Link href={product.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {product.tags.slice(0, 3).map((tag) => (
                      <TagBadge key={tag.id} tag={tag} clickable />
                    ))}
                    {product.tags.length > 3 && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">+{product.tags.length - 3} more</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Submitter Info */}
                <div className="flex items-center justify-between mt-4">
                  <Link
                    href={`/user/${product.submitter_username}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={product.submitter_avatar || "/placeholder.svg"} alt={product.submitter_name} />
                      <AvatarFallback className="text-xs">
                        {product.submitter_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>by @{product.submitter_username}</span>
                  </Link>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Link
                      href={`/product/${product.id}`}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Discuss</span>
                    </Link>
                    <span>{formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
