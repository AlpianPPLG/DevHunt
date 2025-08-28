"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Collection {
  id: string
  title: string
  description: string
  thumbnail: string
  toolCount: number
  tags: string[]
}

export function FeaturedCollectionsSection() {
  const [collections] = useState<Collection[]>([
    {
      id: "1",
      title: "Full-Stack Development Essentials",
      description: "The most popular tools for modern full-stack development",
      thumbnail: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      toolCount: 12,
      tags: ["Full-Stack", "JavaScript", "React"]
    },
    {
      id: "2",
      title: "DevOps Automation Toolkit",
      description: "Tools to streamline your CI/CD pipeline and infrastructure",
      thumbnail: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      toolCount: 8,
      tags: ["DevOps", "CI/CD", "Cloud"]
    },
    {
      id: "3",
      title: "AI Development Starter Pack",
      description: "Essential tools for building AI-powered applications",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
      toolCount: 10,
      tags: ["AI", "Machine Learning", "Python"]
    }
  ])

  return (
    <section className="py-16 bg-accent/10">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Collections</h2>
            <p className="text-muted-foreground">Curated sets of tools that work great together</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/collections">
              View all collections <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Card key={collection.id} className="overflow-hidden">
              <div className="relative h-40 w-full">
                {collection.thumbnail ? (
                  // Using a div with background image instead of the Image component
                  // to avoid the Next.js image domain configuration issue
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${collection.thumbnail})` }}
                    aria-label={collection.title}
                  />
                ) : (
                  <div className="bg-muted h-full w-full flex items-center justify-center">
                    <Camera className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{collection.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2 mb-4">{collection.description}</p>
                <div className="flex flex-wrap gap-2">
                  {collection.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">{collection.toolCount} tools</p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/collections/${collection.id}`}>View collection</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollectionsSection;