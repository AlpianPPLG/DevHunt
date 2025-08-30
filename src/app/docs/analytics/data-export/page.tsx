import { DocPage } from "@/components/docs/doc-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  FileSpreadsheet,
  FileJson,
  FileBarChart,
  Settings
} from "lucide-react"

export default function DataExportPage() {
  const exportFormats = [
    {
      id: "csv",
      title: "CSV Export",
      icon: <FileSpreadsheet className="h-5 w-5" />,
      description: "Comma-separated values for spreadsheet analysis",
      content: `
CSV export is ideal for importing data into spreadsheet applications like 
Excel or Google Sheets. This format is perfect for detailed analysis and 
creating custom reports.

Features:
- All analytics data in a tabular format
- Compatible with all spreadsheet applications
- Easy to manipulate and analyze
- Lightweight file size
`
    },
    {
      id: "excel",
      title: "Excel Export",
      icon: <FileBarChart className="h-5 w-5" />,
      description: "XLSX format with multiple sheets",
      content: `
Excel export provides a more structured approach to data analysis with 
multiple sheets organized by data type. This format includes pre-built 
charts and formatting for easier interpretation.

Features:
- Multiple sheets for different data types
- Pre-built charts and visualizations
- Formatted for professional presentation
- Compatible with Microsoft Excel and similar applications
`
    },
    {
      id: "json",
      title: "JSON Export",
      icon: <FileJson className="h-5 w-5" />,
      description: "Raw data export for programmatic use",
      content: `
JSON export provides raw data in a structured format that's easy to 
parse and use in custom applications or scripts. This format is ideal 
for developers who want to build their own analytics tools or integrate 
DevHunt data with other systems.

Features:
- Machine-readable structured data
- Easy to parse in any programming language
- Complete data set without aggregation
- Ideal for custom analysis tools
`
    }
  ]

  return (
    <DocPage
      title="Data Export"
      description="Learn how to export your analytics data from DevHunt."
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <p>
            DevHunt provides multiple options for exporting your analytics data, 
            allowing you to analyze your performance metrics in the tools youre 
            most comfortable with. Whether you prefer spreadsheets, custom 
            applications, or professional reporting tools, we have an export 
            format that works for you.
          </p>
        </section>

        <div className="space-y-12">
          {exportFormats.map((format) => (
            <section key={format.id} className="space-y-6">
              <div className="flex items-center gap-3">
                {format.icon}
                <h2 className="text-2xl font-bold tracking-tight">{format.title}</h2>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>{format.description}</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm">
                    {format.content}
                  </pre>
                </CardContent>
              </Card>
            </section>
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            Export Options
          </h2>
          <p>
            When exporting data, you have several options to customize your export:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Date range selection</li>
            <li>Metric filtering</li>
            <li>Data aggregation levels</li>
            <li>Custom report templates</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Scheduling Exports</h2>
          <p>
            For regular analysis, you can schedule automated exports to be 
            delivered to your email or cloud storage account. This ensures 
            you always have the latest data without manual intervention.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Data Privacy</h2>
          <p>
            All exported data is subject to the same privacy protections as 
            data viewed in the dashboard. We never include personally 
            identifiable information in exports unless explicitly requested 
            and authorized.
          </p>
        </section>
      </div>
    </DocPage>
  )
}