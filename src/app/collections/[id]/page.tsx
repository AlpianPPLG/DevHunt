import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { collectionArticles } from "@/lib/collection-articles"

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  // Await params to comply with Next.js 15.5.2 requirements
  const { id } = await params;
  const article = collectionArticles[id]

  if (!article) {
    return {
      title: "Collection Not Found",
      description: "The requested collection could not be found.",
    }
  }

  return {
    title: article.title,
    description: article.summary,
  }
}

export default async function CollectionPage({ params }: { params: { id: string } }) {
  // Await params to comply with Next.js 15.5.2 requirements
  const { id } = await params;
  const article = collectionArticles[id]

  if (!article) {
    notFound()
    return null; // Early return after notFound()
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 max-w-5xl">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="group mb-4"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </Button>

        <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-8">
          <ImageWithFallback
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>
          
          <p className="text-xl text-muted-foreground">{article.summary}</p>
          
          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{article.author.name}</p>
                <p className="text-xs text-muted-foreground">{article.author.title}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{article.publishedAt}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{article.readingTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: processMarkdown(article.content) }} />
      </div>

      <Separator className="my-12" />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Featured Tools in This Collection</h2>
        <p className="text-muted-foreground">Explore the essential tools mentioned in this collection:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {article.relatedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 relative flex-shrink-0">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full">
                  <a href={product.url} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Simple function to convert markdown to HTML
function processMarkdown(markdown: string): string {
  return markdown
    // Headers
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/#### (.*)/g, '<h4>$1</h4>')
    
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Paragraphs (handling multiple line breaks)
    .replace(/\n\s*\n/g, '</p><p>')
    
    // Lists (simple unordered list handling)
    .replace(/^\s*\*\s*(.*)/gm, '<li>$1</li>')
    .replace(/<\/li>\n<li>/g, '</li><li>')
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
    
    // Ensure content is wrapped in paragraphs
    .replace(/^(.+)(?:\n|$)/gm, function(match) {
      if (match.startsWith('<h') || match.startsWith('<ul') || match.startsWith('<p>') || match.startsWith('</p>')) {
        return match;
      }
      return `<p>${match}</p>`;
    })
    
    // Clean up extra paragraph tags
    .replace(/<p><\/p>/g, '')
    .replace(/<p><h([1-6])>/g, '<h$1>')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><ul>/g, '<ul>')
    .replace(/<\/ul><\/p>/g, '</ul>');
}