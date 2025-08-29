"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Code, Copy, CheckCircle, Server, Lock, Globe, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copyToClipboard}
      className="p-1 rounded-md hover:bg-muted"
      title="Copy to clipboard"
    >
      {copied ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4 text-muted-foreground" />
      )}
      <span className="sr-only">Copy to clipboard</span>
    </button>
  )
}

export default function APIPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                API Reference
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Integrate DevHunts powerful features into your applications with our robust API.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button asChild>
                  <Link href="#getting-started">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#endpoints">Browse Endpoints</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:w-1/4 space-y-6">
                <div className="sticky top-20">
                  <nav className="space-y-1">
                    <Link 
                      href="#getting-started" 
                      className="block px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
                    >
                      Getting Started
                    </Link>
                    <Link 
                      href="#authentication" 
                      className="block px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
                    >
                      Authentication
                    </Link>
                    <Link 
                      href="#endpoints" 
                      className="block px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
                    >
                      API Endpoints
                    </Link>
                    <Link 
                      href="#rate-limits" 
                      className="block px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
                    >
                      Rate Limits
                    </Link>
                    <Link 
                      href="#errors" 
                      className="block px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
                    >
                      Error Handling
                    </Link>
                    <Separator className="my-2" />
                    <p className="px-3 py-1 text-xs font-medium text-muted-foreground">Resources</p>
                    <Link 
                      href="/docs" 
                      className="block px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
                    >
                      Documentation
                    </Link>
                    <Link 
                      href="/blog" 
                      className="block px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
                    >
                      Changelog
                    </Link>
                    <Link 
                      href="/community" 
                      className="block px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm font-medium"
                    >
                      Community Support
                    </Link>
                  </nav>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="lg:w-3/4 space-y-10">
                <section id="getting-started" className="space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
                  <p className="text-muted-foreground">
                    The DevHunt API enables you to programmatically access our data and services. 
                    This reference documents all the endpoints available in our REST API, along with 
                    request and response examples.
                  </p>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Base URL</CardTitle>
                      <CardDescription>All API requests should be made to the following base URL:</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted p-3 rounded-md flex justify-between items-center">
                        <code className="text-sm">https://api.devhunt.io/v1</code>
                        <CopyButton text="https://api.devhunt.io/v1" />
                      </div>
                    </CardContent>
                  </Card>
                </section>
                
                <Separator />
                
                <section id="authentication" className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold tracking-tight">Authentication</h2>
                  </div>
                  
                  <p className="text-muted-foreground">
                    DevHunt uses API keys to authenticate requests. You can view and manage your API keys in your account settings.
                  </p>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Authorization Header</CardTitle>
                      <CardDescription>Pass your API key in the Authorization header with each request:</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted p-3 rounded-md overflow-x-auto">
                        <pre className="text-sm"><code>Authorization: Bearer YOUR_API_KEY</code></pre>
                      </div>
                      
                      <h4 className="font-medium mt-6 mb-2">Example Request</h4>
                      <div className="bg-muted p-3 rounded-md overflow-x-auto">
                        <pre className="text-sm"><code>{`curl -X GET "https://api.devhunt.io/v1/tools" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</code></pre>
                      </div>
                    </CardContent>
                  </Card>
                </section>
                
                <Separator />
                
                <section id="endpoints" className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold tracking-tight">API Endpoints</h2>
                  </div>
                  
                  <Tabs defaultValue="tools" className="space-y-6">
                    <TabsList className="w-full justify-start overflow-x-auto py-2 no-scrollbar">
                      <TabsTrigger value="tools">Tools</TabsTrigger>
                      <TabsTrigger value="collections">Collections</TabsTrigger>
                      <TabsTrigger value="categories">Categories</TabsTrigger>
                      <TabsTrigger value="users">Users</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="tools" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded px-2 py-1">GET</div>
                                <CardTitle>/tools</CardTitle>
                              </div>
                              <CardDescription>List all tools</CardDescription>
                            </div>
                            <CopyButton text="https://api.devhunt.io/v1/tools" />
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">Example Response</h4>
                            <div className="bg-muted p-3 rounded-md overflow-x-auto">
                              <pre className="text-sm"><code>{`{
  "data": [
    {
      "id": "tool_01H4Z7PY4KDKGKM78W85ERMQZK",
      "name": "TailwindCSS",
      "description": "A utility-first CSS framework for rapidly building custom designs.",
      "url": "https://tailwindcss.com",
      "category": "design-tools",
      "thumbnail_url": "https://example.com/thumbnails/tailwindcss.png",
      "votes_count": 1237,
      "created_at": "2023-06-15T10:32:17Z"
    },
    // More tools...
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 42,
    "total_count": 837,
    "per_page": 20
  }
}`}</code></pre>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="collections" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded px-2 py-1">GET</div>
                                <CardTitle>/collections</CardTitle>
                              </div>
                              <CardDescription>List all collections</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            Returns a paginated list of collections.
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="categories" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded px-2 py-1">GET</div>
                                <CardTitle>/categories</CardTitle>
                              </div>
                              <CardDescription>List all categories</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            Returns a list of all available tool categories.
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="users" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded px-2 py-1">GET</div>
                                <CardTitle>/users/:username</CardTitle>
                              </div>
                              <CardDescription>Get a users profile</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            Returns public information about a user.
                          </p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </section>
                
                <Separator />
                
                <section id="rate-limits" className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold tracking-tight">Rate Limits</h2>
                  </div>
                  
                  <p className="text-muted-foreground">
                    To ensure the stability of the API, we enforce rate limits on requests. Rate limits vary by API endpoint and account tier.
                  </p>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Rate Limits by Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-medium">Plan</th>
                            <th className="text-left py-2 font-medium">Rate Limit</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Free</td>
                            <td className="py-2 text-muted-foreground">1,000 requests per day</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Pro</td>
                            <td className="py-2 text-muted-foreground">5,000 requests per hour</td>
                          </tr>
                          <tr>
                            <td className="py-2">Enterprise</td>
                            <td className="py-2 text-muted-foreground">Custom limits</td>
                          </tr>
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </section>
                
                <Separator />
                
                <section id="errors" className="space-y-6">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl font-bold tracking-tight">Error Handling</h2>
                  </div>
                  
                  <p className="text-muted-foreground">
                    The DevHunt API uses conventional HTTP response codes to indicate the success or failure of an API request.
                  </p>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="bg-muted p-3 rounded-md overflow-x-auto">
                        <pre className="text-sm"><code>{`{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid.",
    "details": [
      "The 'name' field is required."
    ]
  }
}`}</code></pre>
                      </div>
                    </CardContent>
                  </Card>
                </section>
                
                <div className="text-center py-8">
                  <Button asChild>
                    <Link href="/contact">Need Help? Contact Support</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}