import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Eye,
  MousePointerClick,
  Map,
  Globe,
  BarChart3,
  Clock
} from "lucide-react"

export default function ProductTrackingPage() {
  const trackingSections = [
    {
      id: "traffic",
      title: "Traffic Analysis",
      icon: <Eye className="h-5 w-5" />,
      content: `
Traffic analysis provides insights into how users discover and view your products:

- View count trends
- Unique visitor statistics
- Traffic sources breakdown
- Geographic distribution
- Device type analysis
- Browser and OS information

Understanding where your traffic comes from helps you optimize your marketing 
efforts and improve discoverability.
`
    },
    {
      id: "engagement",
      title: "Engagement Analysis",
      icon: <MousePointerClick className="h-5 w-5" />,
      content: `
Engagement analysis tracks how users interact with your products:

- Click maps for interactive elements
- Comment sentiment analysis
- Vote distribution
- Time-on-page metrics
- Scroll depth tracking
- Bounce rate analysis

This data helps you understand what aspects of your product page are most 
effective at engaging users.
`
    },
    {
      id: "performance",
      title: "Performance Insights",
      icon: <BarChart3 className="h-5 w-5" />,
      content: `
Performance insights help you understand how your product is doing:

- Performance score breakdown
- Improvement recommendations
- Benchmark comparisons
- Trend analysis
- Competitor analysis
- Seasonal patterns

These insights provide actionable recommendations for improving your 
product's performance on the platform.
`
    }
  ]

  return (
    <DocPage
      title="Product Tracking"
      description="Detailed analytics for individual products on DevHunt."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            Product tracking provides detailed analytics for individual products, 
            helping you understand how each tool is performing and how users 
            interact with it. This data is crucial for optimizing your product 
            pages and improving engagement.
          </p>
        </section>

        <div className="space-y-12">
          {trackingSections.map((section) => (
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
            <Map className="h-6 w-6 text-primary" />
            Click Maps
          </h2>
          <p>
            Click maps visualize where users click on your product page, helping 
            you understand which elements attract the most attention and which 
            might be overlooked. This information can guide design improvements 
            and content placement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            Geographic Distribution
          </h2>
          <p>
            Geographic data shows where your products audience is located, 
            which can be valuable for localization efforts and understanding 
            market penetration in different regions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            Time-Based Analysis
          </h2>
          <p>
            Time-based analysis reveals patterns in user behavior, such as 
            when your product receives the most views or engagement. This 
            can help you time announcements and updates for maximum impact.
          </p>
        </section>
      </div>
    </DocPage>
  )
}