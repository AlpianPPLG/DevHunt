"use client"

import { useState, useEffect } from "react"
import { CommentForm } from "./comment-form"
import { CommentItem } from "./comment-item"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, MessageCircle } from "lucide-react"

interface Comment {
  id: string
  content: string
  created_at: string
  user_id: string
  user_name: string
  username: string
  avatar_url?: string
  replies: Comment[]
}

interface CommentsSectionProps {
  productId: string
}

export function CommentsSection({ productId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchComments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  const fetchComments = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/products/${productId}/comments`)

      if (!response.ok) {
        throw new Error("Failed to fetch comments")
      }

      const data = await response.json()
      setComments(data.comments)
    } catch (error) {
      console.error("Failed to fetch comments:", error)
      setError("Failed to load comments. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCommentAdded = () => {
    fetchComments() // Refresh comments after new comment/reply
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
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
      {/* Comment Form */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Join the Discussion</h3>
        <CommentForm productId={productId} onCommentAdded={handleCommentAdded} />
      </div>

      {/* Comments List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Comments ({comments.reduce((total, comment) => total + 1 + countReplies(comment), 0)})
        </h3>

        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                productId={productId}
                onCommentAdded={handleCommentAdded}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-muted-foreground">No comments yet</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Be the first to share your thoughts about this product!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to count total replies recursively
function countReplies(comment: Comment): number {
  return comment.replies.reduce((total, reply) => total + 1 + countReplies(reply), 0)
}
