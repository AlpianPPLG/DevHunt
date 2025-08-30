/* eslint-disable jsx-a11y/alt-text */
import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Upload, 
  ThumbsUp, 
  MessageCircle, 
  Image, 
  BarChart3, 
  Smartphone,
  Database,
  Palette
} from "lucide-react"

export default function IntroductionPage() {
  return (
    <DocPage
      title="Introduction to DevHunt"
      description="Discover, share, and discuss amazing developer tools, libraries, and projects."
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-lg">
            Welcome to DevHunt, a modern platform designed for developers to discover, share, and discuss amazing developer tools, libraries, and projects.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">What is DevHunt?</h2>
          <p>
            DevHunt is a community-driven platform that helps developers find and share the best tools, libraries, frameworks, and resources. Whether youre a seasoned developer looking for cutting-edge tools or a beginner searching for helpful resources, DevHunt provides a curated collection of developer tools with community-driven rankings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Product Discovery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse and discover thousands of developer tools across various categories.
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Frontend frameworks</li>
                  <li>• Backend frameworks</li>
                  <li>• Mobile development</li>
                  <li>• DevOps tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  User Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Submit your own tools, libraries, or projects to share with the community.
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Rich media support</li>
                  <li>• Detailed descriptions</li>
                  <li>• Tagging system</li>
                  <li>• External images</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-primary" />
                  Voting System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Engage with the community through our voting system.
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Upvote/downvote tools</li>
                  <li>• Influence rankings</li>
                  <li>• Earn reputation</li>
                  <li>• Community feedback</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Comments & Discussion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Participate in meaningful discussions.
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Comment on tools</li>
                  <li>• Reply to comments</li>
                  <li>• Share experiences</li>
                  <li>• Ask questions</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-primary" />
                  Media Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Showcase your tools with rich media.
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Images, videos, GIFs</li>
                  <li>• External URLs</li>
                  <li>• Responsive gallery</li>
                  <li>• Image optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Analytics System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your tools performance.
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• View counts</li>
                  <li>• Performance metrics</li>
                  <li>• User dashboard</li>
                  <li>• Data export</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">How DevHunt Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center space-y-2">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Discover</h3>
              <p className="text-sm text-muted-foreground">Browse trending tools</p>
            </div>
            <div className="text-center space-y-2">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <ThumbsUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Engage</h3>
              <p className="text-sm text-muted-foreground">Vote and comment</p>
            </div>
            <div className="text-center space-y-2">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Submit</h3>
              <p className="text-sm text-muted-foreground">Share your tools</p>
            </div>
            <div className="text-center space-y-2">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Track</h3>
              <p className="text-sm text-muted-foreground">Monitor performance</p>
            </div>
            <div className="text-center space-y-2">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Curate</h3>
              <p className="text-sm text-muted-foreground">Create collections</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Target Audience</h2>
          <p>
            DevHunt is designed for:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li className="flex items-center gap-2">
              <Badge variant="secondary">Developers</Badge>
              <span>looking for new tools and libraries</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="secondary">Maintainers</Badge>
              <span>wanting to share their projects</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="secondary">Enthusiasts</Badge>
              <span>interested in latest tools</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="secondary">Teams</Badge>
              <span>seeking productivity tools</span>
            </li>
            <li className="flex items-center gap-2">
              <Badge variant="secondary">Educators</Badge>
              <span>finding teaching resources</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Next.js 15.5.2</span>
                    <Badge variant="outline">React-based framework</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>React 19.1.0</span>
                    <Badge variant="outline">UI library</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>TypeScript</span>
                    <Badge variant="outline">Typed JavaScript</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Tailwind CSS</span>
                    <Badge variant="outline">CSS framework</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Radix UI</span>
                    <Badge variant="outline">UI components</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Next.js API Routes</span>
                    <Badge variant="outline">Serverless functions</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>MySQL 8.0+</span>
                    <Badge variant="outline">Database</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>jsonwebtoken</span>
                    <Badge variant="outline">Authentication</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>bcryptjs</span>
                    <Badge variant="outline">Password hashing</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Community Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Be Respectful</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Treat all community members with respect and courtesy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stay On Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Keep discussions relevant to developer tools and technologies.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Provide Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Share meaningful insights, experiences, and feedback.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Avoid Spam</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Do not submit duplicate or low-quality content.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
          <p>
            Ready to dive in? Check out our <a href="/docs/getting-started/quick-start" className="text-primary hover:underline">Quick Start Guide</a> to get up and running with DevHunt in less than 5 minutes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Support</h2>
          <p>
            If you need help or have questions:
          </p>
          <ul className="space-y-2">
            <li>
              • Check our <a href="/docs/faq" className="text-primary hover:underline">FAQ section</a>
            </li>
            <li>
              • Contact our support team at support@devhunt.io
            </li>
            <li>
              • Join our <a href="https://discord.gg/devhunt" className="text-primary hover:underline">Discord community</a> for real-time assistance
            </li>
          </ul>
        </section>
      </div>
    </DocPage>
  )
}