import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Header } from "@/components/layout/header"
import { SubmitForm } from "@/components/product/submit-form"

export default async function SubmitPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-balance">Share Your Discovery</h1>
            <p className="text-muted-foreground mt-2 text-balance">
              Help fellow developers discover amazing tools by submitting your favorites
            </p>
          </div>

          <SubmitForm />

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-medium mb-2">Submission Guidelines</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Make sure the tool is actually useful for developers</li>
              <li>• Provide a clear, compelling description</li>
              <li>• Use relevant tags to help others discover your submission</li>
              <li>• Include a high-quality logo or screenshot if available</li>
              <li>• Ensure the website URL is working and accessible</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
