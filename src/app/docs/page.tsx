import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Book, FileText, Code, ArrowRight, BookOpen, FileCode, Coffee, Users } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Documentation - DevHunt",
  description: "Learn how to use DevHunt with our comprehensive documentation, guides, and API references.",
}

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Documentation
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Everything you need to know about using DevHunt for discovering and sharing developer tools.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="getting-started" className="space-y-8">
              <TabsList className="w-full justify-start overflow-x-auto py-2 no-scrollbar">
                <TabsTrigger value="getting-started" className="rounded-lg">Getting Started</TabsTrigger>
                <TabsTrigger value="guides" className="rounded-lg">Guides</TabsTrigger>
                <TabsTrigger value="api-reference" className="rounded-lg">API Reference</TabsTrigger>
                <TabsTrigger value="examples" className="rounded-lg">Examples</TabsTrigger>
                <TabsTrigger value="faq" className="rounded-lg">FAQ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="getting-started" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Book className="h-5 w-5 text-primary" />
                        Introduction
                      </CardTitle>
                      <CardDescription>Learn what DevHunt is and how it can help you discover developer tools.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/#about" className="text-primary hover:underline inline-flex items-center gap-1">
                        Read More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Quick Start
                      </CardTitle>
                      <CardDescription>Get up and running with DevHunt in less than 5 minutes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/dashboard" className="text-primary hover:underline inline-flex items-center gap-1">
                        Read More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-primary" />
                        Core Concepts
                      </CardTitle>
                      <CardDescription>Understand the fundamental concepts behind DevHunt.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/#how-it-works" className="text-primary hover:underline inline-flex items-center gap-1">
                        Read More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-10 space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Latest Updates</h2>
                  <div className="grid gap-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Improved Search Functionality</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            We've enhanced our search algorithm to provide more accurate and relevant results.
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">June 2, 2025</span>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">New API Endpoints</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Added new endpoints for accessing trending tools and collections programmatically.
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">May 27, 2025</span>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Documentation Redesign</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            We've completely redesigned our documentation for a better user experience.
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">May 15, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="guides" className="space-y-8">
                <div className="grid grid-cols-1 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>How to Submit a Tool</CardTitle>
                      <CardDescription>Learn how to submit your developer tool to DevHunt.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        This guide will walk you through the process of submitting your developer tool to DevHunt, from preparation to publication.
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/docs/guides/submit-tool">Read Guide</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Creating a Developer Profile</CardTitle>
                      <CardDescription>Set up your profile to showcase your tools and contributions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Learn how to create a compelling developer profile that highlights your expertise and contributions.
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/docs/guides/developer-profile">Read Guide</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Using the DevHunt API</CardTitle>
                      <CardDescription>Integrate DevHunt data into your applications.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        This comprehensive guide covers authentication, endpoints, rate limits, and best practices for using the DevHunt API.
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/docs/guides/api">Read Guide</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Building Collections</CardTitle>
                      <CardDescription>Create curated collections of developer tools.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Learn how to create, manage, and share collections of developer tools for different use cases and technologies.
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/docs/guides/collections">Read Guide</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Understanding the Voting System</CardTitle>
                      <CardDescription>Learn how voting works and how it affects product visibility.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Understand how the voting system works on DevHunt, its impact on trending algorithms, and how to participate effectively.
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="/docs/guides/voting-system">Read Guide</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="api-reference" className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">API Reference</h2>
                    <Button asChild>
                      <Link href="/api">View Full API Documentation</Link>
                    </Button>
                  </div>
                  <p className="text-muted-foreground">
                    Explore our API endpoints and learn how to integrate DevHunt into your applications.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                          <FileCode className="h-5 w-5 text-primary" />
                          Authentication
                        </CardTitle>
                        <CardDescription>Learn how to authenticate with the DevHunt API.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          DevHunt uses API keys for authentication. Learn how to generate and use API keys to access our endpoints.
                        </p>
                        <div className="bg-muted p-3 rounded-md overflow-x-auto">
                          <pre className="text-xs"><code>curl -X GET "https://api.devhunt.io/v1/tools" \
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                          <Code className="h-5 w-5 text-primary" />
                          Endpoints
                        </CardTitle>
                        <CardDescription>Explore the available API endpoints.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center justify-between">
                            <span>GET /v1/tools</span>
                            <Link href="#" className="text-primary hover:underline text-xs">Details</Link>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>GET /v1/tools/:id</span>
                            <Link href="#" className="text-primary hover:underline text-xs">Details</Link>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>GET /v1/collections</span>
                            <Link href="#" className="text-primary hover:underline text-xs">Details</Link>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>POST /v1/tools</span>
                            <Link href="#" className="text-primary hover:underline text-xs">Details</Link>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="examples" className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Code Examples</h2>
                  <p className="text-muted-foreground">
                    Explore practical examples of using DevHunt in different programming languages and frameworks.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>JavaScript Example</CardTitle>
                        <CardDescription>Using DevHunt API with JavaScript/Node.js</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted p-4 rounded-md overflow-x-auto">
                          <pre className="text-xs"><code>{`// Fetch trending tools from DevHunt API
async function getTrendingTools() {
  const response = await fetch(
    'https://api.devhunt.io/v1/tools/trending',
    {
      headers: {
        'Authorization': \`Bearer \${process.env.DEVHUNT_API_KEY}\`
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch trending tools');
  }
  
  return response.json();
}`}</code></pre>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Python Example</CardTitle>
                        <CardDescription>Using DevHunt API with Python</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted p-4 rounded-md overflow-x-auto">
                          <pre className="text-xs"><code>{`import requests

def get_trending_tools():
    api_key = os.environ.get("DEVHUNT_API_KEY")
    
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    response = requests.get(
        "https://api.devhunt.io/v1/tools/trending",
        headers=headers
    )
    
    response.raise_for_status()
    return response.json()`}</code></pre>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">How do I get an API key?</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        You can generate an API key from your account settings page after logging in. Go to Settings {">"}  API Keys and click "Generate New Key".
                      </p>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">Are there rate limits for the API?</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Yes, free accounts are limited to 1000 requests per day. Premium accounts have higher limits. You can monitor your usage in your account dashboard.
                      </p>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">Can I contribute to the documentation?</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Yes! Our documentation is open source. You can contribute by submitting pull requests to our GitHub repository or by suggesting improvements through our feedback form.
                      </p>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">How do I report a bug in the API?</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        You can report bugs by opening an issue on our GitHub repository or by contacting our support team at support@devhunt.io.
                      </p>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <h3 className="font-semibold">Do you offer support for API integration?</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Yes, we offer support for API integration. Premium users get priority support. You can contact our team through the support portal or join our Discord community for community support.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Need Help?</h2>
              <p className="text-muted-foreground max-w-[600px]">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}