"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserPlus, UserMinus, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface FollowButtonProps {
  username: string
  isFollowing: boolean
  isOwnProfile: boolean
  className?: string
}

export function FollowButton({ 
  username, 
  isFollowing: initialIsFollowing, 
  isOwnProfile,
  className 
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [isLoading, setIsLoading] = useState(false)

  if (isOwnProfile) {
    return null
  }

  const handleFollow = async () => {
    setIsLoading(true)
    
    try {
      const method = isFollowing ? "DELETE" : "POST"
      const response = await fetch(`/api/users/${username}/follow`, {
        method
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update follow status")
      }

      setIsFollowing(!isFollowing)
      toast.success(data.message)
      
      // Refresh the page to update follower counts
      window.location.reload()

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong"
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleFollow}
      disabled={isLoading}
      variant={isFollowing ? "outline" : "default"}
      className={className}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : isFollowing ? (
        <UserMinus className="h-4 w-4 mr-2" />
      ) : (
        <UserPlus className="h-4 w-4 mr-2" />
      )}
      {isLoading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}

export default FollowButton