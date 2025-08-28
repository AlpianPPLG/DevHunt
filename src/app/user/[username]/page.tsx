import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { ProductCard } from "@/components/product/product-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Package, MessageCircle, TrendingUp } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface UserPageProps {
  params: Promise<{ username: string }>
}

async function fetchUserProfile(username: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${username}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error("Failed to fetch user profile:", error)
    return null
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params
  const data = await fetchUserProfile(username)

  if (!data) {
    notFound()
  }

  const { user, products, comments, stats } = data

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* User Header */}
          <div className="flex items-start gap-6 mb-8">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-2xl">
                {user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-xl text-muted-foreground">@{user.username}</p>

              {user.bio && <p className="text-muted-foreground mt-3 leading-relaxed">{user.bio}</p>}

              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-4">
                <Calendar className="h-4 w-4" />
                <span>Joined {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="flex items-center gap-3 p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.productsCount}</div>
                  <div className="text-sm text-muted-foreground">Products Submitted</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3 p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.totalVotesReceived}</div>
                  <div className="text-sm text-muted-foreground">Total Votes Received</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-3 p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.commentsCount}</div>
                  <div className="text-sm text-muted-foreground">Comments Made</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="products">Submitted Products ({stats.productsCount})</TabsTrigger>
              <TabsTrigger value="comments">Recent Comments ({stats.commentsCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4 mt-6">
              {products.length > 0 ? (
                products.map((product: any) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      submitter_name: user.name,
                      submitter_username: user.username,
                      submitter_avatar: user.avatar_url,
                      tags: [], // Tags will be loaded separately if needed
                    }}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">No products submitted yet</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {user.username} hasn't submitted any products to DevHunt yet.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="comments" className="space-y-4 mt-6">
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment: any) => (
                    <Card key={comment.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-relaxed">{comment.content}</p>
                            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                              <span>on</span>
                              <Link
                                href={`/product/${comment.product_id}`}
                                className="font-medium hover:text-foreground transition-colors"
                              >
                                {comment.product_name}
                              </Link>
                              <span>•</span>
                              <span>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground">No comments yet</h3>
                  <p className="text-sm text-muted-foreground mt-2">{user.username} hasn't made any comments yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
