import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent } from "@/components/ui/card"
import { 
  BarChart3,
  Database,
  Zap,
  Shield,
  TrendingUp,
  Target
} from "lucide-react"

export default function AnalyticsOverviewPage() {
  const analyticsSections = [
    {
      id: "purpose",
      title: "System Purpose",
      icon: <Target className="h-5 w-5" />,
      content: `
The DevHunt analytics system provides valuable insights into product performance, 
user engagement, and platform growth. It helps tool creators understand how their 
submissions are performing and enables data-driven decisions for improving content 
and engagement strategies.
`
    },
    {
      id: "architecture",
      title: "System Architecture",
      icon: <Database className="h-5 w-5" />,
      content: `
High-Level Architecture:
┌─────────────────────────────────────────────────────────────┐
│                    Data Collection Layer                    │
├─────────────────────────────────────────────────────────────┤
│  Frontend Tracking  │  API Endpoints  │  Background Jobs    │
│                     │                 │                     │
│  - View Tracking    │  - View Counts  │  - Data Aggregation │
│  - Click Tracking   │  - Vote Stats   │  - Report Generation│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Processing Layer                        │
├─────────────────────────────────────────────────────────────┤
│  Real-time Processing  │  Batch Processing                  │
│                        │                                    │
│  - Immediate Updates   │  - Daily Aggregations              │
│  - Event Queuing       │  - Performance Scoring             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Storage Layer                          │
├─────────────────────────────────────────────────────────────┤
│  MySQL Database        │  Redis Cache      │  Data Warehouse │
│                        │                   │                 │
│  - Raw Event Data      │  - Session Data   │  - Historical   │
│  - Aggregated Metrics  │  - User State     │  - Trends       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Presentation Layer                     │
├─────────────────────────────────────────────────────────────┤
│  API Endpoints  │  Dashboard UI  │  Export Functions         │
│                 │                │                           │
│  - REST API     │  - Charts      │  - CSV/Excel              │
│  - GraphQL      │  - Tables      │  - JSON                   │
└─────────────────────────────────────────────────────────────┘
`
    },
    {
      id: "metrics",
      title: "Key Metrics",
      icon: <TrendingUp className="h-5 w-5" />,
      content: `
Product Performance Metrics:
- Total Views: Cumulative view count for a product
- Unique Views: Number of unique viewers
- Daily Views: Views per day trend
- View Sources: Referral sources for views
- Click-through Rate: Clicks divided by views
- Engagement Rate: (Votes + Comments) / Views
- Time on Page: Average time spent viewing product
- Scroll Depth: How far users scroll on product page

User Performance Metrics:
- Total Products: Number of products submitted
- Total Votes Received: Cumulative votes across all products
- Total Comments Received: Cumulative comments across all products
- Total Views Received: Cumulative views across all products
- Engagement Rate: Overall user engagement level
- Performance Score: Composite score based on all metrics
`
    }
  ]

  return (
    <DocPage
      title="Analytics System Overview"
      description="Comprehensive overview of the DevHunt analytics system for tracking product performance and user engagement."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            The DevHunt analytics system provides powerful insights into product performance 
            and user engagement while maintaining privacy and performance standards. This 
            comprehensive system enables both individual creators and platform administrators 
            to make data-driven decisions for improving the DevHunt experience.
          </p>
        </section>

        <div className="space-y-12">
          {analyticsSections.map((section) => (
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
            <Zap className="h-6 w-6 text-primary" />
            Tracking Implementation
          </h2>
          <p>
            Analytics tracking is implemented through a combination of frontend tracking 
            and backend processing. Frontend components automatically track user interactions, 
            while backend services process and aggregate this data for analysis.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Dashboard Features
          </h2>
          <p>
            The analytics dashboard provides comprehensive visualization of performance 
            metrics through interactive charts, tables, and reports. Users can filter 
            data by date range, product, or other dimensions to gain specific insights.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Privacy and Compliance
          </h2>
          <p>
            The analytics system is designed with privacy in mind. All data is anonymized 
            for non-authenticated users, and we comply with GDPR and other privacy 
            regulations. Users can request deletion of their data at any time.
          </p>
        </section>
      </div>
    </DocPage>
  )
}