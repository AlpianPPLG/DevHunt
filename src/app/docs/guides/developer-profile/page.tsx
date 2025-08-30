"use client"

import { DocPage } from "@/components/docs/doc-page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Award, 
  Calendar, 
  Building} from "lucide-react"
import Link from "next/link"

export default function DeveloperProfileGuidePage() {
  return (
    <DocPage
      title="Developer Profiles"
      description="Learn how to create and optimize your developer profile on DevHunt."
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="space-y-4">
          <p className="text-lg">
            Your developer profile is your personal brand on DevHunt. It showcases your 
            contributions, expertise, and helps other developers discover your work.
          </p>
        </div>

        {/* Table of Contents */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <ul className="space-y-1">
              <li>
                <Link href="#profile-benefits" className="text-primary hover:underline">
                  Profile Benefits
                </Link>
              </li>
              <li>
                <Link href="#profile-setup" className="text-primary hover:underline">
                  Setting Up Your Profile
                </Link>
              </li>
              <li>
                <Link href="#profile-optimization" className="text-primary hover:underline">
                  Optimizing Your Profile
                </Link>
              </li>
            </ul>
            <ul className="space-y-1">
              <li>
                <Link href="#profile-analytics" className="text-primary hover:underline">
                  Profile Analytics
                </Link>
              </li>
              <li>
                <Link href="#best-practices" className="text-primary hover:underline">
                  Best Practices
                </Link>
              </li>
              <li>
                <Link href="#faqs" className="text-primary hover:underline">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* Profile Benefits */}
        <section className="space-y-4">
          <h2 id="profile-benefits" className="text-2xl font-bold tracking-tight scroll-mt-20">Profile Benefits</h2>
          
          <p>
            A well-crafted developer profile offers several advantages:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Credibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Establish yourself as an expert in your field and build trust with the community.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5 text-primary" href={""} />
                  Networking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with other developers, potential collaborators, and employers.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Opportunity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Attract job offers, speaking opportunities, and collaboration requests.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Visibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Increase the visibility of your tools and projects to a wider audience.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Profile Setup */}
        <section className="space-y-4">
          <h2 id="profile-setup" className="text-2xl font-bold tracking-tight scroll-mt-20">Setting Up Your Profile</h2>
          
          <p>
            Follow these steps to create a compelling developer profile:
          </p>

          <ol className="space-y-6 my-6">
            <li className="flex flex-col gap-2">
              <strong className="text-lg">1. Add a professional photo</strong>
              <p className="text-muted-foreground">
                Use a clear, professional headshot that represents you. Avoid logos or abstract images.
              </p>
            </li>
            
            <li className="flex flex-col gap-2">
              <strong className="text-lg">2. Write a compelling bio</strong>
              <p className="text-muted-foreground">
                Describe your expertise, interests, and what drives you as a developer in 1-2 paragraphs.
              </p>
            </li>
            
            <li className="flex flex-col gap-2">
              <strong className="text-lg">3. Add your location</strong>
              <p className="text-muted-foreground">
                Share your location to connect with local developers and opportunities.
              </p>
            </li>
            
            <li className="flex flex-col gap-2">
              <strong className="text-lg">4. Include your website</strong>
              <p className="text-muted-foreground">
                Link to your personal website, portfolio, or company page.
              </p>
            </li>
            
            <li className="flex flex-col gap-2">
              <strong className="text-lg">5. Add social links</strong>
              <p className="text-muted-foreground">
                Connect your GitHub, Twitter, LinkedIn, and other relevant profiles.
              </p>
            </li>
            
            <li className="flex flex-col gap-2">
              <strong className="text-lg">6. Highlight your skills</strong>
              <p className="text-muted-foreground">
                List your technical skills and areas of expertise to help others understand your capabilities.
              </p>
            </li>
          </ol>
        </section>

        {/* Profile Optimization */}
        <section className="space-y-4">
          <h2 id="profile-optimization" className="text-2xl font-bold tracking-tight scroll-mt-20">Optimizing Your Profile</h2>
          
          <p>
            Make your profile stand out with these optimization tips:
          </p>

          <ul className="space-y-4 my-6">
            <li className="flex flex-col gap-1">
              <strong>Keep your bio current</strong>
              <p className="text-muted-foreground">
                Update your bio regularly to reflect your current projects, interests, and achievements.
              </p>
            </li>
            
            <li className="flex flex-col gap-1">
              <strong>Showcase your best work</strong>
              <p className="text-muted-foreground">
                Feature your most impactful tools and projects prominently in your profile.
              </p>
            </li>
            
            <li className="flex flex-col gap-1">
              <strong>Engage with the community</strong>
              <p className="text-muted-foreground">
                Regularly comment on and vote for tools to show your active participation in the community.
              </p>
            </li>
            
            <li className="flex flex-col gap-1">
              <strong>Share your knowledge</strong>
              <p className="text-muted-foreground">
                Write blog posts or tutorials related to your expertise to establish thought leadership.
              </p>
            </li>
            
            <li className="flex flex-col gap-1">
              <strong>Complete all sections</strong>
              <p className="text-muted-foreground">
                Fill out every section of your profile to provide a comprehensive view of your background.
              </p>
            </li>
          </ul>
        </section>

        {/* Profile Analytics */}
        <section className="space-y-4">
          <h2 id="profile-analytics" className="text-2xl font-bold tracking-tight scroll-mt-20">Profile Analytics</h2>
          
          <p>
            Track your profiles performance with these metrics:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Views</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track how many people view your profile to gauge your visibility on the platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Follower Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Monitor how your follower count changes over time as a measure of your influence.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Measure how actively people interact with your content through votes and comments.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Referral Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  See how much traffic your profile drives to your personal website or projects.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Best Practices */}
        <section className="space-y-4">
          <h2 id="best-practices" className="text-2xl font-bold tracking-tight scroll-mt-20">Best Practices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle>Authenticity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Be genuine and authentic in your profile. Dont exaggerate your skills or experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professionalism</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Maintain a professional tone and appearance. This is your digital business card.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Consistency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Keep your profile consistent with your other online presences and branding.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Regularly update your profile and engage with the community to stay visible.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 id="faqs" className="text-2xl font-bold tracking-tight scroll-mt-20">Frequently Asked Questions</h2>
          
          <div className="space-y-6 my-6">
            <div>
              <h3 className="text-lg font-medium">How often should I update my profile?</h3>
              <p className="mt-1 text-muted-foreground">
                We recommend updating your profile quarterly or whenever you have significant 
                new achievements, projects, or role changes to share.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Can I customize the look of my profile?</h3>
              <p className="mt-1 text-muted-foreground">
                While we dont offer custom CSS, you can customize the content and 
                arrangement of sections to best represent yourself.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">How can I increase my profile views?</h3>
              <p className="mt-1 text-muted-foreground">
                Submit quality tools, engage with the community through comments and votes, 
                and share your DevHunt profile on social media and your personal website.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Should I include my email address?</h3>
              <p className="mt-1 text-muted-foreground">
                We dont recommend including your personal email address directly on your 
                profile. Instead, use the platforms messaging system or link to a contact page.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="space-y-4">
          <div className="bg-primary/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Ready to enhance your profile?</h2>
            <p className="mb-6">
              Now that you understand how to create and optimize your developer profile, 
              its time to make your mark on the DevHunt community.
            </p>
            <Button asChild>
              <Link href="/settings">Edit Your Profile</Link>
            </Button>
          </div>
        </section>
      </div>
    </DocPage>
  )
}