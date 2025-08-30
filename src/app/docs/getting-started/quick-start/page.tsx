/* eslint-disable @next/next/no-html-link-for-pages */
import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Search, 
  ThumbsUp, 
  MessageCircle, 
  Upload, 
  Smartphone,
  Home,
  Layers,
  Users,
  BarChart3,
  HelpCircle
} from "lucide-react"

export default function QuickStartPage() {
  return (
    <DocPage
      title="Quick Start Guide"
      description="Get up and running with DevHunt in less than 5 minutes."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Quick Setup</h2>
          <p>
            Follow these simple steps to start using DevHunt:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  1. Create an Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Visit <a href="/register" className="text-primary hover:underline">devhunt.io/register</a></li>
                  <li>• Fill in your details (username, email, password)</li>
                  <li>• Verify your email address</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  2. Explore the Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Browse <a href="/" className="text-primary hover:underline">trending tools</a> on the homepage</li>
                  <li>• Use the search bar to find specific tools</li>
                  <li>• Filter by categories or tags</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-primary" />
                  3. Engage with the Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Vote for tools you like (upvote/downvote)</li>
                  <li>• Leave comments to share your thoughts</li>
                  <li>• Follow other developers</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  4. Submit Your First Tool
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Click the Submit Tool button</li>
                  <li>• Fill in tool details</li>
                  <li>• Add tags and thumbnail image</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Key Actions for New Users</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Discovering Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>1. Visit homepage for trending tools</li>
                  <li>2. Use Categories to browse by tech</li>
                  <li>3. Try search with keywords</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Engaging with Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>1. Click tools to view details</li>
                  <li>2. Use vote buttons to rate</li>
                  <li>3. Leave thoughtful comments</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Building Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>1. Complete profile with bio</li>
                  <li>2. Submit your own tools</li>
                  <li>3. Follow interesting developers</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-primary" />
            Mobile Experience
          </h2>
          <p>
            DevHunt is fully responsive and works great on mobile devices:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <li className="flex items-center gap-2">
              <Badge variant="secondary">All features</Badge>
              <span>accessible on mobile</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="secondary">Touch-friendly</Badge>
              <span>interface design</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="secondary">Fast loading</Badge>
              <span>even on slower connections</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Navigation Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Main Sections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Home</strong>: Trending tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Categories</strong>: Browse by category</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Collections</strong>: Curated tool lists</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Community</strong>: User profiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Analytics</strong>: Performance data</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  User Menu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• <strong>Profile</strong>: View and edit your profile</li>
                  <li>• <strong>Dashboard</strong>: Manage submissions</li>
                  <li>• <strong>Settings</strong>: Account preferences</li>
                  <li>• <strong>Submit Tool</strong>: Add new tools</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Essential Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-primary" />
                  Voting System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Upvote valuable tools</li>
                  <li>• Downvote low-quality submissions</li>
                  <li>• Influence trending rankings</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Share experiences with tools</li>
                  <li>• Ask questions about features</li>
                  <li>• Provide feedback to creators</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Collections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Create curated tool lists</li>
                  <li>• Follow user collections</li>
                  <li>• Share with your team</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Tracking Performance
          </h2>
          <p>
            If youve submitted tools:
          </p>
          <ol className="space-y-2 ml-4 list-decimal list-inside">
            <li>Visit your profile to see your submissions</li>
            <li>Click on the Analytics tab to view performance data</li>
            <li>Track views, votes, and comments over time</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Troubleshooting Common Issues
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Login Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Ensure email is verified</li>
                  <li>• Use Forgot Password feature</li>
                  <li>• Check credentials</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Submission Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Fill all required fields</li>
                  <li>• Use direct image URLs</li>
                  <li>• Verify website accessibility</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Try refreshing the page</li>
                  <li>• Clear browser cache</li>
                  <li>• Check internet connection</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Getting Help</h2>
          <p>
            If you encounter any issues:
          </p>
          <ol className="space-y-2 ml-4 list-decimal list-inside">
            <li>Check our <a href="/docs/faq" className="text-primary hover:underline">FAQ section</a></li>
            <li>Contact support at support@devhunt.io</li>
            <li>Join our <a href="https://discord.gg/devhunt" className="text-primary hover:underline">Discord community</a> for real-time help</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
          <p>
            After completing this quick start guide, consider:
          </p>
          <ul className="space-y-2 ml-4 list-disc list-inside">
            <li>Reading our <a href="/docs/guides" className="text-primary hover:underline">User Guides</a> for detailed feature explanations</li>
            <li>Exploring the <a href="/docs/api" className="text-primary hover:underline">API documentation</a> if youre interested in integration</li>
            <li>Checking out our <a href="/docs/analytics" className="text-primary hover:underline">Analytics System</a> to understand performance tracking</li>
          </ul>
        </section>
      </div>
    </DocPage>
  )
}