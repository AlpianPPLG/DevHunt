import { Header } from "@/components/layout/header"
import { ProductFeed } from "@/components/product/product-feed"
import { TagFilter } from "@/components/product/tag-filter"
import { queryRow } from "@/lib/database"
import { notFound } from "next/navigation"
import { Suspense } from "react"

interface TagPageProps {
  params: Promise<{ name: string }>
}

export default async function TagPage({ params }: TagPageProps) {
  const { name } = await params

  // Check if tag exists
  const tag = await queryRow("SELECT id, name, description FROM tags WHERE name = ?", [name])

  if (!tag) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-balance">#{tag.name}</h1>
          {tag.description && <p className="text-xl text-muted-foreground mt-2 text-balance">{tag.description}</p>}
        </div>

        <div className="mb-8">
          <Suspense fallback={<div className="h-16 bg-muted animate-pulse rounded-lg" />}>
            <TagFilter />
          </Suspense>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          }
        >
          <ProductFeed />
        </Suspense>
      </main>
    </div>
  )
}
