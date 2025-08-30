# Analytics System Overview

Comprehensive overview of the DevHunt analytics system for tracking product performance and user engagement.

## 📊 System Purpose

The DevHunt analytics system provides valuable insights into product performance, user engagement, and platform growth. It helps tool creators understand how their submissions are performing and enables data-driven decisions for improving content and engagement strategies.

## 🏗️ System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Data Collection Layer                    │
├─────────────────────────────────────────────────────────────┤
│  Frontend Tracking  │  API Endpoints  │  Background Jobs    │
│                     │                 │                     │
│  - View Tracking    │  - View Counts  │  - Data Aggregation │
│  - Click Tracking   │  - Vote Stats   │  - Report Generation│
│  - Engagement       │  - Comment Data │                     │
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
```

## 🗃️ Data Model

### Core Analytics Tables

#### product_views
Tracks individual product views:
```sql
CREATE TABLE product_views (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  session_id VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_product_id (product_id),
  INDEX idx_created_at (created_at),
  INDEX idx_session_id (session_id)
);
```

#### product_clicks
Tracks user interactions with product elements:
```sql
CREATE TABLE product_clicks (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  element_type VARCHAR(50) NOT NULL,
  element_id VARCHAR(255),
  session_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_product_id (product_id),
  INDEX idx_element_type (element_type),
  INDEX idx_created_at (created_at)
);
```

#### user_activity_log
Comprehensive user activity tracking:
```sql
CREATE TABLE user_activity_log (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255),
  activity_type VARCHAR(50) NOT NULL,
  target_id VARCHAR(255),
  target_type VARCHAR(50),
  metadata JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_activity_type (activity_type),
  INDEX idx_created_at (created_at)
);
```

#### analytics_summary
Daily aggregated analytics data:
```sql
CREATE TABLE analytics_summary (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(255),
  user_id VARCHAR(255),
  date DATE NOT NULL,
  view_count INT DEFAULT 0,
  click_count INT DEFAULT 0,
  vote_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  unique_viewers INT DEFAULT 0,
  INDEX idx_product_id (product_id),
  INDEX idx_user_id (user_id),
  INDEX idx_date (date),
  UNIQUE KEY unique_product_date (product_id, date)
);
```

#### product_performance
Cached performance metrics:
```sql
CREATE TABLE product_performance (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(255) NOT NULL,
  performance_score DECIMAL(5,2),
  engagement_rate DECIMAL(5,2),
  last_calculated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_product_id (product_id),
  INDEX idx_performance_score (performance_score)
);
```

## 🎯 Key Metrics

### Product Performance Metrics

#### View Metrics
- **Total Views**: Cumulative view count for a product
- **Unique Views**: Number of unique viewers
- **Daily Views**: Views per day trend
- **View Sources**: Referral sources for views

#### Engagement Metrics
- **Click-through Rate**: Clicks divided by views
- **Engagement Rate**: (Votes + Comments) / Views
- **Time on Page**: Average time spent viewing product
- **Scroll Depth**: How far users scroll on product page

#### Growth Metrics
- **Performance Score**: Composite score based on all metrics
- **Trend Direction**: Whether performance is improving or declining
- **Growth Rate**: Percentage change over time period
- **Ranking**: Product's position relative to others

### User Performance Metrics

#### Overview Statistics
- **Total Products**: Number of products submitted
- **Total Votes Received**: Cumulative votes across all products
- **Total Comments Received**: Cumulative comments across all products
- **Total Views Received**: Cumulative views across all products

#### Product Rankings
- **Top Performing Products**: Products with highest performance scores
- **Most Viewed Products**: Products with highest view counts
- **Most Engaged Products**: Products with highest engagement rates

#### Activity Tracking
- **Recent Activity**: Timeline of user actions
- **Submission Frequency**: How often user submits products
- **Engagement Patterns**: User's voting and commenting behavior

## 🚀 Tracking Implementation

### Frontend Tracking

#### View Tracking
Automatic tracking of product views using a custom hook:

```tsx
import { useProductAnalytics } from "@/lib/hooks/use-analytics"

function ProductPage({ product }) {
  const { trackView } = useProductAnalytics(product.id)
  
  useEffect(() => {
    trackView()
  }, [trackView])
  
  return (
    <div>
      {/* Product content */}
    </div>
  )
}
```

#### Click Tracking
Tracking of user interactions with product elements:

```tsx
import { ClickTracker } from "@/components/analytics/click-tracker"

