import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Globe,
  Shield,
  Zap
} from "lucide-react"

export default function DeploymentPage() {
  const deploymentSections = [
    {
      id: "hosting",
      title: "Hosting Platform",
      icon: <Globe className="h-5 w-5" />,
      content: `
DevHunt is hosted on Vercel, which provides:

- Global CDN for content delivery
- Automatic SSL certificates
- Serverless function deployment
- Edge network optimization
- Built-in CI/CD pipeline
- Analytics and monitoring

Deployment is triggered automatically on every push to the main branch. 
Vercel's preview deployments are used for pull requests to allow 
testing of changes before merging.
`
    },
    {
      id: "pipeline",
      title: "CI/CD Pipeline",
      icon: <Zap className="h-5 w-5" />,
      content: `
Our CI/CD pipeline includes the following steps:

1. Code is pushed to GitHub
2. GitHub Actions workflow is triggered
3. Dependencies are installed
4. Linting and type checking are performed
5. Tests are run (unit, integration, and E2E)
6. Code is built for production
7. Deployment to Vercel is initiated
8. Health checks are performed
9. Monitoring is set up for the new deployment

The pipeline is configured in .github/workflows/deploy.yml
`
    },
    {
      id: "monitoring",
      title: "Monitoring and Observability",
      icon: <Shield className="h-5 w-5" />,
      content: `
We use several tools for monitoring the application:

- Vercel Analytics for web vitals and performance
- Sentry for error tracking and reporting
- Custom logging for debugging and auditing
- Uptime monitoring to ensure service availability
- Performance budgets to prevent regressions

Alerts are configured for critical issues such as:
- High error rates
- Performance degradation
- Downtime
- Resource exhaustion
`
    }
  ]

  return (
    <DocPage
      title="Deployment Process"
      description="Learn about how DevHunt is deployed and monitored in production."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            DevHunt uses a modern deployment process with automated CI/CD pipelines 
            and cloud infrastructure to ensure reliable and scalable delivery of 
            the platform to users.
          </p>
        </section>

        <div className="space-y-12">
          {deploymentSections.map((section) => (
            <section key={section.id} className="space-y-6">
              <div className="flex items-center gap-3">
                {section.icon}
                <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <pre className="whitespace-pre-wrap text-sm">
                    {section.content}
                  </pre>
                </CardContent>
              </Card>
            </section>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Environment Variables</h2>
          <p>
            Different environments use different configuration files:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>.env.local - Local development</li>
            <li>.env.development - Development environment</li>
            <li>.env.production - Production environment</li>
            <li>.env.test - Testing environment</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Rollback Procedures</h2>
          <p>
            In case of issues with a deployment, we can quickly rollback to a 
            previous version using Vercels deployment history. This can be done 
            through the Vercel dashboard or CLI.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Scaling</h2>
          <p>
            The application automatically scales based on demand. Vercels 
            serverless functions scale automatically, and the MySQL database 
            can be scaled up as needed to handle increased load.
          </p>
        </section>
      </div>
    </DocPage>
  )
}