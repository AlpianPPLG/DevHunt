import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3,
  TrendingUp,
  Activity
} from "lucide-react"

export default function AnalyticsComponentsPage() {
  const components = [
    {
      name: "UserAnalyticsDashboard",
      description: "A dashboard component for displaying user analytics",
      props: [
        "analyticsData: Analytics data object"
      ],
      usage: `import { UserAnalyticsDashboard } from "@/components/analytics/user-analytics-dashboard"

<UserAnalyticsDashboard analyticsData={userAnalytics} />`
    },
    {
      name: "AnalyticsTab",
      description: "A tab component for analytics data",
      props: [
        "data: Analytics data",
        "timeRange: 7d | 30d | 90d"
      ],
      usage: `import { AnalyticsTab } from "@/components/analytics/analytics-tab"

<AnalyticsTab data={analyticsData} timeRange="30d" />`
    },
    {
      name: "AnalyticsFilter",
      description: "A filter component for analytics data",
      props: [
        "filters: Filter object",
        "onFilterChange: function"
      ],
      usage: `import { AnalyticsFilter } from "@/components/analytics/analytics-filter"

<AnalyticsFilter filters={filters} onFilterChange={handleFilterChange} />`
    }
  ]

  return (
    <DocPage
      title="Analytics Components"
      description="Components for displaying and interacting with analytics data."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            Analytics components provide visualizations and interactive elements for 
            displaying performance metrics and user engagement data. These components 
            integrate with the analytics system to present data in a clear and actionable format.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Available Components
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {components.map((component, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{component.name}</span>
                    <Badge variant="secondary">Analytics</Badge>
                  </CardTitle>
                  <p className="text-muted-foreground">{component.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Props:</h3>
                    <ul className="grid grid-cols-1 gap-2">
                      {component.props.map((prop, propIndex) => (
                        <li key={propIndex} className="text-sm bg-muted p-2 rounded">
                          {prop}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Usage:</h3>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{component.usage}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Data Visualization
          </h2>
          <p>
            Analytics components use charting libraries to create visual representations 
            of data. The components are designed to be responsive and accessible, 
            ensuring that data is presented clearly on all devices.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            Real-time Updates
          </h2>
          <p>
            Analytics components can be configured to update in real-time, providing 
            up-to-date information about product performance and user engagement. 
            This is particularly useful for monitoring during product launches or 
            marketing campaigns.
          </p>
        </section>
      </div>
    </DocPage>
  )
}