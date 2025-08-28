"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Save } from "lucide-react"
import type { User } from "@/lib/auth"

interface ProfileSettingsFormProps {
  user: User
}

export function ProfileSettingsForm({ user }: ProfileSettingsFormProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio || "",
    avatar_url: user.avatar_url || "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to update profile")
        return
      }

      setSuccess("Profile updated successfully!")

      // If username changed, redirect to new profile URL
      if (formData.username !== user.username) {
        setTimeout(() => {
          router.push(`/user/${formData.username}`)
          router.refresh()
        }, 1500)
      }
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
        <CardDescription>Update your profile information and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Avatar Preview */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={formData.avatar_url || "/placeholder.svg"} alt={formData.name} />
              <AvatarFallback className="text-lg">
                {formData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">Enter an image URL below to update your avatar</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              Your username will be part of your profile URL: devhunt.com/user/{formData.username}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar_url">Avatar URL</Label>
            <Input
              id="avatar_url"
              name="avatar_url"
              type="url"
              placeholder="https://example.com/avatar.jpg (optional)"
              value={formData.avatar_url}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself... (optional)"
              value={formData.bio}
              onChange={handleChange}
              disabled={isLoading}
              rows={4}
            />
            <p className="text-sm text-muted-foreground">Maximum 500 characters</p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
