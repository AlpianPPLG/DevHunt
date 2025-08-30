import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Server, 
  Code,
  Terminal
} from "lucide-react"

export default function APIErrorHandlingPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const statusCodes = [
    { code: 200, message: "OK", description: "Request successful", category: "success" },
    { code: 201, message: "Created", description: "Resource successfully created", category: "success" },
    { code: 204, message: "No Content", description: "Request successful, no content to return", category: "success" },
    { code: 400, message: "Bad Request", description: "Invalid request parameters", category: "client" },
    { code: 401, message: "Unauthorized", description: "Missing or invalid authentication", category: "client" },
    { code: 403, message: "Forbidden", description: "Insufficient permissions", category: "client" },
    { code: 404, message: "Not Found", description: "Resource doesn't exist", category: "client" },
    { code: 409, message: "Conflict", description: "Resource conflict", category: "client" },
    { code: 422, message: "Unprocessable Entity", description: "Validation errors", category: "client" },
    { code: 429, message: "Too Many Requests", description: "Rate limit exceeded", category: "client" },
    { code: 500, message: "Internal Server Error", description: "Unexpected server error", category: "server" },
    { code: 502, message: "Bad Gateway", description: "Invalid response from upstream server", category: "server" },
    { code: 503, message: "Service Unavailable", description: "Service temporarily unavailable", category: "server" },
    { code: 504, message: "Gateway Timeout", description: "Upstream server timeout", category: "server" }
  ]

  const errorExamples = [
    {
      title: "Authentication Error",
      code: 401,
      example: `{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required",
    "details": {
      "reason": "Missing Authorization header"
    }
  }
}`
    },
    {
      title: "Validation Error",
      code: 422,
      example: `{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "errors": [
        {
          "field": "email",
          "reason": "Invalid email format"
        }
      ]
    }
  }
}`
    },
    {
      title: "Rate Limit Error",
      code: 429,
      example: `{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "details": {
      "limit": 1000,
      "remaining": 0,
      "reset": 1628607600
    }
  }
}`
    }
  ]

  return (
    <DocPage
      title="API Error Handling"
      description="Learn how to properly handle errors when working with the DevHunt API."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            Error Response Format
          </h2>
          
          <p>
            All DevHunt API errors follow a consistent JSON format to make error handling predictable and straightforward:
          </p>
          
          <Card>
            <CardContent className="pt-6">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Additional error-specific information
    }
  }
}`}</code>
              </pre>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>code</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Machine-readable error code
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>message</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Human-readable error description
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Additional context about the error
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Server className="h-6 w-6 text-primary" />
            HTTP Status Codes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  2xx Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>200 OK</span>
                    <Badge variant="secondary">Request successful</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>201 Created</span>
                    <Badge variant="secondary">Resource created</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>204 No Content</span>
                    <Badge variant="secondary">No content to return</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-yellow-500" />
                  4xx Client Errors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>400 Bad Request</span>
                    <Badge variant="outline">Invalid parameters</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>401 Unauthorized</span>
                    <Badge variant="outline">Auth required</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>404 Not Found</span>
                    <Badge variant="outline">Resource missing</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>429 Too Many</span>
                    <Badge variant="outline">Rate limit</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  5xx Server Errors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>500 Internal Error</span>
                    <Badge variant="destructive">Server error</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>503 Unavailable</span>
                    <Badge variant="destructive">Service down</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Common Error Types</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {errorExamples.map((error, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{error.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="destructive" className="mb-4">{error.code}</Badge>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                    <code>{error.example}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            Implementation Examples
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  JavaScript/Fetch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                  <code>{`async function handleApiRequest(url) {
  try {
    const response = await fetch(url, {
      headers: { 'Authorization': \`Bearer \${apiKey}\` }
    });

    if (response.ok) return await response.json();

    const errorData = await response.json();
    throw new Error(errorData.error.message);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error');
    }
    throw error;
  }
}`}</code>
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Python/Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                  <code>{`import requests

def handle_api_request(url):
    try:
        response = requests.get(url, headers={
            'Authorization': f'Bearer {api_key}'
        })
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise Exception(f"API Error: {str(e)}")`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Robust Error Handling</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Always check response status before parsing JSON</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Provide user-friendly error messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Log technical details for debugging</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Graceful Degradation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Implement fallback mechanisms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Cache data for offline access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Retry failed requests with exponential backoff</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DocPage>
  )
}