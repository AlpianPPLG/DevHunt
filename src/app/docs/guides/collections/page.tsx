"use client"

import { DocPage } from "@/components/docs/doc-page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Eye, 
  Star, 
  HelpCircle 
} from "lucide-react"
import Link from "next/link"

export default function CollectionsGuidePage() {
  return (
    <DocPage
      title="Creating and Managing Collections"
      description="Learn how to create, curate, and share collections of developer tools on DevHunt."
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="space-y-4">
          <p className="text-lg">
            Collections are curated lists of related developer tools that help organize and 
            showcase tools for specific use cases, technologies, or themes.
          </p>
        </div>

        {/* Table of Contents */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <ul className="space-y-1">
              <li>
                <Link href="#what-are-collections" className="text-primary hover:underline">
                  What are Collections?
                </Link>
              </li>
              <li>
                <Link href="#creating-collections" className="text-primary hover:underline">
                  Creating Your First Collection
                </Link>
              </li>
              <li>
                <Link href="#best-practices" className="text-primary hover:underline">
                  Collection Best Practices
                </Link>
              </li>
            </ul>
            <ul className="space-y-1">
              <li>
                <Link href="#management" className="text-primary hover:underline">
                  Collection Management
                </Link>
              </li>
              <li>
                <Link href="#discovery" className="text-primary hover:underline">
                  Collection Discovery
                </Link>
              </li>
              <li>
                <Link href="#analytics" className="text-primary hover:underline">
                  Collection Analytics
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* What are Collections */}
        <section className="space-y-4">
          <h2 id="what-are-collections" className="text-2xl font-bold tracking-tight scroll-mt-20">What are Collections?</h2>
          
          <p>
            Collections are a powerful way to:
          </p>

          <ul className="space-y-2 my-4">
            <li className="flex items-start gap-2">
              <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
              <span>Group tools by technology stack (e.g., React Ecosystem)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
              <span>Curate tools for specific workflows (e.g., Frontend Performance)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
              <span>Share resources for learning (e.g., Beginner JavaScript Tools)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
              <span>Showcase tools for particular industries (e.g., E-commerce Development)</span>
            </li>
          </ul>
        </section>

        {/* Creating Collections */}
        <section className="space-y-4">
          <h2 id="creating-collections" className="text-2xl font-bold tracking-tight scroll-mt-20">Creating Your First Collection</h2>
          
          <div className="space-y-6 my-6">
            <div className="flex flex-col gap-2">
              <strong className="text-lg flex items-center gap-2">
                <Plus className="h-5 w-5" />
                1. Navigate to Collection Creation
              </strong>
              <p className="text-muted-foreground">
                Click on your profile avatar in the navigation, select Create Collection 
                from the dropdown menu, or visit the collection creation page directly.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <strong className="text-lg flex items-center gap-2">
                <Edit className="h-5 w-5" />
                2. Fill in Collection Details
              </strong>
              <p className="text-muted-foreground">
                Complete all required fields including title, description, tags, and visibility settings.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <strong className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                3. Add Tools to Your Collection
              </strong>
              <p className="text-muted-foreground">
                Search for tools, browse your submissions, and arrange tools in a logical order.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <strong className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5" />
                4. Customize Appearance
              </strong>
              <p className="text-muted-foreground">
                Add a cover image and choose a color scheme that matches your collections theme.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <strong className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5" />
                5. Review and Publish
              </strong>
              <p className="text-muted-foreground">
                Preview your collection and click Publish to make it live.
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="space-y-4">
          <h2 id="best-practices" className="text-2xl font-bold tracking-tight scroll-mt-20">Collection Best Practices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle>Crafting Effective Titles</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Be specific and descriptive</li>
                  <li>• Include relevant keywords</li>
                  <li>• Keep it concise but informative</li>
                </ul>
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium">Good examples:</p>
                  <Badge variant="secondary" className="text-xs">Essential React Development Tools</Badge>
                  <Badge variant="secondary" className="text-xs">Best JavaScript Testing Libraries</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Writing Compelling Descriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your description should explain what the collection is about, who its for, 
                  why you created it, and what makes these tools special together.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Collection Management */}
        <section className="space-y-4">
          <h2 id="management" className="text-2xl font-bold tracking-tight scroll-mt-20">Collection Management</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle>Editing Collections</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Add or remove tools anytime</li>
                  <li>• Update descriptions</li>
                  <li>• Change visibility</li>
                  <li>• Reorder tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collection Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• View counts</li>
                  <li>• Engagement metrics</li>
                  <li>• Popular tools</li>
                  <li>• Referral sources</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Invite contributors</li>
                  <li>• Accept community submissions</li>
                  <li>• Moderate content</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Collection Discovery */}
        <section className="space-y-4">
          <h2 id="discovery" className="text-2xl font-bold tracking-tight scroll-mt-20">Collection Discovery</h2>
          
          <div className="space-y-4 my-6">
            <h3 className="text-lg font-medium">Getting Your Collection Noticed</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>Use relevant tags and keywords</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>Share your collection on social media</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>Submit to relevant community forums</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                <span>Engage with users who view your collection</span>
              </li>
            </ul>
            
            <h3 className="text-lg font-medium mt-6">Popular Collection Themes</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Technology Stacks</Badge>
              <Badge variant="outline">Workflows</Badge>
              <Badge variant="outline">Learning Paths</Badge>
              <Badge variant="outline">Industry-Specific</Badge>
              <Badge variant="outline">Problem-Solving</Badge>
            </div>
          </div>
        </section>

        {/* Collection Analytics */}
        <section className="space-y-4">
          <h2 id="analytics" className="text-2xl font-bold tracking-tight scroll-mt-20">Collection Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Views</span>
                    <span className="text-muted-foreground">How many people viewed</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Engagement</span>
                    <span className="text-muted-foreground">Clicks on tools</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saves</span>
                    <span className="text-muted-foreground">Bookmark count</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Shares</span>
                    <span className="text-muted-foreground">Social shares</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Analyze which tools get the most clicks</li>
                  <li>• Identify best sharing times</li>
                  <li>• Track effective tags</li>
                  <li>• Use insights to improve future collections</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Community Collections */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight scroll-mt-20">Community Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <Card>
              <CardHeader>
                <CardTitle>Following Collections</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Follow collections by other users</li>
                  <li>• Get notified of updates</li>
                  <li>• Save to your personal library</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contributing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Suggest tools for collections</li>
                  <li>• Leave comments and feedback</li>
                  <li>• Share valuable collections</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Conclusion */}
        <section className="space-y-4">
          <div className="bg-primary/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Need Help?
            </h2>
            <p className="mb-4">
              Collections are a powerful way to organize and share knowledge about developer tools. 
              By following these guidelines, you can create valuable resources that benefit both 
              yourself and the broader DevHunt community.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <Link href="/docs/faq">Check FAQ</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </DocPage>
  )
}