"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Lock, Users, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Collection {
  id: string
  name: string
  description?: string
  slug: string
  is_public: boolean
  is_featured: boolean
  view_count: number
  created_at: string
  updated_at: string
  creator_name: string
  creator_username: string
  creator_avatar?: string
  product_count: number
}

interface CollectionCardProps {
  collection: Collection
  showCreator?: boolean
  className?: string
}

export function CollectionCard({ 
  collection, 
  showCreator = true,
  className 
}: CollectionCardProps) {
  return (
    <Card className={`group hover:shadow-md transition-shadow duration-200 ${className}`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Link 
                  href={`/collections/${collection.slug}`}
                  className="group-hover:text-primary transition-colors"
                >
                  <h3 className="font-semibold text-lg truncate">
                    {collection.name}
                  </h3>
                </Link>
                
                {collection.is_featured && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    Featured
                  </Badge>
                )}
                
                {!collection.is_public && (
                  <Badge variant="outline" className="text-muted-foreground">
                    <Lock className="h-3 w-3 mr-1" />
                    Private
                  </Badge>
                )}
              </div>
              
              {collection.description && (
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {collection.description}
                </p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{collection.product_count} tools</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{collection.view_count} views</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Updated {formatDistanceToNow(new Date(collection.updated_at), { addSuffix: true })}</span>
            </div>
          </div>

          {/* Creator Info */}
          {showCreator && (
            <div className="flex items-center justify-between pt-3 border-t">
              <Link
                href={`/user/${collection.creator_username}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage 
                    src={collection.creator_avatar || "/placeholder.svg"} 
                    alt={collection.creator_name} 
                  />
                  <AvatarFallback className="text-xs">
                    {collection.creator_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>by @{collection.creator_username}</span>
              </Link>

              <Button asChild variant="ghost" size="sm">
                <Link href={`/collections/${collection.slug}`}>
                  View Collection
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CollectionCard