"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface VoteButtonProps {
  productId: string
  initialVoteCount: number
  className?: string
}

export function VoteButton({ productId, initialVoteCount, className }: VoteButtonProps) {
  const [isVoted, setIsVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(initialVoteCount)
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
        setIsVoted(data.votes.includes(productId))
      }
    } catch (error) {
      console.error("Failed to check vote status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isVoting) return

    setIsVoting(true)

    try {
      const method = isVoted ? "DELETE" : "POST"
      const response = await fetch(`/api/products/${productId}/vote`, {
        method,
      })

      if (response.status === 401) {
        router.push("/login")
        return
      }

      if (!response.ok) {
        throw new Error("Failed to vote")
      }

      const data = await response.json()
      setIsVoted(data.isVoted)
      setVoteCount(data.voteCount)
    } catch (error) {
      console.error("Vote error:", error)
    } finally {
      setIsVoting(false)
    }
  }

  if (isLoading) {
    return (
      <Button
        variant="outline"
        size="sm"
        className={`h-12 w-12 rounded-lg flex flex-col gap-1 p-0 ${className}`}
        disabled
      >
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    )
  }

  return (
    <Button
      variant={isVoted ? "default" : "outline"}
      size="sm"
      className={`h-12 w-12 rounded-lg flex flex-col gap-1 p-0 transition-all duration-200 ${
        isVoted ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
      } ${className}`}
      onClick={handleVote}
      disabled={isVoting}
    >
      {isVoting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <ChevronUp className="h-4 w-4" />
          <span className="text-xs font-medium">{voteCount}</span>
        </>
      )}
    </Button>
  )
}
