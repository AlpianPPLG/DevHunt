/* eslint-disable jsx-a11y/alt-text */
import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { 
  Search, 
  Upload, 
  ThumbsUp, 
  MessageCircle, 
  Image, 
  BarChart3, 
  Palette,
  BookOpen,
  Rocket,
  Settings
} from "lucide-react"

export default function GettingStartedPage() {
  return (
    <DocPage
      title="Getting Started with DevHunt"
      description="Learn how to get started with DevHunt and discover amazing developer tools."
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-lg">
            Welcome to DevHunt! This guide will help you get started with discovering, sharing, and discussing amazing developer tools, libraries, and projects.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn about DevHunts core features and how it works.
                </p>
                <Link 
                  href="/docs/getting-started/introduction" 
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Read Introduction →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get up and running with DevHunt in less than 5 minutes.
                </p>
                <Link 
                  href="/docs/getting-started/quick-start" 
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Start Here →
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Installation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Set up your development environment and tools.
                </p>
                <Link 
                  href="/docs/getting-started/installation" 
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Setup Guide →
                </Link>
              </CardContent>
            </Card>
          </div>
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
                  Participate in meaningful discussions about tools and projects.
                </p>
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
                  Showcase your tools with rich media including images, videos, and GIFs.
                </p>
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
                  Track your tools performance with comprehensive analytics.
                </p>
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
          <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
          <div className="bg-muted/50 p-6 rounded-lg">
            <p className="mb-4">
              Ready to dive deeper? Choose your path:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/docs/getting-started/introduction"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Read Introduction
              </Link>
              <Link 
                href="/docs/getting-started/quick-start"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Quick Start Guide
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Need Help?</h2>
          <p>
            If you need assistance or have questions:
          </p>
          <ul className="space-y-2">
            <li>
              • Check our <Link href="/docs/faq" className="text-primary hover:underline">FAQ section</Link>
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
