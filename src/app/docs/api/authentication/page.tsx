import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Key, 
  Shield, 
  Lock, 
  AlertCircle, 
  RefreshCw,
  Code,
  Terminal
} from "lucide-react"

export default function APIAuthenticationPage() {
  return (
    <DocPage
      title="API Authentication"
      description="Learn how to authenticate with the DevHunt API to access protected resources."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            Authentication Methods
          </h2>
          
          <p>
            DevHunt API uses API key-based authentication to secure access to its endpoints. 
            All requests to protected endpoints must include a valid API key.
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                API Key Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                API keys are the primary method for authenticating with the DevHunt API. 
                Each key is associated with a user account and has specific permissions.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Getting Your API Key</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generating a New API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 ml-4 list-decimal list-inside">
                  <li>Log in to your DevHunt account</li>
                  <li>Navigate to your profile settings</li>
                  <li>Go to the API Keys section</li>
                  <li>Click Generate New Key</li>
                  <li>Give your key a descriptive name (e.g., My App Production)</li>
                  <li>Select the appropriate permissions</li>
                  <li>Click Create Key</li>
                  <li>Copy and securely store your API key</li>
                </ol>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Read Only</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access to GET endpoints only
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Read/Write</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Full access to all endpoints
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Submit Only</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Permission to submit new tools only
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Security Best Practices
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Protecting Your API Keys</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Never commit API keys to version control systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Use environment variables to store keys</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Rotate keys periodically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Use different keys for different applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Revoke compromised keys immediately</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Environment Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Store your API keys in environment variables:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs mb-4">
                  <code>{`# .env file
DEVHUNT_API_KEY=sk_1234567890abcdef`}</code>
                </pre>
                
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs mb-4">
                  <code>{`// JavaScript example
const apiKey = process.env.DEVHUNT_API_KEY;`}</code>
                </pre>
                
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                  <code>{`# Python example
import os
api_key = os.environ.get('DEVHUNT_API_KEY')`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Making Authenticated Requests</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Request Headers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Include your API key in the <code>Authorization</code> header using the Bearer scheme:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>Authorization: Bearer YOUR_API_KEY</code>
              </pre>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  cURL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                  <code>{`curl -X GET "https://api.devhunt.io/v1/tools" \\
  -H "Authorization: Bearer sk_1234567890abcdef"`}</code>
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  JavaScript/Fetch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                  <code>{`const response = await fetch('https://api.devhunt.io/v1/tools', {
  headers: {
    'Authorization': 'Bearer sk_1234567890abcdef'
  }
});`}</code>
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

headers = {
    'Authorization': 'Bearer sk_1234567890abcdef'
}

response = requests.get('https://api.devhunt.io/v1/tools', headers=headers)`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-primary" />
            Authentication Response Codes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Successful Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary">200</Badge>
                    <span>OK: Request successful with valid authentication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary">201</Badge>
                    <span>Created: Resource created successfully</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Authentication Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Badge variant="destructive">401</Badge>
                    <span>Unauthorized: Missing or invalid API key</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="destructive">403</Badge>
                    <span>Forbidden: Valid key but insufficient permissions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="destructive">429</Badge>
                    <span>Too Many Requests: Rate limit exceeded</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Error Response Example</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid API key provided"
  }
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <RefreshCw className="h-6 w-6 text-primary" />
            Key Management
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Each API key includes metadata to help you manage access:</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• <strong>Name</strong>: Descriptive name for the key</li>
                  <li>• <strong>Created</strong>: Date and time the key was created</li>
                  <li>• <strong>Last Used</strong>: Date and time the key was last used</li>
                  <li>• <strong>Permissions</strong>: Access level granted to the key</li>
                  <li>• <strong>Status</strong>: Active or revoked</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revoking Keys</CardTitle>
              </CardHeader>
              <CardContent>
                <p>To revoke an API key:</p>
                <ol className="mt-2 space-y-1 text-sm ml-4 list-decimal list-inside">
                  <li>Go to your API Keys dashboard</li>
                  <li>Find the key you want to revoke</li>
                  <li>Click the Revoke button</li>
                  <li>Confirm the revocation</li>
                </ol>
                <p className="mt-2 text-sm text-muted-foreground">
                  Revoked keys immediately lose access to the API.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
          <p>
            After setting up authentication, explore our <a href="/docs/api/endpoints" className="text-primary hover:underline">API Endpoints Reference</a> 
            to learn how to use the various API methods. For implementation examples and best practices, 
            see our <a href="/docs/guides/api" className="text-primary hover:underline">API Guide</a>.
          </p>
        </section>
      </div>
    </DocPage>
  )
}