"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { CommentForm } from "./comment-form"

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

interface CommentItemProps {
  comment: Comment
  productId: string
  onCommentAdded?: () => void
  depth?: number
}

export function CommentItem({ comment, productId, onCommentAdded, depth = 0 }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)

  const handleReplyAdded = () => {
    setShowReplyForm(false)
    onCommentAdded?.()
  }

  const maxDepth = 3 // Limit nesting depth to prevent UI issues

  return (
    <div className={`${depth > 0 ? "ml-6 pl-4 border-l-2 border-muted" : ""}`}>
      <div className="flex gap-3">
        <Link href={`/user/${comment.username}`}>
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={comment.avatar_url || "/placeholder.svg"} alt={comment.user_name} />
            <AvatarFallback className="text-xs">
              {comment.user_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Link href={`/user/${comment.username}`} className="font-medium text-sm hover:underline">
              {comment.user_name}
            </Link>
            <span className="text-xs text-muted-foreground">@{comment.username}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
            </span>
          </div>

          <div className="text-sm leading-relaxed mb-3">{comment.content}</div>

          <div className="flex items-center gap-2">
            {depth < maxDepth && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="h-7 px-2 text-xs"
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}

            {comment.replies.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="h-7 px-2 text-xs">
                {isExpanded ? "Hide" : "Show"} {comment.replies.length}{" "}
                {comment.replies.length === 1 ? "reply" : "replies"}
              </Button>
            )}
          </div>

          {showReplyForm && (
            <div className="mt-4">
              <CommentForm
                productId={productId}
                parentCommentId={comment.id}
                onCommentAdded={handleReplyAdded}
                onCancel={() => setShowReplyForm(false)}
                placeholder={`Reply to ${comment.user_name}...`}
                buttonText="Post Reply"
              />
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {isExpanded && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              productId={productId}
              onCommentAdded={onCommentAdded}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
