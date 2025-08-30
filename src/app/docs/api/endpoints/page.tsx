import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Box, 
  Layers, 
  Users, 
  Tag, 
  Image, 
  Globe,
  AlertCircle,
  Clock
} from "lucide-react"

export default function APIEndpointsPage() {
  const endpointCategories = [
    {
      id: "tools",
      title: "Tools",
      icon: <Box className="h-5 w-5" />,
      endpoints: [
        { name: "List Tools", method: "GET", path: "/tools", auth: "Optional" },
        { name: "Get Tool", method: "GET", path: "/tools/{id}", auth: "Optional" },
        { name: "Get Trending Tools", method: "GET", path: "/tools/trending", auth: "Optional" },
        { name: "Submit Tool", method: "POST", path: "/tools/submit", auth: "Required" },
        { name: "Vote on Tool", method: "POST", path: "/tools/{id}/vote", auth: "Required" },
        { name: "Get Tool Comments", method: "GET", path: "/tools/{id}/comments", auth: "Optional" },
        { name: "Add Tool Comment", method: "POST", path: "/tools/{id}/comments", auth: "Required" }
      ]
    },
    {
      id: "collections",
      title: "Collections",
      icon: <Layers className="h-5 w-5" />,
      endpoints: [
        { name: "List Collections", method: "GET", path: "/collections", auth: "Optional" },
        { name: "Get Collection", method: "GET", path: "/collections/{id}", auth: "Optional" },
        { name: "Get Collection Tools", method: "GET", path: "/collections/{id}/products", auth: "Optional" }
      ]
    },
    {
      id: "users",
      title: "Users",
      icon: <Users className="h-5 w-5" />,
      endpoints: [
        { name: "Get User", method: "GET", path: "/users/{username}", auth: "Optional" },
        { name: "Get User Analytics", method: "GET", path: "/users/{username}/analytics", auth: "Required" }
      ]
    },
    {
      id: "tags",
      title: "Tags",
      icon: <Tag className="h-5 w-5" />,
      endpoints: [
        { name: "List Tags", method: "GET", path: "/tags", auth: "Optional" },
        { name: "Get Tag Tools", method: "GET", path: "/tags/{name}", auth: "Optional" }
      ]
    },
    {
      id: "media",
      title: "Media",
      // eslint-disable-next-line jsx-a11y/alt-text
      icon: <Image className="h-5 w-5" />,
      endpoints: [
        { name: "Get Tool Media", method: "GET", path: "/products/{id}/media", auth: "Optional" },
        { name: "Add Tool Media", method: "POST", path: "/products/{id}/media", auth: "Required" },
        { name: "Delete Tool Media", method: "DELETE", path: "/products/{id}/media/{mediaId}", auth: "Required" }
      ]
    },
    {
      id: "images",
      title: "Images",
      icon: <Globe className="h-5 w-5" />,
      endpoints: [
        { name: "Proxy Image", method: "GET", path: "/images/proxy", auth: "Optional" }
      ]
    }
  ]

  const errorResponses = [
    {
      code: 400,
      title: "Bad Request",
      description: "Invalid request parameters",
      example: `{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "name",
      "reason": "Name is required"
    }
  }
}`
    },
    {
      code: 401,
      title: "Unauthorized",
      description: "Authentication required",
      example: `{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}`
    },
    {
      code: 403,
      title: "Forbidden",
      description: "Insufficient permissions",
      example: `{
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions"
  }
}`
    },
    {
      code: 404,
      title: "Not Found",
      description: "Resource not found",
      example: `{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}`
    },
    {
      code: 429,
      title: "Too Many Requests",
      description: "Rate limit exceeded",
      example: `{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded"
  }
}`
    },
    {
      code: 500,
      title: "Internal Server Error",
      description: "An unexpected error occurred",
      example: `{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}`
    }
  ]

  return (
    <DocPage
      title="API Endpoints Reference"
      description="Detailed documentation for all DevHunt API endpoints."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            This comprehensive endpoint reference provides all the information you need to integrate with the DevHunt API. 
            For implementation examples and best practices, see our <a href="/docs/guides/api" className="text-primary hover:underline">API Guide</a>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Endpoint Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endpointCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category.icon}
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.endpoints.map((endpoint, index) => (
                      <li key={index}>
                        <a 
                          href={`#${category.id}-${index}`} 
                          className="text-primary hover:underline text-sm"
                        >
                          {endpoint.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          {endpointCategories.map((category) => (
            <div key={category.id} className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                {category.icon}
                {category.title} Endpoints
              </h2>
              
              <div className="space-y-8">
                {category.endpoints.map((endpoint, index) => (
                  <div 
                    key={index} 
                    id={`${category.id}-${index}`} 
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="bg-muted p-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <Badge variant={endpoint.method === "GET" ? "default" : endpoint.method === "POST" ? "destructive" : "outline"}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm">{endpoint.path}</code>
                        <Badge variant="secondary">
                          Auth: {endpoint.auth}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-medium mt-2">{endpoint.name}</h3>
                    </div>
                    <div className="p-4">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        {/* In a real implementation, we would include detailed documentation for each endpoint */}
                        <p>
                          Detailed documentation for this endpoint would be provided here, including parameters, 
                          request/response examples, and error codes.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-primary" />
            Error Responses
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {errorResponses.map((error) => (
              <Card key={error.code}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="destructive">{error.code}</Badge>
                    {error.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{error.description}</p>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                    <code>{error.example}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            Rate Limits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Free Tier</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• 1,000 requests per day</li>
                  <li>• 100 requests per hour</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Premium Tier</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• 10,000 requests per day</li>
                  <li>• 1,000 requests per hour</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Rate Limit Headers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">All responses include:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 986
X-RateLimit-Reset: 1628607246`}</code>
              </pre>
            </CardContent>
          </Card>
        </section>
      </div>
    </DocPage>
  )
}