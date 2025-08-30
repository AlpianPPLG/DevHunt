# Analytics Components

Documentation for components related to analytics visualization and tracking in DevHunt.

## 📊 Overview

Analytics components in DevHunt provide powerful data visualization and tracking capabilities to help users understand the performance and engagement of their tools and content. These components are built with Recharts for data visualization and integrate with custom analytics hooks for real-time data.

## 🎨 Core Analytics Components

### UserAnalyticsDashboard
The main dashboard component for displaying user analytics.

**Location:** `src/components/analytics/user-analytics-dashboard.tsx`

**Props:**
- `username`: Username for which to display analytics
- `timeRange`: Time range for data ("7d", "30d", "90d")
- `className`: Additional CSS classes

**Features:**
- Overview statistics cards
- Performance charts
- Product ranking table
- Activity timeline
- Export functionality
- Time range selection

**Usage:**
```tsx
import { UserAnalyticsDashboard } from "@/components/analytics/user-analytics-dashboard"

<UserAnalyticsDashboard 
  username="exampleUser"
  timeRange="30d"
/>
```

### AnalyticsTab
A tab component for displaying analytics within user profiles.

**Location:** `src/components/analytics/analytics-tab.tsx`

**Props:**
- `username`: Username for analytics data
- `className`: Additional CSS classes

**Features:**
- Tabbed interface for different analytics views
- Responsive design
- Loading states
- Error handling

**Usage:**
```tsx
import { AnalyticsTab } from "@/components/analytics/analytics-tab"

<AnalyticsTab username="exampleUser" />
```

### AnalyticsFilter
A filter component for analytics data.

**Location:** `src/components/analytics/analytics-filter.tsx`

**Props:**
- `onFilterChange`: Callback when filters change
- `initialFilters`: Initial filter values
- `availableFilters`: Available filter options

**Features:**
- Date range selection
- Product filtering
- Metric filtering
- Preset time ranges
- Custom date ranges

**Usage:**
```tsx
import { AnalyticsFilter } from "@/components/analytics/analytics-filter"

<AnalyticsFilter 
  onFilterChange={handleFilterChange}
  initialFilters={initialFilters}
  availableFilters={availableFilters}
/>
```

### ActiveFilters
A component for displaying currently active filters.

**Location:** `src/components/analytics/active-filters.tsx`

**Props:**
- `filters`: Current active filters
- `onRemoveFilter`: Callback when filter is removed
- `onClearAll`: Callback to clear all filters

**Features:**
- Visual display of active filters
- Remove individual filters
- Clear all filters
- Responsive design

**Usage:**
```tsx
import { ActiveFilters } from "@/components/analytics/active-filters"

<ActiveFilters 
  filters={activeFilters}
  onRemoveFilter={handleRemoveFilter}
  onClearAll={handleClearAllFilters}
/>
```

### ShareAnalyticsDialog
A dialog component for sharing analytics data.

**Location:** `src/components/analytics/share-analytics-dialog.tsx`

**Props:**
- `open`: Boolean indicating if dialog is open
- `onOpenChange`: Callback when dialog open state changes
- `analyticsData`: Data to be shared
- `username`: Username associated with analytics

**Features:**
- Multiple sharing options (link, embed, social)
- Copy to clipboard functionality
- Embed code generation
- Social sharing integration
- Access controls

**Usage:**
```tsx
import { ShareAnalyticsDialog } from "@/components/analytics/share-analytics-dialog"

<ShareAnalyticsDialog 
  open={isDialogOpen}
  onOpenChange={setIsDialogOpen}
  analyticsData={analyticsData}
  username="exampleUser"
/>
```

## 📈 Data Visualization Components

### PerformanceChart
A chart component for displaying performance metrics over time.

**Location:** `src/components/analytics/performance-chart.tsx`

**Props:**
- `data`: Chart data
- `metric`: Metric to display
- `timeRange`: Time range for data
- `className`: Additional CSS classes

**Features:**
- Line chart visualization
- Interactive tooltips
- Responsive design
- Multiple metric support
- Customizable colors

**Usage:**
```tsx
import { PerformanceChart } from "@/components/analytics/performance-chart"

<PerformanceChart 
  data={chartData}
  metric="views"
  timeRange="30d"
/>
```

### EngagementChart
A chart component for displaying engagement metrics.

**Location:** `src/components/analytics/engagement-chart.tsx`

**Props:**
- `data`: Chart data
- `className`: Additional CSS classes

**Features:**
- Bar chart visualization
- Multiple metric comparison
- Interactive tooltips
- Responsive design

**Usage:**
```tsx
import { EngagementChart } from "@/components/analytics/engagement-chart"

<EngagementChart data={engagementData} />
```

### ProductRankingTable
A table component for displaying product rankings.

**Location:** `src/components/analytics/product-ranking-table.tsx`

**Props:**
- `products`: Array of product ranking data
- `sortBy`: Current sort column
- `sortOrder`: Sort order ("asc" or "desc")
- `onSort`: Callback when sort changes

**Features:**
- Sortable columns
- Performance score visualization
- Responsive design
- Loading states

**Usage:**
```tsx
import { ProductRankingTable } from "@/components/analytics/product-ranking-table"

<ProductRankingTable 
  products={rankingData}
  sortBy="performance_score"
  sortOrder="desc"
  onSort={handleSort}
/>
```

## 🎯 Tracking Components

### ViewTracker
A component for tracking page views and user engagement.

**Location:** `src/components/analytics/view-tracker.tsx`

**Props:**
- `productId`: ID of product being viewed
- `userId`: ID of user (if authenticated)
- `sessionId`: Current session ID

