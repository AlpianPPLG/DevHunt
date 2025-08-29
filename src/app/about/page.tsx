import { Header } from "@/components/layout/header"
import { AboutSection } from "@/components/layout/about-section"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "About DevHunt - Discover the Best Developer Tools",
  description: "Learn more about DevHunt, our mission, and the team behind the platform helping developers discover the best tools.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}