function ProductThumbnail({ product }) {
  return (
    <ClickTracker 
      productId={product.id}
      elementType="thumbnail"
    >
      <img src={product.thumbnail_url} alt={product.name} />
    </ClickTracker>
  )
}
```

### Backend Processing

#### Real-time Updates
Immediate processing of tracking events:

```ts
// API route for tracking views
export async function POST(request: Request) {
  const { productId, sessionId, userId } = await request.json()
  
  // Record view event
  await recordView({
    productId,
    sessionId,
    userId,
    ipAddress: request.headers.get('x-forwarded-for'),
    userAgent: request.headers.get('user-agent')
  })
  
  // Update cached metrics
  await updateCachedMetrics(productId)
  
  return new Response(JSON.stringify({ success: true }))
}
```

#### Batch Processing
Daily aggregation of analytics data:

```ts
// Daily aggregation job
export async function aggregateDailyAnalytics() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  
  // Aggregate view data
  const viewData = await aggregateViews(yesterday)
  
  // Aggregate click data
  const clickData = await aggregateClicks(yesterday)
  
  // Aggregate vote data
  const voteData = await aggregateVotes(yesterday)
  
  // Store aggregated data
  await storeAggregatedData({
    date: yesterday,
    viewData,
    clickData,
    voteData
  })
}
```

## 📈 Performance Scoring Algorithm

### Scoring Components

#### Weighted Metrics
The performance score is calculated using a weighted formula:

```
Performance Score = (Votes × 0.40) + (Comments × 0.30) + (Views × 0.20) + (Clicks × 0.10)
```

#### Normalization
Each metric is normalized to a 0-100 scale:

```
Normalized Votes = (Product Votes / Max Votes) × 100
Normalized Comments = (Product Comments / Max Comments) × 100
Normalized Views = (Product Views / Max Views) × 100
Normalized Clicks = (Product Clicks / Max Clicks) × 100
```

#### Recency Boost
Recent activity receives a multiplier:

```
If activity in last 7 days:
  Recency Multiplier = 1.2
Else if activity in last 30 days:
  Recency Multiplier = 1.1
Else:
  Recency Multiplier = 1.0
```

### Example Calculation
For a product with:
- 50 votes (normalized: 75)
- 20 comments (normalized: 60)
- 1000 views (normalized: 80)
- 150 clicks (normalized: 70)
- Recent activity (multiplier: 1.2)

```
Base Score = (75 × 0.40) + (60 × 0.30) + (80 × 0.20) + (70 × 0.10)
Base Score = 30 + 18 + 16 + 7 = 71

Performance Score = 71 × 1.2 = 85.2
```

## 🎨 Dashboard Features

### User Analytics Dashboard
Comprehensive dashboard for tracking personal performance:

#### Overview Section
- Total products submitted
- Cumulative votes, comments, and views received
- Engagement rate
- Performance score
- Recent activity timeline

#### Performance Charts
- View trends over time
- Engagement metrics comparison
- Click-through rate analysis
- Performance score history

#### Product Rankings
- Top performing products table
- Performance score distribution
- Growth rate indicators
- Comparative analysis

### Product Analytics Page
Detailed analytics for individual products:

#### Traffic Analysis
- View count trends
- Unique visitor statistics
- Traffic sources breakdown
- Geographic distribution

#### Engagement Analysis
- Click maps for interactive elements
- Comment sentiment analysis
- Vote distribution
- Time-on-page metrics

#### Performance Insights
- Performance score breakdown
- Improvement recommendations
- Benchmark comparisons
- Trend analysis

## 🔧 API Endpoints

### User Analytics
```
GET /api/users/{username}/analytics
```
Returns comprehensive analytics data for a user's products.

### Product Tracking
```
POST /api/products/{id}/track
```
Records view or click events for a product.

### Analytics Data
```
GET /api/analytics/summary
```
Returns aggregated analytics data for reporting.

## 📤 Data Export

### Export Formats
- **CSV**: Comma-separated values for spreadsheet analysis
- **Excel**: XLSX format with multiple sheets
- **JSON**: Raw data export for programmatic use
- **PDF**: Report format for sharing

### Export Options
- Date range selection
- Metric filtering
- Data aggregation levels
- Custom report templates

## 🔒 Privacy and Compliance

### Data Protection
- Anonymized tracking for non-authenticated users
- GDPR-compliant data handling
- User data deletion upon request
- Opt-out mechanisms

### Data Retention
- Raw event data: 24 months
- Aggregated data: Indefinitely
- User activity logs: 12 months
- Performance metrics: Indefinitely

## 🚀 Performance Optimization

### Caching Strategy
- Redis caching for frequently accessed metrics
- CDN distribution for static analytics assets
- Database indexing for fast queries
- Pre-computed aggregations

### Scalability Features
- Horizontal scaling of tracking endpoints
- Asynchronous processing of analytics events
- Database sharding for large datasets
- Load balancing for high-traffic periods

## 🧪 Testing and Monitoring

### Data Quality
- Automated validation of tracking events
- Anomaly detection for unusual patterns
- Data consistency checks
- Performance monitoring

### System Monitoring
- Real-time tracking of system health
- Alerting for tracking failures
- Performance metrics for analytics endpoints
- User experience monitoring

The DevHunt analytics system provides powerful insights into product performance and user engagement while maintaining privacy and performance standards. This comprehensive system enables both individual creators and platform administrators to make data-driven decisions for improving the DevHunt experience.