"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import type { User } from "@/lib/auth"

export function HeroSection() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error("Failed to fetch user:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // If user is logged in, show different CTA
  const renderCTA = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="h-11 w-32 bg-muted animate-pulse rounded-md" />
          <div className="h-11 w-32 bg-muted animate-pulse rounded-md" />
        </div>
      )
    }

    if (user) {
      return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="min-w-[140px]">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[140px] bg-transparent">
            <Link href="/submit">Submit a Tool</Link>
          </Button>
        </div>
      )
    }

    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild size="lg" className="min-w-[140px]">
          <Link href="/register">Join DevHunt</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="min-w-[140px] bg-transparent">
          <Link href="/submit">Submit a Tool</Link>
        </Button>
      </div>
    )
  }
  return (
    <section className="py-12 md:py-20">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-balance">
            Discover the Best
            <span className="text-primary"> Developer Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            DevHunt is where developers discover, share, and vote for the latest tools, libraries, and projects that
            make coding better.
          </p>
        </div>

        {renderCTA()}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t">
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Discover Tools</h3>
            <p className="text-sm text-muted-foreground text-center">Find the perfect tools for your next project</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Vote & Rank</h3>
            <p className="text-sm text-muted-foreground text-center">Help the community find the best tools</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Share & Discuss</h3>
            <p className="text-sm text-muted-foreground text-center">Connect with fellow developers</p>
          </div>
        </div>
      </div>
    </section>
  )
}
