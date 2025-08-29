import { Header } from "@/components/layout/header"
import { TeamSection } from "@/components/layout/team-section"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Our Team - DevHunt",
  description: "Meet the talented team behind DevHunt. Learn about the people who are building the platform that helps developers discover the best tools.",
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-accent/30 to-transparent py-12 md:py-20">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              The Team Behind DevHunt
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the passionate individuals working together to help developers discover and share the best tools for building amazing software.
            </p>
          </div>
        </div>
        
        <TeamSection />
      </main>
      <Footer />
    </div>
  )
}