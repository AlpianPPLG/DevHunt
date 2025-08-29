"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface VoteButtonsProps {
  productId: string
  initialUpvoteCount: number
  initialDownvoteCount?: number
  className?: string
}

export function VoteButtons({ 
  productId, 
  initialUpvoteCount, 
  initialDownvoteCount = 0, 
  className 
}: VoteButtonsProps) {
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isDownvoted, setIsDownvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount)
  const [downvoteCount, setDownvoteCount] = useState(initialDownvoteCount)
  const [isVoting, setIsVoting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkVoteStatus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  const checkVoteStatus = async () => {
    try {
      const response = await fetch("/api/products/votes")
      if (response.ok) {
        const data = await response.json()
        // Check for upvotes and downvotes
        setIsUpvoted(data.upvotes.includes(productId))
        setIsDownvoted(data.downvotes.includes(productId))
      }
    } catch (error) {
      console.error("Failed to check vote status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async (voteType: 'upvote' | 'downvote', e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isVoting) return

    setIsVoting(true)

    try {
      // Determine if we're adding or removing a vote
      let method = "POST"
      let currentlyVoted = false
      
      if (voteType === 'upvote' && isUpvoted) {
        method = "DELETE"
        currentlyVoted = true
      } else if (voteType === 'downvote' && isDownvoted) {
        method = "DELETE"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        currentlyVoted = true
      }

      const response = await fetch(`/api/products/${productId}/vote?type=${voteType}`, {
        method,
      })

      if (response.status === 401) {
        router.push("/login")
        return
      }

      if (!response.ok) {
        throw new Error(`Failed to ${voteType}`)
      }

      const data = await response.json()
      
      // Update vote state based on type
      if (voteType === 'upvote') {
        setIsUpvoted(data.isVoted)
        setUpvoteCount(data.upvoteCount)
        
        // If user downvoted before, remove the downvote
        if (isDownvoted && data.isVoted) {
          setIsDownvoted(false)
          setDownvoteCount(data.downvoteCount)
        }
      } else {
        setIsDownvoted(data.isVoted)
        setDownvoteCount(data.downvoteCount)
        
        // If user upvoted before, remove the upvote
        if (isUpvoted && data.isVoted) {
          setIsUpvoted(false)
          setUpvoteCount(data.upvoteCount)
        }
      }
    } catch (error) {
      console.error("Vote error:", error)
    } finally {
      setIsVoting(false)
    }
  }

  if (isLoading) {
    return (
      <div className={`flex flex-col items-center gap-1 ${className}`}>
        <Button
          variant="outline"
          size="sm"
          className="h-12 w-12 rounded-lg flex flex-col gap-1 p-0"
          disabled
        >
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      </div>
    )
  }

  // Calculate net vote count
  const netVotes = upvoteCount - downvoteCount

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      {/* Upvote Button */}
      <Button
        variant={isUpvoted ? "default" : "outline"}
        size="sm"
        className={`h-10 w-10 rounded-lg flex flex-col p-0 transition-all duration-200 ${
          isUpvoted ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
        }`}
        onClick={(e) => handleVote('upvote', e)}
        disabled={isVoting}
      >
        {isVoting && isUpvoted ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ChevronUp className="h-4 w-4" />
        )}
      </Button>

      {/* Vote Count */}
      <span className={`text-sm font-medium ${netVotes < 0 ? 'text-destructive' : ''}`}>
        {netVotes}
      </span>

      {/* Downvote Button */}
      <Button
        variant={isDownvoted ? "destructive" : "outline"}
        size="sm"
        className={`h-10 w-10 rounded-lg flex flex-col p-0 transition-all duration-200 ${
          isDownvoted ? "bg-destructive text-destructive-foreground" : "hover:bg-destructive/10"
        }`}
        onClick={(e) => handleVote('downvote', e)}
        disabled={isVoting}
      >
        {isVoting && isDownvoted ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}