import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Tag, ChevronRight, Search, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Blog - DevHunt",
  description: "Stay updated with the latest news, tutorials, and insights from the DevHunt team about developer tools and resources.",
}

interface BlogPost {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  author: {
    name: string
    avatar: string
  }
  date: string
  readTime: string
  slug: string
  featured?: boolean
}

export default function BlogPage() {
  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Introducing DevHunt API: Build Powerful Developer Tool Integrations",
      description: "Today, we're excited to announce the launch of the DevHunt API, enabling developers to integrate our platform's data and features into their applications.",
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Announcements",
      author: {
        name: "Alpian",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
      },
      date: "June 15, 2025",
      readTime: "5 min read",
      slug: "introducing-devhunt-api",
      featured: true
    },
    {
      id: "2",
      title: "10 Must-Have Developer Tools for 2025",
      description: "We've curated a list of the most impactful developer tools that are transforming workflows and boosting productivity in 2025.",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      category: "Tools",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
      },
      date: "June 8, 2025",
      readTime: "8 min read",
      slug: "10-must-have-developer-tools-2025"
    },
    {
      id: "3",
      title: "The Rise of AI-powered Development Tools",
      description: "Explore how artificial intelligence is revolutionizing the development process and making developers more efficient than ever.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "AI",
      author: {
        name: "Miguel Rodriguez",
        avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1534&q=80"
      },
      date: "May 30, 2025",
      readTime: "10 min read",
      slug: "rise-of-ai-powered-development-tools"
    },
    {
      id: "4",
      title: "Building a Developer Community: Lessons Learned",
      description: "Learn from our experience building and nurturing the DevHunt community, with practical tips for fostering engagement.",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Community",
      author: {
        name: "Olivia Martinez",
        avatar: "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
      },
      date: "May 22, 2025",
      readTime: "7 min read",
      slug: "building-developer-community-lessons-learned"
    },
    {
      id: "5",
      title: "From Idea to Launch: The DevHunt Journey",
      description: "The story behind DevHunt's creation, the challenges we faced, and how we built a platform that developers love.",
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Story",
      author: {
        name: "Alpian",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
      },
      date: "May 15, 2025",
      readTime: "12 min read",
      slug: "from-idea-to-launch-devhunt-journey"
    },
    {
      id: "6",
      title: "Database Optimization Techniques for Developer Tools",
      description: "Practical tips and techniques for optimizing database performance in developer tools and platforms.",
      imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80",
      category: "Engineering",
      author: {
        name: "Priya Patel",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
      },
      date: "May 8, 2025",
      readTime: "9 min read",
      slug: "database-optimization-techniques"
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                DevHunt Blog
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Insights, tutorials, and updates from the DevHunt team
              </p>
              <div className="relative w-full max-w-2xl mt-6">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12">
            <div className="container px-4 md:px-6">
              <h2 className="text-2xl font-bold tracking-tight mb-8">Featured Article</h2>
              <div className="rounded-lg overflow-hidden border bg-card">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-video md:aspect-auto">
                    <Image
                      src={featuredPost.imageUrl}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <Badge className="inline-flex bg-primary text-primary-foreground">{featuredPost.category}</Badge>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{featuredPost.title}</h3>
                      <p className="text-muted-foreground">{featuredPost.description}</p>
                    </div>
                    <div className="mt-6">
                      <div className="flex items-center mb-4">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{featuredPost.author.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>{featuredPost.date}</span>
                            <span className="mx-2">•</span>
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{featuredPost.readTime}</span>
                          </div>
                        </div>
                      </div>
                      <Button asChild>
                        <Link href={`/blog/${featuredPost.slug}`}>
                          Read Article <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest Posts */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  All
                </Button>
                <Button variant="ghost" size="sm">
                  Announcements
                </Button>
                <Button variant="ghost" size="sm">
                  Engineering
                </Button>
                <Button variant="ghost" size="sm">
                  Tutorials
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" asChild className="gap-1">
                      <Link href={`/blog/${post.slug}`}>
                        Read More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button variant="outline">Load More Articles</Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Announcements</CardTitle>
                  <CardDescription>Latest updates and news</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">12 articles</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/blog/category/announcements">
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Engineering</CardTitle>
                  <CardDescription>Technical deep dives</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">28 articles</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/blog/category/engineering">
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Tutorials</CardTitle>
                  <CardDescription>Step-by-step guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">19 articles</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/blog/category/tutorials">
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Community</CardTitle>
                  <CardDescription>Stories and spotlights</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">15 articles</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/blog/category/community">
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Subscribe to Our Newsletter</h2>
                <p className="text-muted-foreground">
                  Get the latest articles, tutorials, and updates delivered straight to your inbox. No spam, unsubscribe anytime.
                </p>
              </div>
              <div className="md:w-1/2 w-full">
                <form className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    />
                    <Button type="submit">Subscribe</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    By subscribing, you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link> and <Link href="/terms" className="underline">Terms of Service</Link>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}