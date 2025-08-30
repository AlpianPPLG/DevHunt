import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Building,
  Monitor,
  Server,
  Database,
  Shield,
  Globe,
  Zap,
  TestTube
} from "lucide-react"

export default function ArchitecturePage() {
  const architectureSections = [
    {
      id: "frontend",
      title: "Frontend Architecture",
      icon: <Monitor className="h-5 w-5" />,
      content: `
DevHunt uses Next.js 15.5.2 with the App Router for modern React development:

\`\`\`
src/app/
├── layout.tsx          # Root layout
├── page.tsx            # Homepage
├── api/                # API routes
│   ├── auth/
│   ├── products/
│   ├── users/
│   └── ...
├── [dynamic]/          # Dynamic routes
│   ├── product/[id]/
│   ├── user/[username]/
│   └── ...
└── ...                 # Other pages
\`\`\`

Components are organized by functionality:

\`\`\`
src/components/
├── ui/                 # Base UI components
├── layout/             # Layout components
├── product/            # Product-related components
├── comments/           # Comment system components
├── analytics/          # Analytics components
├── auth/               # Authentication components
├── collections/        # Collection components
├── profile/            # User profile components
└── user/               # User interaction components
\`\`\`

State Management:
- React Context: For global state like authentication and theme
- React Hooks: For local component state
- Server Components: For data fetching where possible
- Client Components: For interactive features requiring state

Styling:
- Tailwind CSS: Utility-first CSS framework
- CSS Modules: For component-specific styles
- PostCSS: For CSS processing
- next/font: For optimized font loading
`
    },
    {
      id: "backend",
      title: "Backend Architecture",
      icon: <Server className="h-5 w-5" />,
      content: `
The backend is implemented using Next.js API routes:

\`\`\`
src/app/api/
├── auth/               # Authentication endpoints
│   ├── login/
│   ├── register/
│   ├── logout/
│   └── me/
├── products/           # Product management
│   ├── [id]/
│   │   ├── vote/
│   │   ├── comments/
│   │   └── media/
│   └── submit/
├── users/              # User management
│   └── [username]/
├── collections/        # Collection management
├── tags/               # Tag management
├── analytics/          # Analytics tracking
└── images/proxy/       # Image proxy service
\`\`\`

Middleware:
- Custom middleware for authentication, rate limiting, and security
- Authentication utilities in src/lib/auth.ts

Business Logic:
- Organized in service layers in src/lib/
- Database connection and queries in src/lib/database.ts
- Utility functions in src/lib/utils.ts
- Custom React hooks in src/lib/hooks/
`
    },
    {
      id: "database",
      title: "Database Architecture",
      icon: <Database className="h-5 w-5" />,
      content: `
The database uses MySQL 8.0+ with the following main tables:

\`\`\`
Database: devhunt_db

Core Tables:
├── users               # User accounts and profiles
├── products            # Developer tools and products
├── product_media       # Media associated with products
├── tags                # Tag taxonomy
├── product_tags        # Many-to-many relationship
├── votes               # User voting system
├── comments            # Comment system
├── collections         # User-created collections
├── collection_products # Collection contents
├── user_follows        # User following relationships

Analytics Tables:
├── product_views       # Product view tracking
├── product_clicks      # Product click tracking
├── user_activity_log   # User activity logging
├── analytics_summary   # Daily aggregated analytics
└── product_performance # Cached performance metrics
\`\`\`

Database Design Principles:
- Normalization: Properly normalized tables to reduce redundancy
- Indexing: Strategic indexes for performance
- Foreign Keys: Referential integrity constraints
- Data Types: Appropriate data types for each field
- Constraints: Data validation at the database level
`
    }
  ]

  return (
    <DocPage
      title="System Architecture"
      description="Overview of the DevHunt system architecture and technical design."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            DevHunt follows a modern web application architecture built with Next.js, 
            utilizing a monolithic structure with clear separation of concerns between 
            frontend and backend components.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Building className="h-6 w-6 text-primary" />
            High-Level Architecture
          </h2>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm">
              {`┌─────────────────────────────────────────────────────────────┐
│                    Client Applications                      │
├─────────────────────────────────────────────────────────────┤
│                        Next.js App                          │
│  ┌─────────────┐    ┌────────────────────────────────────┐ │
│  │   Frontend  │    │             Backend                │ │
│  │             │    │                                    │ │
│  │  React      │    │  Next.js API Routes                │ │
│  │  TypeScript │    │  Authentication                    │ │
│  │  Tailwind   │    │  Business Logic                    │ │
│  │  Components │    │                                    │ │
│  └─────────────┘    └────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                     MySQL Database                     │ │
│  │                                                        │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │ │
│  │  │   Users     │  │  Products   │  │   Analytics     │ │ │
│  │  │             │  │             │  │                 │ │ │
│  │  │             │  │             │  │                 │ │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
        </section>

        <div className="space-y-12">
          {architectureSections.map((section) => (
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
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Security Architecture
          </h2>
          <p>
            DevHunt implements multiple layers of security to protect user data and 
            ensure platform integrity. This includes authentication with JWT, 
            password hashing with bcryptjs, and input validation at both client 
            and server levels.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            API Architecture
          </h2>
          <p>
            The API follows RESTful design principles with resource-based URLs, 
            standard HTTP methods, and proper status codes. Versioning is handled 
            through URL paths, and rate limiting is implemented to ensure fair usage.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            Performance Architecture
          </h2>
          <p>
            Performance optimization strategies include caching at multiple levels, 
            image optimization with Next.js Image component, code splitting with 
            dynamic imports, and database query optimization.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <TestTube className="h-6 w-6 text-primary" />
            Testing Architecture
          </h2>
          <p>
            The testing strategy includes unit tests with Jest and React Testing Library, 
            integration tests for API routes and database operations, and end-to-end 
            tests with Cypress. Tests are organized by component type and run 
            automatically in the CI/CD pipeline.
          </p>
        </section>
      </div>
    </DocPage>
  )
}