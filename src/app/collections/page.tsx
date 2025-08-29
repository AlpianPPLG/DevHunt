import Link from "next/link"
import { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"
import { collectionArticles } from "@/lib/collection-articles"

export const metadata: Metadata = {
  title: "DevHunt Collections",
  description: "Curated collections of developer tools and resources",
}

export default function CollectionsPage() {
  const articles = Object.values(collectionArticles)

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Developer Collections
        </h1>
        <p className="text-xl text-muted-foreground">
          Curated collections of the best tools and resources for modern development
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden group hover:shadow-lg transition-all">
            <div className="aspect-[16/9] relative">
              <ImageWithFallback
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <h2 className="text-2xl font-bold">{article.title}</h2>
                <p className="text-muted-foreground line-clamp-3">{article.summary}</p>
                
                <div className="flex items-center pt-4 mt-auto">
                  <div className="flex items-center mr-auto">
                    <div className="h-8 w-8 relative rounded-full overflow-hidden mr-2">
                      <ImageWithFallback
                        src={article.author.avatar}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{article.author.name}</p>
                      <p className="text-xs text-muted-foreground">{article.publishedAt}</p>
                    </div>
                  </div>
                  
                  <Button asChild size="sm" variant="secondary" className="ml-auto">
                    <Link href={`/collections/${article.id}`}>
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}