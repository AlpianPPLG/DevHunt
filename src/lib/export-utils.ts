"use client"

/**
 * Utility functions for exporting data to CSV and Excel formats
 */

/**
 * Convert analytics data to CSV format
 */
export function analyticsToCSV(data: any) {
  if (!data) return '';
  
  const csvRows = [];
  
  // Basic user info
  csvRows.push(['DevHunt Analytics Report']);
  csvRows.push(['Generated at', new Date(data.generated_at).toLocaleString()]);
  csvRows.push(['User', data.user.name]);
  csvRows.push(['Username', data.user.username]);
  csvRows.push(['Time Range', data.filter_applied?.timeRange || '30d']);
  csvRows.push([]);
  
  // Overview stats
  csvRows.push(['Overview']);
  const overview = data.overview;
  if (overview) {
    csvRows.push(['Total Products', overview.total_products]);
    csvRows.push(['Total Votes', overview.total_votes_received]);
    csvRows.push(['Total Comments', overview.total_comments_received]);
    csvRows.push(['Total Views', overview.total_views_received]);
    csvRows.push(['Avg Votes per Product', overview.avg_votes_per_product]);
    csvRows.push(['Avg Comments per Product', overview.avg_comments_per_product]);
    csvRows.push(['Avg Views per Product', overview.avg_views_per_product]);
    csvRows.push(['Engagement Rate', `${overview.engagement_rate}%`]);
  }
  csvRows.push([]);
  
  // Growth metrics
  csvRows.push(['Growth Metrics']);
  const growth = data.growth_metrics;
  if (growth) {
    csvRows.push(['Products This Month', growth.products_this_month]);
    csvRows.push(['Products This Week', growth.products_this_week]);
    csvRows.push(['Products Today', growth.products_today]);
  }
  csvRows.push([]);
  
  // User activity
  csvRows.push(['User Activity']);
  const activity = data.user_activity;
  if (activity) {
    csvRows.push(['Products Submitted', activity.products_submitted]);
    csvRows.push(['Products Voted On', activity.products_voted_on]);
    csvRows.push(['Products Commented On', activity.products_commented_on]);
    csvRows.push(['Products Viewed', activity.products_viewed]);
    csvRows.push(['Products Clicked', activity.products_clicked]);
  }
  csvRows.push([]);
  
  // Product performance
  if (data.product_performance && data.product_performance.length > 0) {
    csvRows.push(['Product Performance']);
    csvRows.push(['Rank', 'Name', 'Tagline', 'Created', 'Votes', 'Comments', 'Views', 'Clicks', 'Score']);
    
    data.product_performance.forEach((product: any, index: number) => {
      csvRows.push([
        index + 1,
        product.name,
        product.tagline,
        new Date(product.created_at).toLocaleDateString(),
        product.total_votes,
        product.total_comments,
        product.total_views,
        product.total_clicks,
        product.performance_score
      ]);
    });
    csvRows.push([]);
  }
  
  // Engagement trends
  if (data.engagement_trends && data.engagement_trends.length > 0) {
    csvRows.push(['Engagement Trends']);
    csvRows.push(['Date', 'Votes', 'Comments', 'Views']);
    
    data.engagement_trends.forEach((trend: any) => {
      csvRows.push([
        new Date(trend.date).toLocaleDateString(),
        trend.votes,
        trend.comments,
        trend.views
      ]);
    });
    csvRows.push([]);
  }
  
  // Recent activity
  if (data.recent_activity && data.recent_activity.length > 0) {
    csvRows.push(['Recent Activity']);
    csvRows.push(['Activity Type', 'Direction', 'Count', 'Date']);
    
    data.recent_activity.forEach((activity: any) => {
      csvRows.push([
        activity.activity_type,
        activity.direction,
        activity.count,
        new Date(activity.date).toLocaleDateString()
      ]);
    });
  }
  
  // Convert to CSV string
  return csvRows.map(row => 
    row.map(value => {
      // Handle strings with commas by wrapping in quotes
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`;
      }
      return value;
    }).join(',')
  ).join('\n');
}

/**
 * Export analytics data to CSV file and trigger download
 */
export function exportAnalyticsToCSV(data: any, filename = 'analytics-export') {
  const csv = analyticsToCSV(data);
  if (!csv) return;
  
  // Create Blob with UTF-8 BOM for proper Excel encoding
  const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const blob = new Blob([BOM, csv], { type: 'text/csv;charset=utf-8;' });
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export analytics data to Excel format (XLS)
 * 
 * For simplicity, we're using CSV format which Excel can open
 */
export function exportAnalyticsToExcel(data: any, filename = 'analytics-export') {
  // For now, we'll just use CSV format, as it's simpler and Excel can open it
  exportAnalyticsToCSV(data, filename);
}