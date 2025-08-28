import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Header } from "@/components/layout/header"
import { ProfileSettingsForm } from "@/components/profile/profile-settings-form"

export default async function SettingsPage() {
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
            <h1 className="text-3xl font-bold text-balance">Account Settings</h1>
            <p className="text-muted-foreground mt-2 text-balance">Manage your profile and account preferences</p>
          </div>

          <ProfileSettingsForm user={user} />
        </div>
      </main>
    </div>
  )
}
