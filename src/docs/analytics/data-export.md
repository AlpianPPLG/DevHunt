# Data Export

Comprehensive guide to exporting analytics data from DevHunt.

## 📤 Export Overview

DevHunt provides multiple options for exporting analytics data, allowing users to analyze their performance metrics in external tools, share insights with stakeholders, or maintain backups of their data.

## 📁 Export Formats

### CSV (Comma-Separated Values)
The most widely supported format for data analysis:

**Features:**
- Compatible with Excel, Google Sheets, and other spreadsheet applications
- Easy to import into data analysis tools
- Lightweight file size
- Human-readable format

**Use Cases:**
- Quick data analysis in spreadsheets
- Importing into business intelligence tools
- Sharing data with non-technical stakeholders
- Creating custom reports

### Excel (XLSX)
Enhanced spreadsheet format with formatting capabilities:

**Features:**
- Multiple worksheets
- Cell formatting and styling
- Embedded charts and graphs
- Formula support
- Data validation

**Use Cases:**
- Professional reporting
- Data visualization
- Complex data analysis
- Sharing with business users

### JSON (JavaScript Object Notation)
Structured data format for developers and programmatic use:

**Features:**
- Machine-readable format
- Preserves data structure and relationships
- Easy to parse in programming languages
- Compact file size
- API-ready format

**Use Cases:**
- Integration with custom applications
- Data processing pipelines
- API development and testing
- Backup and migration

### PDF (Portable Document Format)
Print-ready format for sharing reports:

**Features:**
- Professional appearance
- Preserves formatting across platforms
- Password protection options
- Digital signature support
- Universal compatibility

**Use Cases:**
- Executive reporting
- Client presentations
- Archival purposes
- Compliance requirements

## 🎯 Export Options

### Time Range Selection
Choose specific date ranges for exported data:

**Predefined Ranges:**
- **Last 7 Days**: Recent performance snapshot
- **Last 30 Days**: Monthly performance trends
- **Last 90 Days**: Quarterly performance analysis
- **Year to Date**: Current year performance
- **All Time**: Complete historical data

**Custom Ranges:**
- Select specific start and end dates
- Flexible date selection
- Time zone consideration
- Recurring export scheduling

### Data Granularity
Control the level of detail in exported data:

**Summary Data:**
- Aggregated metrics
- Daily/weekly/monthly totals
- Key performance indicators
- Reduced file size

**Detailed Data:**
- Individual event records
- Timestamp-level precision
- Complete metadata
- Larger file size

### Metric Filtering
Select specific metrics to include in exports:

**Product Metrics:**
- View counts
- Vote counts
- Comment counts
- Click-through rates
- Performance scores

**User Metrics:**
- Submission counts
- Engagement rates
- Activity timelines
- Growth metrics

**Platform Metrics:**
- Traffic sources
- Device breakdowns
- Geographic distribution
- Referral analysis

## 🛠️ Export Implementation

### Frontend Export Components

#### Export Button Component
Reusable button for triggering exports:

```tsx
// components/analytics/export-button.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ExportButtonProps {
  productId?: string
  userId?: string
  timeRange: string
  onExport: (format: string) => Promise<void>
}

export function ExportButton({
  productId,
  userId,
  timeRange,
  onExport
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  
  const handleExport = async (format: string) => {
    setIsExporting(true)
    try {
      await onExport(format)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="export-button-group">
      <Button
        onClick={() => handleExport("csv")}
        disabled={isExporting}
        variant="outline"
      >
        <Download className="mr-2 h-4 w-4" />
        Export CSV
      </Button>
      
      <Button
        onClick={() => handleExport("xlsx")}
        disabled={isExporting}
        variant="outline"
      >
        <Download className="mr-2 h-4 w-4" />
        Export Excel
      </Button>
      
      <Button
        onClick={() => handleExport("json")}
        disabled={isExporting}
        variant="outline"
      >
        <Download className="mr-2 h-4 w-4" />
        Export JSON
      </Button>
    </div>
  )
}
```

#### Export Dialog Component
Advanced export configuration dialog:

