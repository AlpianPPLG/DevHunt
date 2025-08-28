import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/layout/hero-section"
import { LandingPreview } from "@/components/layout/landing-preview"
import { Suspense } from "react"
import { HowItWorksSection } from "@/components/layout/how-it-works-section"
import { FeaturedCollectionsSection } from "@/components/layout/featured-collections-section"
import { CategoriesSection } from "@/components/layout/categories-section"
import { RecentActivitySection } from "@/components/layout/recent-activity-section"
import { StatisticsSection } from "@/components/layout/statistics-section"
import { FAQSection } from "@/components/layout/faq-section"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4">
        <HeroSection />

        {/* Landing Preview Section */}
        <section className="py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Trending Developer Tools</h2>
            <p className="text-muted-foreground mt-1">Discover what the community is talking about today</p>
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
            <LandingPreview />
            <HowItWorksSection />
            <FeaturedCollectionsSection />
            <CategoriesSection />
            <RecentActivitySection />
            <StatisticsSection />
            <FAQSection />
            <Footer />
          </Suspense>
        </section>
      </main>
    </div>
  )
}
