import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Database, 
  Code, 
  Server, 
  FileCode, 
  Bug, 
  GitBranch,
  Terminal,
  Cpu
} from "lucide-react"

export default function InstallationPage() {
  return (
    <DocPage
      title="Installation Guide"
      description="Set up DevHunt locally for development or self-hosting."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Cpu className="h-6 w-6 text-primary" />
            Prerequisites
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Required Software
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Node.js 18+</span>
                    <Badge variant="secondary">JavaScript runtime</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>MySQL 8.0+</span>
                    <Badge variant="secondary">Database</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>npm or yarn</span>
                    <Badge variant="secondary">Package manager</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Git</span>
                    <Badge variant="secondary">Version control</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  Recommended Software
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>VS Code</span>
                    <Badge variant="outline">Code editor</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>MySQL Workbench</span>
                    <Badge variant="outline">Database tool</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Postman</span>
                    <Badge variant="outline">API testing</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Installation Steps</h2>
          
          <div className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-primary" />
                  1. Clone the Repository
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`git clone https://github.com/devhunt/devhunt.git
cd devhunt`}</code>
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  2. Install Dependencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Using npm:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
                  <code>npm install</code>
                </pre>
                
                <p className="mb-4">Using yarn:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
                  <code>yarn install</code>
                </pre>
                
                <p className="mb-4">Using pnpm:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>pnpm install</code>
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  3. Database Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">Create Database</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
                  <code>CREATE DATABASE devhunt_db;</code>
                </pre>
                
                <h3 className="font-medium mb-2">Run Database Migrations</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
                  <code>{`# Run the enhanced database migration
mysql -u your_username -p devhunt_db &lt; src/scripts/03-enhanced-schema.sql

# Run the analytics schema migration
mysql -u your_username -p devhunt_db &lt; src/scripts/04-analytics-schema.sql

# Add downvote support
mysql -u your_username -p devhunt_db &lt; src/scripts/05-add-downvote.sql`}</code>
                </pre>
                
                <h3 className="font-medium mb-2">Seed Initial Data (Optional)</h3>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>mysql -u your_username -p devhunt_db &lt; src/scripts/02-seed-data.sql</code>
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  4. Environment Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Create a <code>.env.local</code> file in the root directory:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`# Database Configuration
DATABASE_URL=mysql://username:password@localhost:3306/devhunt_db

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Optional: SMTP Configuration for Contact Form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional: Analytics Configuration
ANALYTICS_ENABLED=true
ANALYTICS_DEBOUNCE_MS=1000`}</code>
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  5. Run Development Server
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Using npm:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
                  <code>{`npm run dev`}</code>
                </pre>
                
                <p className="mb-4">Using yarn:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
                  <code>{`yarn dev`}</code>
                </pre>
                
                <p className="mb-4">Using pnpm:</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
                  <code>{`pnpm dev`}</code>
                </pre>
                
                <p>Visit <a href="http://localhost:3000" className="text-primary hover:underline">http://localhost:3000</a> to see your DevHunt instance running.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Project Structure</h2>
          
          <Card>
            <CardContent className="pt-6">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`devhunt/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/              # Utility functions and libraries
│   └── scripts/          # Database scripts
├── public/               # Static assets
├── styles/               # Global styles
├── .env.local            # Environment variables
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies`}</code>
              </pre>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Bug className="h-6 w-6 text-primary" />
            Troubleshooting
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">Database Connection Errors</h3>
                <ul className="space-y-2 text-sm">
                  <li>1. Verify your <code>DATABASE_URL</code> in <code>.env.local</code></li>
                  <li>2. Ensure MySQL is running</li>
                  <li>3. Check that the database exists and is accessible</li>
                </ul>
                
                <h3 className="font-medium mt-4 mb-2">Environment Variables Not Loading</h3>
                <ul className="space-y-2 text-sm">
                  <li>1. Ensure youre using <code>.env.local</code> (not <code>.env</code>)</li>
                  <li>2. Restart your development server after changing environment variables</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Use image optimization through Next.js Image component</li>
                  <li>• Implement proper caching strategies</li>
                  <li>• Optimize database queries with indexes</li>
                  <li>• Minimize bundle size with code splitting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
          <p>
            After completing the installation, consider:
          </p>
          <ul className="space-y-2 ml-4 list-disc list-inside">
            <li>Reading our <a href="/docs/development/architecture" className="text-primary hover:underline">Architecture Guide</a> to understand the codebase</li>
            <li>Exploring the <a href="/docs/development/contributing" className="text-primary hover:underline">Contributing Guide</a> if you want to contribute</li>
            <li>Checking out our <a href="/docs/development/testing" className="text-primary hover:underline">Testing Guide</a> to run tests</li>
            <li>Reviewing the <a href="/docs/development/deployment" className="text-primary hover:underline">Deployment Guide</a> for production deployment</li>
          </ul>
        </section>
      </div>
    </DocPage>
  )
}