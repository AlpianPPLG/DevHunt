"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Check, Info, AlertCircle, Code, Lock, Clock, Database, Server } from "lucide-react"
import Link from "next/link"

export default function ApiGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Link 
                href="/docs" 
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Documentation
              </Link>
              <div className="p-3 bg-primary/10 rounded-full">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Using the DevHunt API
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px]">
                Integrate DevHunt data into your applications using our comprehensive API.
              </p>
            </div>
          </div>
        </section>

        {/* Guide Content */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {/* Table of Contents */}
              <Card className="mb-10">
                <CardHeader>
                  <CardTitle>Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li>
                      <Link href="#getting-started" className="text-primary hover:underline">
                        Getting Started
                      </Link>
                    </li>
                    <li>
                      <Link href="#authentication" className="text-primary hover:underline">
                        Authentication
                      </Link>
                    </li>
                    <li>
                      <Link href="#endpoints" className="text-primary hover:underline">
                        API Endpoints
                      </Link>
                    </li>
                    <li>
                      <Link href="#rate-limits" className="text-primary hover:underline">
                        Rate Limits
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
                </CardContent>
              </Card>

              {/* Introduction */}
              <p className="lead">
                The DevHunt API allows you to programmatically access data from our platform, enabling you to build 
                integrations, dashboards, or custom applications that leverage our developer tools database.
              </p>

              <div className="flex p-4 mb-6 bg-primary/5 rounded-lg">
                <Info className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <p className="text-sm m-0">
                  This guide provides an overview of the API. For detailed endpoint documentation and interactive testing, 
                  visit our <Link href="/api" className="text-primary hover:underline">API Reference</Link> page.
                </p>
              </div>

              {/* Getting Started */}
              <h2 id="getting-started" className="scroll-mt-20">Getting Started</h2>
              
              <p>
                To start using the DevHunt API, you'll need to:
              </p>

              <ol className="space-y-6 my-6">
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">1. Create a DevHunt account</strong>
                  <p className="text-muted-foreground">
                    If you don't already have an account, sign up at <Link href="/signup" className="text-primary hover:underline">devhunt.io/signup</Link>.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">2. Generate an API key</strong>
                  <p className="text-muted-foreground">
                    Navigate to your account settings and generate an API key from the "API Keys" section.
                  </p>
                </li>
                
                <li className="flex flex-col gap-2">
                  <strong className="text-lg">3. Make your first request</strong>
                  <p className="text-muted-foreground">
                    Use your API key to authenticate requests to our endpoints.
                  </p>
                </li>
              </ol>

              <div className="bg-muted p-4 rounded-md overflow-x-auto mb-8">
                <pre className="text-sm"><code>{`# Example request using curl
curl -X GET "https://api.devhunt.io/v1/tools" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code></pre>
              </div>

              {/* Authentication */}
              <h2 id="authentication" className="scroll-mt-20">Authentication</h2>
              
              <p>
                All API requests must be authenticated using an API key. This key should be included in the Authorization 
                header using the Bearer authentication scheme:
              </p>

              <div className="bg-muted p-4 rounded-md overflow-x-auto mb-8">
                <pre className="text-sm"><code>{`Authorization: Bearer YOUR_API_KEY`}</code></pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      API Key Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Never expose your API key in client-side code</li>
                      <li>• Don't commit your API key to version control</li>
                      <li>• Use environment variables to store your key</li>
                      <li>• Rotate your keys periodically for enhanced security</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-primary" />
                      Key Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Create separate keys for different applications</li>
                      <li>• Revoke keys that are no longer needed</li>
                      <li>• Monitor key usage in your DevHunt dashboard</li>
                      <li>• Set usage alerts to detect unusual activity</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* API Endpoints */}
              <h2 id="endpoints" className="scroll-mt-20">API Endpoints</h2>
              
              <p>
                The DevHunt API provides several endpoints to access different types of data:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">Endpoint</th>
                      <th className="border p-2 text-left">Description</th>
                      <th className="border p-2 text-left">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2"><code>/v1/tools</code></td>
                      <td className="border p-2">List all tools with pagination</td>
                      <td className="border p-2">GET</td>
                    </tr>
                    <tr>
                      <td className="border p-2"><code>/v1/tools/:id</code></td>
                      <td className="border p-2">Get details for a specific tool</td>
                      <td className="border p-2">GET</td>
                    </tr>
                    <tr>
                      <td className="border p-2"><code>/v1/tools/trending</code></td>
                      <td className="border p-2">Get currently trending tools</td>
                      <td className="border p-2">GET</td>
                    </tr>
                    <tr>
                      <td className="border p-2"><code>/v1/collections</code></td>
                      <td className="border p-2">List all public collections</td>
                      <td className="border p-2">GET</td>
                    </tr>
                    <tr>
                      <td className="border p-2"><code>/v1/collections/:id</code></td>
                      <td className="border p-2">Get details for a specific collection</td>
                      <td className="border p-2">GET</td>
                    </tr>
                    <tr>
                      <td className="border p-2"><code>/v1/tags</code></td>
                      <td className="border p-2">List all available tags</td>
                      <td className="border p-2">GET</td>
                    </tr>
                    <tr>
                      <td className="border p-2"><code>/v1/users/:username</code></td>
                      <td className="border p-2">Get public user profile data</td>
                      <td className="border p-2">GET</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Each endpoint supports various query parameters for filtering, sorting, and pagination:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">Parameter</th>
                      <th className="border p-2 text-left">Description</th>
                      <th className="border p-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2"><code>page</code></td>
                      <td className="border p-2">Page number for paginated results</td>
                      <td className="border p-2"><code>?page=2</code></td>
                    </tr>
                    <tr>
                      <td className="border p-2"><code>limit</code></td>
                      <td className="border p-2">Number of results per page (max 100)</td>
                      <td className="border p-2"><code>?limit=25</code></td>
                    </tr>
                    <tr>
                      <td className="border p-2"><code>sort</code></td>
                      <td className="border p-2">Field to sort by</td>
                      <td className="border p-2"><code>?sort=created_at</code></td>
                    </tr>
                    <tr>
                      <td className="border p-2"><code>order</code></td>
                      <td className="border p-2">Sort order (asc or desc)</td>
                      <td className="border p-2"><code>?order=desc</code></td>
                    </tr>
                    <tr>
                      <td className="border p-2"><code>tag</code></td>
                      <td className="border p-2">Filter by tag name</td>
                      <td className="border p-2"><code>?tag=javascript</code></td>
                    </tr>
                    <tr>
                      <td className="border p-2"><code>q</code></td>
                      <td className="border p-2">Search query string</td>
                      <td className="border p-2"><code>?q=react+components</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-medium mt-6 mb-4">Example Response</h3>

              <p>Here's a sample response from the <code>/v1/tools</code> endpoint:</p>

              <div className="bg-muted p-4 rounded-md overflow-x-auto mb-8">
                <pre className="text-sm"><code>{`{
  "data": [
    {
      "id": "tool-1-uuid",
      "name": "ShadcnUI",
      "tagline": "Beautifully designed components built with Radix UI and Tailwind CSS",
      "description": "Accessible and customizable components that you can copy and paste into your apps.",
      "website_url": "https://ui.shadcn.com",
      "thumbnail_url": "https://ui.shadcn.com/og.jpg",
      "submitter": {
        "username": "shadcn",
        "name": "Shadcn",
        "avatar_url": "https://github.com/shadcn.png"
      },
      "vote_count": 1250,
      "created_at": "2023-03-15T10:30:00Z",
      "tags": [
        {"id": 1, "name": "ui-components"},
        {"id": 2, "name": "react"},
        {"id": 3, "name": "tailwindcss"}
      ]
    },
    // More tools...
  ],
  "meta": {
    "total_count": 458,
    "page": 1,
    "per_page": 10,
    "total_pages": 46
  }
}`}</code></pre>
              </div>

              {/* Rate Limits */}
              <h2 id="rate-limits" className="scroll-mt-20">Rate Limits</h2>
              
              <p>
                To ensure API stability and fair usage, we implement rate limiting:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Free Tier
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 1,000 requests per day</li>
                      <li>• 100 requests per hour</li>
                      <li>• Rate limit headers included in responses</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Premium Tier
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 10,000 requests per day</li>
                      <li>• 1,000 requests per hour</li>
                      <li>• Priority access during high traffic</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <p>
                Rate limit information is included in the response headers:
              </p>

              <div className="bg-muted p-4 rounded-md overflow-x-auto mb-8">
                <pre className="text-sm"><code>{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 986
X-RateLimit-Reset: 1628607246`}</code></pre>
              </div>

              <div className="flex p-4 mb-6 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200 m-0">
                  If you exceed your rate limit, requests will return a 429 Too Many Requests response. Implement proper error 
                  handling and consider adding exponential backoff to your integration.
                </p>
              </div>

              {/* Best Practices */}
              <h2 id="best-practices" className="scroll-mt-20">Best Practices</h2>
              
              <p>
                Follow these best practices to build robust integrations with the DevHunt API:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Caching</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Implement client-side caching to reduce API calls and improve performance.
                    </p>
                    <div className="bg-muted/50 p-3 rounded-md text-xs">
                      <code>{`// Example caching header usage
if (response.headers.has('ETag')) {
  localStorage.setItem(
    'cache-etag', 
    response.headers.get('ETag')
  );
}`}</code>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Error Handling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Implement robust error handling for different HTTP status codes.
                    </p>
                    <div className="bg-muted/50 p-3 rounded-md text-xs">
                      <code>{`// Example error handling
if (!response.ok) {
  if (response.status === 429) {
    // Implement backoff strategy
  } else if (response.status === 401) {
    // Handle authentication errors
  }
}`}</code>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Pagination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Always use pagination parameters to limit response size and improve performance.
                    </p>
                    <div className="bg-muted/50 p-3 rounded-md text-xs">
                      <code>{`// Example pagination implementation
async function fetchAllTools() {
  let page = 1;
  let allTools = [];
  let hasMore = true;
  
  while (hasMore) {
    const response = await fetch(
      \`/v1/tools?page=\${page}&limit=100\`
    );
    const data = await response.json();
    allTools = [...allTools, ...data.data];
    
    hasMore = page < data.meta.total_pages;
    page++;
  }
  
  return allTools;
}`}</code>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Filtering</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Use query parameters to filter results on the server side instead of fetching everything.
                    </p>
                    <div className="bg-muted/50 p-3 rounded-md text-xs">
                      <code>{`// Example filtering implementation
// Instead of this:
const allTools = await fetch('/v1/tools');
const jsTools = allTools.filter(
  tool => tool.tags.includes('javascript')
);

// Do this:
const jsTools = await fetch(
  '/v1/tools?tag=javascript'
);`}</code>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="relative my-10 p-6 bg-primary/5 rounded-lg">
                <div className="absolute -top-5 left-6 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Pro Tip
                </div>
                <p className="mt-2">
                  <strong>Use compression!</strong> Add the <code>Accept-Encoding: gzip, deflate</code> header to your requests 
                  to receive compressed responses, which can significantly reduce bandwidth usage and improve performance.
                </p>
              </div>

              {/* FAQs */}
              <h2 id="faqs" className="scroll-mt-20">Frequently Asked Questions</h2>
              
              <div className="space-y-6 my-8">
                <div>
                  <h3 className="text-lg font-medium">How do I get an API key?</h3>
                  <p className="mt-1 text-muted-foreground">
                    You can generate an API key from your account settings page. Navigate to Settings {">"}  API Keys 
                    and click "Generate New Key".
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Can I submit tools via the API?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Yes, you can submit new tools using a POST request to the <code>/v1/tools</code> endpoint. However, 
                    this requires additional permissions. Contact our team if you need to submit tools programmatically.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">How recent is the API data?</h3>
                  <p className="mt-1 text-muted-foreground">
                    The API provides real-time data with minimal delay. Any changes made on the DevHunt platform are 
                    immediately reflected in API responses.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Is there an SDK available?</h3>
                  <p className="mt-1 text-muted-foreground">
                    We offer official SDKs for JavaScript/TypeScript, Python, and Ruby. You can find them in our 
                    <Link href="https://github.com/devhunt-api" className="text-primary hover:underline mx-1">GitHub organization</Link>.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">How do I report bugs or request new features?</h3>
                  <p className="mt-1 text-muted-foreground">
                    Please open an issue on our GitHub repository or contact our support team at api-support@devhunt.io.
                  </p>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-primary/5 p-6 rounded-lg mt-10">
                <h2 className="text-xl font-bold mb-4">Ready to start integrating?</h2>
                <p className="mb-6">
                  Now that you understand how to use the DevHunt API, you can start building your integration. 
                  For detailed endpoint documentation and interactive testing, visit our API Reference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link href="/api">API Reference</Link>
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