**Features:**
- Automatic view tracking
- Session management
- Debounced tracking
- Error handling

**Usage:**
```tsx
import { ViewTracker } from "@/components/analytics/view-tracker"

<ViewTracker 
  productId={product.id}
  userId={currentUser?.id}
  sessionId={sessionId}
/>
```

### ClickTracker
A component for tracking user clicks and interactions.

**Location:** `src/components/analytics/click-tracker.tsx`

**Props:**
- `productId`: ID of product
- `elementType`: Type of element clicked
- `elementId`: ID of element (optional)
- `children`: Child elements to wrap

**Features:**
- Automatic click tracking
- Element identification
- Context tracking
- Non-intrusive implementation

**Usage:**
```tsx
import { ClickTracker } from "@/components/analytics/click-tracker"

<ClickTracker 
  productId={product.id}
  elementType="thumbnail"
>
  <ThumbnailImage src={product.thumbnail_url} alt={product.name} />
</ClickTracker>
```

## 🛠️ Utility Components

### TimeRangeSelector
A component for selecting time ranges for analytics data.

**Location:** `src/components/analytics/time-range-selector.tsx`

**Props:**
- `value`: Current time range value
- `onChange`: Callback when selection changes
- `options`: Available time range options

**Features:**
- Predefined time ranges (7d, 30d, 90d)
- Custom date range selection
- Responsive design
- Accessible keyboard navigation

**Usage:**
```tsx
import { TimeRangeSelector } from "@/components/analytics/time-range-selector"

<TimeRangeSelector 
  value={currentTimeRange}
  onChange={handleTimeRangeChange}
  options={timeRangeOptions}
/>
```

### MetricCard
A card component for displaying individual metrics.

**Location:** `src/components/analytics/metric-card.tsx`

**Props:**
- `title`: Metric title
- `value`: Current value
- `change`: Change from previous period
- `icon`: Icon component
- `className`: Additional CSS classes

**Features:**
- Value display with formatting
- Trend indicators
- Icon support
- Responsive design

**Usage:**
```tsx
import { MetricCard } from "@/components/analytics/metric-card"
import { TrendingUp } from "lucide-react"

<MetricCard 
  title="Total Views"
  value={12500}
  change={12.5}
  icon={<TrendingUp />}
/>
```

### ExportButton
A button component for exporting analytics data.

**Location:** `src/components/analytics/export-button.tsx`

**Props:**
- `data`: Data to export
- `filename`: Export filename
- `format`: Export format ("csv", "json", "xlsx")
- `onExport`: Callback when export completes

**Features:**
- Multiple format support
- Loading states
- Error handling
- Accessible labels

**Usage:**
```tsx
import { ExportButton } from "@/components/analytics/export-button"

<ExportButton 
  data={analyticsData}
  filename="analytics-export"
  format="csv"
  onExport={handleExport}
/>
```

## 🔧 Hooks and Utilities

### useAnalytics
A custom hook for analytics data fetching and management.

**Location:** `src/lib/hooks/use-analytics.ts`

**Features:**
- Data fetching and caching
- Error handling
- Loading states
- Time range management
- Real-time updates

**Usage:**
```tsx
import { useAnalytics } from "@/lib/hooks/use-analytics"

const { data, loading, error, refresh } = useAnalytics({
  username: "exampleUser",
  timeRange: "30d"
})
```

### useProductAnalytics
A custom hook for product-specific analytics.

**Location:** `src/lib/hooks/use-analytics.ts`

**Features:**
- View tracking
- Click tracking
- Engagement metrics
- Performance scoring

**Usage:**
```tsx
import { useProductAnalytics } from "@/lib/hooks/use-analytics"

const { trackView, trackClick, performanceScore } = useProductAnalytics(productId)
```

## 📱 Responsive Design

Analytics components are designed with responsive principles:

### Mobile-First Approach
- Components adapt to small screens first
- Touch-friendly controls
- Simplified layouts on mobile
- Progressive enhancement for larger screens

### Breakpoints
- **Small**: 640px and below
- **Medium**: 641px - 1024px
- **Large**: 1025px and above

### Adaptive Features
- Chart responsiveness
- Table column hiding on small screens
- Flexible grid layouts
- Touch-optimized controls

## ♿ Accessibility

Analytics components follow accessibility best practices:

### ARIA Labels
- Descriptive labels for charts and graphs
- Status announcements for data updates
- Role attributes for complex components

### Keyboard Navigation
- Full keyboard operability
- Focus management
- Skip links where appropriate
- Logical tab order

### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy
- Alternative text for charts
- Live regions for real-time updates

## 🚀 Performance Optimization

### Data Fetching
- Efficient API calls
- Caching strategies
- Pagination for large datasets
- Debounced updates

### Chart Performance
- Virtualized rendering
- Data sampling for large datasets
- Lazy loading of charts
- Memory management

### Bundle Optimization
- Tree-shaking for unused code
- Dynamic imports for heavy components
- Minification and compression

## 🧪 Testing

### Unit Tests
- Component rendering tests
- Props validation
- Event handling
- State management

### Integration Tests
- API interaction testing
- Data flow verification
- User interaction scenarios

### Visual Regression
- Storybook for component visualization
- Snapshot testing
- Cross-browser compatibility

## 🛠️ Customization

### Styling
- Tailwind CSS utility classes
- CSS variables for theming
- Component-specific overrides
- Dark mode support

### Extension
- Component composition
- Props for customization
- Slot patterns for flexibility
- Theme provider integration

Analytics components provide powerful insights into user engagement and product performance on DevHunt. By leveraging these components, developers can create data-driven experiences that help users understand and optimize their content's impact.