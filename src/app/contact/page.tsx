import { Header } from "@/components/layout/header"
import { ContactSection } from "@/components/layout/contact-section"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Contact Us - DevHunt",
  description: "Get in touch with the DevHunt team. We're here to help with any questions, feedback, or support you might need.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}