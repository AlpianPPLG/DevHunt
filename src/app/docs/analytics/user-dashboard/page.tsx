import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent } from "@/components/ui/card"
import { 
  LayoutDashboard,
  BarChart,
  TrendingUp,
  Calendar,
  Users
} from "lucide-react"

export default function UserDashboardPage() {
  const dashboardSections = [
    {
      id: "overview",
      title: "Overview Section",
      icon: <LayoutDashboard className="h-5 w-5" />,
      content: `
The overview section provides a snapshot of your performance metrics:

- Total products submitted
- Cumulative votes, comments, and views received
- Engagement rate
- Performance score
- Recent activity timeline

This section gives you a quick glance at how your contributions are performing 
on the platform and how you're trending over time.
`
    },
    {
      id: "charts",
      title: "Performance Charts",
      icon: <BarChart className="h-5 w-5" />,
      content: `
Performance charts visualize your metrics over time:

- View trends over time
- Engagement metrics comparison
- Click-through rate analysis
- Performance score history

These charts help you identify patterns in your performance and understand 
what factors contribute to successful products.
`
    },
    {
      id: "rankings",
      title: "Product Rankings",
      icon: <TrendingUp className="h-5 w-5" />,
      content: `
Product rankings show how your tools compare to others:

- Top performing products table
- Performance score distribution
- Growth rate indicators
- Comparative analysis

This section helps you understand which of your products are resonating 
most with the community and why.
`
    }
  ]

  return (
    <DocPage
      title="User Analytics Dashboard"
      description="Learn how to use the analytics dashboard to track your performance on DevHunt."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            The user analytics dashboard provides comprehensive insights into your 
            performance as a contributor to DevHunt. This dashboard helps you 
            understand how your submitted tools are performing and how you can 
            improve your engagement with the community.
          </p>
        </section>

        <div className="space-y-12">
          {dashboardSections.map((section) => (
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
            <Calendar className="h-6 w-6 text-primary" />
            Date Range Selection
          </h2>
          <p>
            You can filter all dashboard data by specific date ranges:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Last 7 days</li>
            <li>Last 30 days</li>
            <li>Last 90 days</li>
            <li>Year to date</li>
            <li>Custom range</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Comparative Analysis
          </h2>
          <p>
            The dashboard allows you to compare your performance against platform 
            averages and top performers. This helps you understand where you stand 
            in the community and identify areas for improvement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Exporting Data</h2>
          <p>
            You can export your analytics data in multiple formats:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>CSV for spreadsheet analysis</li>
            <li>Excel for detailed reporting</li>
            <li>PDF for sharing with others</li>
            <li>JSON for programmatic use</li>
          </ul>
        </section>
      </div>
    </DocPage>
  )
}