```tsx
// components/analytics/export-dialog.tsx
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ExportDialogProps {
  onExport: (options: ExportOptions) => Promise<void>
}

interface ExportOptions {
  format: "csv" | "xlsx" | "json" | "pdf"
  startDate: string
  endDate: string
  metrics: string[]
  granularity: "summary" | "detailed"
}

export function ExportDialog({ onExport }: ExportDialogProps) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<ExportOptions>({
    format: "csv",
    startDate: "",
    endDate: "",
    metrics: ["views", "votes", "comments"],
    granularity: "summary"
  })

  const handleExport = async () => {
    await onExport(options)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Advanced Export</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Analytics Data</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="format" className="text-right">
              Format
            </Label>
            <RadioGroup
              value={options.format}
              onValueChange={(value) => 
                setOptions({...options, format: value as any})
              }
              className="col-span-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv">CSV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="xlsx" id="xlsx" />
                <Label htmlFor="xlsx">Excel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json">JSON</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf">PDF</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Date Range
            </Label>
            <div className="col-span-3 grid grid-cols-2 gap-2">
              <Input
                id="startDate"
                type="date"
                value={options.startDate}
                onChange={(e) => 
                  setOptions({...options, startDate: e.target.value})
                }
              />
              <Input
                id="endDate"
                type="date"
                value={options.endDate}
                onChange={(e) => 
                  setOptions({...options, endDate: e.target.value})
                }
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Metrics</Label>
            <div className="col-span-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="views" defaultChecked />
                <Label htmlFor="views">Views</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="votes" defaultChecked />
                <Label htmlFor="votes">Votes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="comments" defaultChecked />
                <Label htmlFor="comments">Comments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="clicks" />
                <Label htmlFor="clicks">Clicks</Label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Granularity</Label>
            <RadioGroup
              value={options.granularity}
              onValueChange={(value) => 
                setOptions({...options, granularity: value as any})
              }
              className="col-span-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="summary" id="summary" />
                <Label htmlFor="summary">Summary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="detailed" id="detailed" />
                <Label htmlFor="detailed">Detailed</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <Button onClick={handleExport}>Export Data</Button>
      </DialogContent>
    </Dialog>
  )
}
```

### Backend Export API

#### Export Endpoint
API route for handling export requests:

```ts
// app/api/export/route.ts
import { NextRequest } from "next/server"
import { exportAnalyticsData } from "@/lib/export"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { format, productId, userId, startDate, endDate, metrics, granularity } = body

    // Validate request parameters
    if (!format || !['csv', 'xlsx', 'json', 'pdf'].includes(format)) {
      return new Response(
        JSON.stringify({ error: "Invalid format specified" }),
        { status: 400 }
      )
    }

    // Generate export data
    const exportData = await exportAnalyticsData({
      format,
      productId,
      userId,
      startDate,
      endDate,
      metrics,
      granularity
    })

    // Set appropriate headers
    const headers = new Headers()
    headers.set('Content-Type', getContentType(format))
    headers.set('Content-Disposition', getContentDisposition(format))

    return new Response(exportData, {
      headers,
      status: 200
    })
  } catch (error) {
    console.error("Export error:", error)
    return new Response(
      JSON.stringify({ error: "Failed to generate export" }),
      { status: 500 }
    )
  }
}

function getContentType(format: string): string {
  const contentTypes: Record<string, string> = {
    csv: 'text/csv',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    json: 'application/json',
    pdf: 'application/pdf'
  }
  return contentTypes[format] || 'application/octet-stream'
}

function getContentDisposition(format: string): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
  return `attachment; filename="devhunt-analytics-${timestamp}.${format}"`
}
```

#### Data Export Utilities
Functions for generating export data in different formats:

