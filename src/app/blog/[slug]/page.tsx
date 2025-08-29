/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { blogPosts } from "@/lib/blog-data"
import { blogContents } from "@/lib/blog-content"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ChevronLeft, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react"
import { useState, use, useEffect } from "react"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [copied, setCopied] = useState(false);
  const resolvedParams = use(params as any) as { slug: string };
  const post = blogPosts.find(post => post.slug === resolvedParams.slug);
  
  // State for social share URLs to prevent hydration mismatches
  const [twitterShareUrl, setTwitterShareUrl] = useState('');
  const [facebookShareUrl, setFacebookShareUrl] = useState('');
  const [linkedinShareUrl, setLinkedinShareUrl] = useState('');
  const [fullShareUrl, setFullShareUrl] = useState('');
  
  if (!post) {
    notFound();
  }
  
  const content = blogContents[resolvedParams.slug];
  
  if (!content) {
    notFound();
  }
  
  // Use useEffect to generate share URLs on the client side only
  useEffect(() => {
    const baseUrl = window.location.origin;
    const pageUrl = `${baseUrl}/blog/${resolvedParams.slug}`;
    
    setFullShareUrl(pageUrl);
    setTwitterShareUrl(`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`);
    setFacebookShareUrl(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`);
    setLinkedinShareUrl(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`);
  }, [post.title, resolvedParams.slug]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <Link 
                href="/blog" 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors self-start mb-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Blog
              </Link>
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-center max-w-3xl">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px] text-center">
                {post.description}
              </p>
              <div className="flex items-center mt-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Article Content */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Share Sidebar */}
              <div className="hidden lg:flex col-span-1 flex-col items-center sticky top-20 h-fit">
                <div className="text-sm font-medium mb-2">Share</div>
                <div className="flex flex-col gap-3">
                  {twitterShareUrl && (
                    <Button size="icon" variant="outline" className="rounded-full" asChild>
                      <Link href={twitterShareUrl} target="_blank">
                        <Twitter className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {facebookShareUrl && (
                    <Button size="icon" variant="outline" className="rounded-full" asChild>
                      <Link href={facebookShareUrl} target="_blank">
                        <Facebook className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {linkedinShareUrl && (
                    <Button size="icon" variant="outline" className="rounded-full" asChild>
                      <Link href={linkedinShareUrl} target="_blank">
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="rounded-full" 
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="col-span-12 lg:col-span-8 lg:col-start-3">
                {/* Featured Image */}
                <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Article Text */}
                <article className="prose prose-slate dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />
                </article>
                
                {/* Mobile Share */}
                <div className="mt-10 flex lg:hidden justify-center">
                  <div className="flex gap-3">
                    {twitterShareUrl && (
                      <Button size="icon" variant="outline" className="rounded-full" asChild>
                        <Link href={twitterShareUrl} target="_blank">
                          <Twitter className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {facebookShareUrl && (
                      <Button size="icon" variant="outline" className="rounded-full" asChild>
                        <Link href={facebookShareUrl} target="_blank">
                          <Facebook className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {linkedinShareUrl && (
                      <Button size="icon" variant="outline" className="rounded-full" asChild>
                        <Link href={linkedinShareUrl} target="_blank">
                          <Linkedin className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="rounded-full" 
                      onClick={copyToClipboard}
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                {/* Author Bio */}
                <div className="mt-10 p-6 bg-muted rounded-lg">
                  <div className="flex items-start md:items-center">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-lg">About {post.author.name}</p>
                      <p className="text-muted-foreground">
                        {post.author.name} is a contributor to DevHunt, sharing insights on developer tools and best practices. 
                        Follow their work to stay updated on the latest trends in software development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Articles */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts
                .filter(p => p.slug !== post.slug && (p.category === post.category || p.author.name === post.author.name))
                .slice(0, 3)
                .map(relatedPost => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                    <div className="rounded-lg border bg-card overflow-hidden h-full flex flex-col transition-all group-hover:shadow-md">
                      <div className="relative aspect-video">
                        <Image
                          src={relatedPost.imageUrl}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <Badge variant="secondary" className="w-fit mb-2">{relatedPost.category}</Badge>
                        <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{relatedPost.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{relatedPost.description}</p>
                        <div className="flex items-center mt-auto">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                            <Image
                              src={relatedPost.author.avatar}
                              alt={relatedPost.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-sm">
                            <p className="font-medium">{relatedPost.author.name}</p>
                            <p className="text-xs text-muted-foreground">{relatedPost.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
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

// Simple markdown parser for demonstration purposes
// In a real application, you'd use a proper markdown parser like marked or remark
function parseMarkdown(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-primary hover:underline">$1</a>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    // Code blocks
    .replace(/\`\`\`([\s\S]*?)\`\`\`/gim, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/\`(.*?)\`/gim, '<code>$1</code>')
    // Paragraphs
    .replace(/\n\n/gim, '</p><p>')
  
  // Wrap in paragraph tags if not already wrapped
  if (!html.startsWith('<h1>') && !html.startsWith('<h2>') && !html.startsWith('<h3>')) {
    html = '<p>' + html + '</p>';
  }
  
  return html;
}