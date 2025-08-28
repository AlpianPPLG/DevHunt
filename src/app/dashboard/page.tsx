import { Header } from "@/components/layout/header"
import { ProductFeed } from "@/components/product/product-feed"
import { AdvancedSearch } from "@/components/product/advanced-search"
import { Suspense } from "react"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4">
        {/* Welcome Section */}
        <section className="py-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              Discover the latest developer tools trending in the community
            </p>
          </div>
        </section>

        {/* Search and Discovery Section */}
        <section className="pb-8">
          <div className="mb-8">
            <Suspense fallback={<div className="h-16 bg-muted animate-pulse rounded-lg" />}>
              <AdvancedSearch />
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
        </section>
      </main>
    </div>
  )
}