```ts
// lib/export.ts
import { stringify } from 'csv-stringify/sync'
import ExcelJS from 'exceljs'
import { getAnalyticsData } from '@/lib/database'

interface ExportOptions {
  format: 'csv' | 'xlsx' | 'json' | 'pdf'
  productId?: string
  userId?: string
  startDate: string
  endDate: string
  metrics: string[]
  granularity: 'summary' | 'detailed'
}

export async function exportAnalyticsData(options: ExportOptions): Promise<Buffer | string> {
  // Fetch data from database
  const rawData = await getAnalyticsData({
    productId: options.productId,
    userId: options.userId,
    startDate: options.startDate,
    endDate: options.endDate,
    metrics: options.metrics,
    granularity: options.granularity
  })

  // Format data based on requested format
  switch (options.format) {
    case 'csv':
      return exportToCSV(rawData)
    case 'xlsx':
      return exportToExcel(rawData)
    case 'json':
      return exportToJSON(rawData)
    case 'pdf':
      return exportToPDF(rawData)
    default:
      throw new Error(`Unsupported format: ${options.format}`)
  }
}

function exportToCSV(data: any[]): string {
  return stringify(data, {
    header: true,
    columns: Object.keys(data[0] || {})
  })
}

async function exportToExcel(data: any[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Analytics Data')
  
  // Add headers
  if (data.length > 0) {
    worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key }))
  }
  
  // Add data
  worksheet.addRows(data)
  
  // Style the header row
  worksheet.getRow(1).font = { bold: true }
  
  // Auto-fit columns
  worksheet.columns.forEach(column => {
    column.width = 15
  })
  
  return await workbook.xlsx.writeBuffer() as Buffer
}

function exportToJSON(data: any[]): string {
  return JSON.stringify(data, null, 2)
}

async function exportToPDF(data: any[]): Promise<Buffer> {
  // PDF generation would typically use a library like pdfkit or puppeteer
  // This is a simplified example
  const pdfContent = `
DevHunt Analytics Export
Generated: ${new Date().toISOString()}

${JSON.stringify(data, null, 2)}
  `
  
  // In a real implementation, you would use a PDF library here
  return Buffer.from(pdfContent)
}
```

## 📋 Export Templates

### Standard Report Template
Predefined template for common export scenarios:

```ts
// lib/export/templates.ts
export const standardReportTemplate = {
  name: "Standard Analytics Report",
  description: "Comprehensive analytics report with key metrics",
  sections: [
    {
      name: "Overview",
      metrics: ["total_views", "total_votes", "total_comments", "engagement_rate"]
    },
    {
      name: "Trends",
      metrics: ["daily_views", "daily_votes", "daily_comments"],
      chart: "line"
    },
    {
      name: "Top Products",
      metrics: ["product_rankings"],
      chart: "bar"
    }
  ]
}
```

### Custom Report Builder
Tool for creating custom export templates:

```tsx
// components/analytics/report-builder.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReportBuilder() {
  const [sections, setSections] = useState([
    { id: 1, name: "Overview", metrics: [] }
  ])

  const addSection = () => {
    setSections([
      ...sections,
      { id: sections.length + 1, name: `Section ${sections.length + 1}`, metrics: [] }
    ])
  }

  const addMetric = (sectionId: number, metric: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, metrics: [...section.metrics, metric] }
        : section
    ))
  }

  return (
    <div className="space-y-4">
      {sections.map(section => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle>{section.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Metrics</Label>
              <Select onValueChange={(value) => addMetric(section.id, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Add metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="votes">Votes</SelectItem>
                  <SelectItem value="comments">Comments</SelectItem>
                  <SelectItem value="clicks">Clicks</SelectItem>
                  <SelectItem value="engagement_rate">Engagement Rate</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {section.metrics.map(metric => (
                  <span 
                    key={metric} 
                    className="bg-primary/10 text-primary px-2 py-1 rounded text-sm"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={addSection} variant="outline">
        Add Section
      </Button>
    </div>
  )
}
```

## ⏰ Scheduled Exports

### Recurring Export Setup
Configuration for automated, recurring exports:

```ts
// lib/export/scheduler.ts
interface ScheduledExport {
  id: string
  userId: string
  format: 'csv' | 'xlsx' | 'json' | 'pdf'
  frequency: 'daily' | 'weekly' | 'monthly'
  time: string // HH:MM format
  recipients: string[] // Email addresses
  options: ExportOptions
}

export async function scheduleExport(exportConfig: ScheduledExport) {
  // Store export configuration in database
  await storeScheduledExport(exportConfig)
  
  // Set up cron job or similar scheduling mechanism
  // This would typically integrate with a job scheduler
}

export async function runScheduledExports() {
  const scheduledExports = await getScheduledExportsDue()
  
  for (const exportConfig of scheduledExports) {
    try {
      const exportData = await exportAnalyticsData(exportConfig.options)
      
      // Send export via email or other delivery method
      await deliverExport(exportConfig.recipients, exportData, exportConfig.format)
      
      // Log successful export
      await logExportSuccess(exportConfig.id)
    } catch (error) {
      console.error(`Failed to run scheduled export ${exportConfig.id}:`, error)
      await logExportFailure(exportConfig.id, error)
    }
  }
}
```

