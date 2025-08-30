import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Gauge, 
  Clock, 
  AlertTriangle, 
  Cpu, 
  BarChart3,
  TrendingUp,
  Shield
} from "lucide-react"

export default function APIRateLimitsPage() {
  return (
    <DocPage
      title="API Rate Limits"
      description="Understand DevHunt's API rate limiting policies and how to work within them effectively."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Gauge className="h-6 w-6 text-primary" />
            Rate Limiting Overview
          </h2>
          
          <p>
            To ensure fair usage and maintain service quality for all users, the DevHunt API implements rate limiting. 
            These limits prevent any single user or application from overwhelming our servers and degrading the experience for others.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Rate Limit Tiers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">Free</Badge>
                  Free Tier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Daily Limit</span>
                    <Badge variant="outline">1,000 requests</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Hourly Limit</span>
                    <Badge variant="outline">100 requests</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Best For</span>
                    <Badge variant="outline">Individual developers</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Premium</Badge>
                  Premium Tier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Daily Limit</span>
                    <Badge variant="outline">10,000 requests</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Hourly Limit</span>
                    <Badge variant="outline">1,000 requests</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Best For</span>
                    <Badge variant="outline">Production applications</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            How Rate Limits Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Windows</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Hourly Window: Resets every hour on the hour</li>
                  <li>• Daily Window: Resets every day at midnight UTC</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Request Counting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• All authenticated requests count toward your limits</li>
                  <li>• Failed requests still count</li>
                  <li>• Successful and redirected requests both count</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Per-Key Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Each API key has its own rate limit bucket</li>
                  <li>• Limits are not shared across keys</li>
                  <li>• Create multiple keys for different purposes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Rate Limit Headers</h2>
          
          <p>
            Every API response includes headers that provide information about your current rate limit status:
          </p>
          
          <Card>
            <CardContent className="pt-6">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 986
X-RateLimit-Reset: 1628607246`}</code>
              </pre>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>X-RateLimit-Limit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The maximum number of requests allowed in the current window.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>X-RateLimit-Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The number of requests remaining in the current window.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>X-RateLimit-Reset</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The Unix timestamp (in seconds) when the current window resets.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Example Header Values</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
                <code>{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 750
X-RateLimit-Reset: 1628607600`}</code>
              </pre>
              <p className="text-sm text-muted-foreground">
                This means:
              </p>
              <ul className="mt-2 text-sm text-muted-foreground">
                <li>• Your limit is 1,000 requests per day</li>
                <li>• You have 750 requests remaining</li>
                <li>• Your limit will reset at Unix timestamp 1628607600</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            Rate Limit Responses
          </h2>
          
          <p>
            When you exceed your rate limit, the API returns a 429 Too Many Requests status code:
          </p>
          
          <Card>
            <CardContent className="pt-6">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "details": {
      "limit": 1000,
      "remaining": 0,
      "reset": 1628607600
    }
  }
}`}</code>
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Cpu className="h-6 w-6 text-primary" />
            Handling Rate Limits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Client-Side Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Check headers before requests</li>
                  <li>• Implement exponential backoff</li>
                  <li>• Use caching to reduce API calls</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Server-Side Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Request batching</li>
                  <li>• Efficient pagination</li>
                  <li>• Connection pooling</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Monitoring Usage
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track your API usage through the DevHunt dashboard:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• View requests per hour/day</li>
                  <li>• See which endpoints you use most</li>
                  <li>• Monitor your rate limit consumption</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Programmatic Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Check your usage programmatically:
                </p>
                <pre className="bg-muted p-2 rounded-md overflow-x-auto text-xs">
                  <code>{`const limit = response.headers.get('X-RateLimit-Limit');
const remaining = response.headers.get('X-RateLimit-Remaining');`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Upgrading Your Tier
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>When to Upgrade</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Consistently hit rate limits</li>
                  <li>• Run production applications</li>
                  <li>• Need higher reliability</li>
                  <li>• Want priority support</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Premium Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• 10x higher rate limits</li>
                  <li>• Priority API access</li>
                  <li>• Enhanced support options</li>
                  <li>• Additional API features</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Abuse Prevention
          </h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Detection Mechanisms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">We monitor for abusive patterns including:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Excessive requests</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Automated scraping</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Failed auth attempts</Badge>
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="secondary">Unusual patterns</Badge>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </DocPage>
  )
}