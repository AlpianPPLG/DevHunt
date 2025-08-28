import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { VoteButton } from "@/components/product/vote-button"
import { CommentsSection } from "@/components/comments/comments-section"
import { queryRow, queryRows } from "@/lib/database"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink, Calendar, Github, Play } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  
  const product = await queryRow(
    `SELECT 
      p.id, p.name, p.tagline, p.description, p.website_url, 
      p.thumbnail_url, p.github_url, p.demo_url, p.created_at,
      u.name as submitter_name, u.username as submitter_username
     FROM products p
     JOIN users u ON p.submitter_id = u.id
     WHERE p.id = ?`,
    [id],
  )

  if (!product) {
    notFound()
  }

  const tags = await queryRows(
    `SELECT t.name 
     FROM tags t
     JOIN product_tags pt ON t.id = pt.tag_id
     WHERE pt.product_id = ?
     ORDER BY t.name`,
    [id],
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-6">
            {/* Product Thumbnail */}
            <div className="w-24 h-24 rounded-xl bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
              {product.thumbnail_url ? (
                <img
                  src={product.thumbnail_url.startsWith('/') || product.thumbnail_url.startsWith('data:') 
                    ? product.thumbnail_url 
                    : `/api/images/proxy?url=${encodeURIComponent(product.thumbnail_url)}`
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-primary font-bold text-2xl">{product.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl font-bold text-balance">{product.name}</h1>
                  <p className="text-xl text-muted-foreground mt-2 text-balance">{product.tagline}</p>
                </div>

                <div className="flex items-center gap-3">
                  <VoteButton productId={product.id} initialVoteCount={product.vote_count} />

                  <Button asChild>
                    <Link href={product.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Site
                    </Link>
                  </Button>

                  {/* TODO: Enable when database schema is confirmed
                  {product.github_url && (
                    <Button variant="outline" asChild>
                      <Link href={product.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </Link>
                    </Button>
                  )}

                  {product.demo_url && (
                    <Button variant="outline" asChild>
                      <Link href={product.demo_url} target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4 mr-2" />
                        Demo
                      </Link>
                    </Button>
                  )}
                  */}
                </div>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.map((tag: any) => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-3">About</h2>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Submitter Info */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t">
                <Link
                  href={`/user/${product.submitter_username}`}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={product.submitter_avatar || "/placeholder.svg"} alt={product.submitter_name} />
                    <AvatarFallback>
                      {product.submitter_name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{product.submitter_name}</div>
                    <div className="text-sm text-muted-foreground">@{product.submitter_username}</div>
                  </div>
                </Link>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Submitted {formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <CommentsSection productId={product.id} />
          </div>
        </div>
      </main>
    </div>
  )
}