## 🔐 Security and Privacy

### Data Access Controls
Ensuring only authorized users can export data:

```ts
// lib/export/security.ts
export async function canExportData(userId: string, productId?: string, targetUserId?: string): Promise<boolean> {
  // Users can export their own data
  if (targetUserId && userId === targetUserId) {
    return true
  }
  
  // Users can export data for their own products
  if (productId) {
    const product = await getProduct(productId)
    return product?.submitterId === userId
  }
  
  // Admin users can export any data
  const user = await getUser(userId)
  return user?.role === 'admin'
}

export async function validateExportRequest(
  userId: string,
  options: ExportOptions
): Promise<boolean> {
  // Check if user has permission to export requested data
  const hasPermission = await canExportData(
    userId,
    options.productId,
    options.userId
  )
  
  if (!hasPermission) {
    throw new Error('Unauthorized export request')
  }
  
  // Validate date range
  const maxDateRange = 365 * 2 // 2 years maximum
  const startDate = new Date(options.startDate)
  const endDate = new Date(options.endDate)
  const daysDifference = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  
  if (daysDifference > maxDateRange) {
    throw new Error('Date range exceeds maximum allowed')
  }
  
  return true
}
```

### Data Anonymization
Protecting sensitive information in exports:

```ts
// lib/export/privacy.ts
export function anonymizeExportData(data: any[], userId: string): any[] {
  return data.map(row => {
    // Remove or obfuscate personally identifiable information
    const anonymizedRow = { ...row }
    
    // Anonymize IP addresses
    if (anonymizedRow.ip_address) {
      anonymizedRow.ip_address = anonymizeIpAddress(anonymizedRow.ip_address)
    }
    
    // Remove internal IDs that could identify users
    if (anonymizedRow.internal_user_id) {
      delete anonymizedRow.internal_user_id
    }
    
    // Generalize geographic data for privacy
    if (anonymizedRow.city && anonymizedRow.country) {
      // Only include country-level data
      delete anonymizedRow.city
      delete anonymizedRow.region
    }
    
    return anonymizedRow
  })
}
```

## 🧪 Testing and Validation

### Export Testing
Ensuring export functionality works correctly:

```ts
// __tests__/export.test.ts
import { exportAnalyticsData } from "@/lib/export"
import { mockAnalyticsData } from "@/__tests__/mocks/analytics"

describe("Data Export", () => {
  it("exports data to CSV format", async () => {
    const csvData = await exportAnalyticsData({
      format: "csv",
      startDate: "2023-01-01",
      endDate: "2023-01-31",
      metrics: ["views", "votes", "comments"],
      granularity: "summary"
    })
    
    expect(typeof csvData).toBe("string")
    expect(csvData).toContain("views,votes,comments")
  })
  
  it("exports data to JSON format", async () => {
    const jsonData = await exportAnalyticsData({
      format: "json",
      startDate: "2023-01-01",
      endDate: "2023-01-31",
      metrics: ["views", "votes", "comments"],
      granularity: "summary"
    })
    
    expect(typeof jsonData).toBe("string")
    const parsed = JSON.parse(jsonData)
    expect(Array.isArray(parsed)).toBe(true)
  })
  
  it("validates export parameters", async () => {
    await expect(
      exportAnalyticsData({
        format: "invalid" as any,
        startDate: "2023-01-01",
        endDate: "2023-01-31",
        metrics: ["views"],
        granularity: "summary"
      })
    ).rejects.toThrow("Unsupported format")
  })
})
```

The data export system in DevHunt provides flexible, secure, and user-friendly options for accessing analytics data in various formats. This comprehensive system enables users to analyze their performance metrics using their preferred tools while maintaining data privacy and security standards.