"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Send } from "lucide-react"

interface CommentFormProps {
  productId: string
  parentCommentId?: string
  onCommentAdded?: () => void
  onCancel?: () => void
  placeholder?: string
  buttonText?: string
}

export function CommentForm({
  productId,
  parentCommentId,
  onCommentAdded,
  onCancel,
  placeholder = "Share your thoughts...",
  buttonText = "Post Comment",
}: CommentFormProps) {
  const [content, setContent] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setError("")
    setIsLoading(true)

    try {
      const response = await fetch(`/api/products/${productId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          parent_comment_id: parentCommentId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to post comment")
        return
      }

      setContent("")
      onCommentAdded?.()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Textarea
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isLoading}
        rows={3}
        className="resize-none"
      />

      <div className="flex items-center gap-2">
        <Button type="submit" disabled={isLoading || !content.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {buttonText}
            </>
          )}
        </Button>

        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
