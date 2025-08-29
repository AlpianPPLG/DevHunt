import { Header } from "@/components/layout/header"
import { PrivacySection } from "@/components/layout/privacy-section"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Privacy Policy - DevHunt",
  description: "Learn how DevHunt collects, uses, and protects your data. Our privacy policy explains our commitment to safeguarding your information.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PrivacySection />
      </main>
      <Footer />
    </div>
  )
}