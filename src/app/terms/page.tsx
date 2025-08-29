import { Header } from "@/components/layout/header"
import { TermsSection } from "@/components/layout/terms-section"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Terms of Service - DevHunt",
  description: "Read the Terms of Service for DevHunt. Learn about the rules and guidelines governing your use of our platform.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <TermsSection />
      </main>
      <Footer />
    </div>
  )
}