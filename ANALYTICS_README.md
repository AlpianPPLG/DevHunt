# 📊 DevHunt Analytics System

Sistem analytics komprehensif untuk melacak performa postingan user, engagement, dan metrik pertumbuhan.

## 🚀 Fitur Utama

### 1. **User Analytics Dashboard**
- **Overview Stats**: Total products, votes, comments, views
- **Performance Metrics**: Engagement rate, performance score, growth metrics
- **Product Ranking**: Ranking produk berdasarkan performa
- **Trend Analysis**: Analisis tren engagement 7/30/90 hari
- **Activity Tracking**: Log aktivitas user real-time

### 2. **Product Performance Tracking**
- **View Tracking**: Melacak setiap kali produk dilihat
- **Click Tracking**: Melacak interaksi user dengan elemen produk
- **Engagement Metrics**: Votes, comments, views, clicks
- **Performance Score**: Skor performa berdasarkan algoritma scoring

### 3. **Real-time Analytics**
- **Live Updates**: Data analytics update real-time
- **Time Range Selection**: 7 hari, 30 hari, 90 hari
- **Export & Share**: Kemampuan export dan share analytics

## 🏗️ Arsitektur Sistem

### Database Schema
```sql
-- Tabel utama untuk analytics
product_views          -- Tracking product views
product_clicks         -- Tracking product clicks  
user_activity_log      -- Comprehensive user activity
analytics_summary      -- Daily aggregated data
product_performance    -- Cached performance metrics
```

### API Endpoints
```
GET  /api/users/[username]/analytics     -- User analytics data
POST /api/products/[id]/track            -- Track views/clicks
GET  /api/products/[id]/track            -- Get tracking stats
```

### Frontend Components
```
UserAnalyticsDashboard    -- Full analytics dashboard
AnalyticsTab             -- Analytics tab for user profile
useAnalytics             -- Custom hook for tracking
useProductAnalytics      -- Product-specific analytics hook
```

## 🛠️ Cara Penggunaan

### 1. **Setup Database**
Jalankan migration script untuk membuat tabel analytics:
```bash
# Jalankan script database migration
mysql -u username -p database_name < src/scripts/04-analytics-schema.sql
```

### 2. **Integrasi ke User Profile**
Analytics tab sudah terintegrasi ke user profile page:
```tsx
// src/app/user/[username]/page.tsx
<TabsList className="grid w-full grid-cols-3">
  <TabsTrigger value="products">Products</TabsTrigger>
  <TabsTrigger value="comments">Comments</TabsTrigger>
  <TabsTrigger value="analytics">Analytics</TabsTrigger> {/* New! */}
</TabsList>
```

### 3. **Tracking Product Views & Clicks**
Gunakan custom hook untuk tracking otomatis:
```tsx
import { useProductAnalytics } from '@/lib/hooks/use-analytics'

function ProductPage({ productId }) {
  const { trackView, trackClick } = useProductAnalytics(productId)
  
  // Auto-track view when component mounts
  useEffect(() => {
    trackView()
  }, [trackView])
  
  // Track clicks on product elements
  const handleThumbnailClick = () => {
    trackClick('thumbnail', { element: 'product_thumbnail' })
  }
  
  return (
    <div onClick={handleThumbnailClick}>
      {/* Product content */}
    </div>
  )
}
```

### 4. **Mengakses Analytics Dashboard**
User bisa mengakses analytics melalui:
- **User Profile**: Tab "Analytics" di profile page
- **Direct URL**: `/analytics` untuk dashboard lengkap
- **Navigation**: Link dari dashboard atau header

## 📈 Metrik yang Tersedia

### Overview Metrics
- **Total Products**: Jumlah produk yang di-submit
- **Total Votes**: Total votes yang diterima
- **Total Comments**: Total komentar yang diterima  
- **Total Views**: Total views yang diterima
- **Engagement Rate**: Persentase engagement (votes + comments / views)

### Performance Metrics
- **Performance Score**: Skor performa berdasarkan algoritma:
  - Votes: 40% weight
  - Comments: 30% weight
  - Views: 20% weight
  - Clicks: 10% weight

### Growth Metrics
- **This Week**: Produk baru minggu ini
- **This Month**: Produk baru bulan ini
- **Growth Trends**: Tren pertumbuhan engagement

### Activity Tracking
- **Recent Activity**: Aktivitas 7 hari terakhir
- **User Actions**: Submit, vote, comment, view
- **Engagement Patterns**: Pola engagement user

## 🔧 Konfigurasi

### Environment Variables
```env
# Analytics tracking settings
ANALYTICS_ENABLED=true
ANALYTICS_DEBOUNCE_MS=1000
ANALYTICS_AUTO_TRACK=true
```

### Customization Options
```tsx
// Customize analytics behavior
const analytics = useAnalytics({
  autoTrackViews: true,    // Auto-track product views
  autoTrackClicks: true,   // Auto-track clicks
  debounceMs: 1000        // Debounce view tracking
})
```

## 📊 Contoh Data Analytics

### Sample Analytics Response
```json
{
  "user": {
    "id": "1",
    "name": "Alpian",
    "username": "ALPIAN",
    "joined_at": "2024-01-15T10:00:00Z"
  },
  "overview": {
    "total_products": 4,
    "total_votes_received": 2,
    "total_comments_received": 2,
    "total_views_received": 5,
    "engagement_rate": 25.0
  },
  "product_performance": [
    {
      "id": "1",
      "name": "React 21",
      "performance_score": 4.20,
      "total_votes": 1,
      "total_comments": 1,
      "total_views": 2
    }
  ],
  "growth_metrics": {
    "products_this_month": 4,
    "products_this_week": 1
  }
}
```

## 🚀 Fitur Lanjutan

### 1. **Export Analytics**
- Export ke CSV/Excel
- Share analytics dengan user lain
- Generate reports otomatis

### 2. **Advanced Filtering**
- Filter berdasarkan date range
- Filter berdasarkan product category
- Filter berdasarkan performance metrics

### 3. **Performance Optimization**
- Cached analytics data
- Database indexing untuk query cepat
- Real-time updates dengan debouncing

### 4. **Privacy & Security**
- User hanya bisa lihat analytics sendiri
- Data tracking anonymized untuk guest users
- GDPR compliant data handling

## 🐛 Troubleshooting

### Common Issues

#### 1. **Analytics tidak muncul**
```bash
# Check database tables
SHOW TABLES LIKE '%analytics%';

# Check API endpoint
curl /api/users/username/analytics
```

#### 2. **Tracking tidak berfungsi**
```bash
# Check database permissions
SHOW GRANTS FOR 'username'@'localhost';

# Check API logs
tail -f logs/api.log
```

#### 3. **Performance lambat**
```bash
# Check database indexes
SHOW INDEX FROM product_views;
SHOW INDEX FROM product_clicks;

# Optimize queries
EXPLAIN SELECT * FROM product_views WHERE product_id = 1;
```

### Debug Mode
```tsx
// Enable debug logging
const analytics = useAnalytics({
  debug: true,
  logLevel: 'verbose'
})
```

## 🔮 Roadmap

### Phase 1 (Current) ✅
- Basic analytics dashboard
- Product view/click tracking
- User performance metrics

### Phase 2 (Next) 🚧
- Advanced charts & graphs
- Competitor analysis
- Automated insights

### Phase 3 (Future) 📋
- AI-powered recommendations
- Predictive analytics
- Social media integration

## 📚 Referensi

### Database Queries
- [Analytics Schema](./src/scripts/04-analytics-schema.sql)
- [Sample Data](./src/scripts/02-seed-data.sql)

### API Documentation
- [User Analytics API](./src/app/api/users/[username]/analytics/route.ts)
- [Product Tracking API](./src/app/api/products/[id]/track/route.ts)

### Frontend Components
- [Analytics Dashboard](./src/components/analytics/user-analytics-dashboard.tsx)
- [Analytics Tab](./src/components/analytics/analytics-tab.tsx)

### Custom Hooks
- [useAnalytics Hook](./src/lib/hooks/use-analytics.ts)

## 🤝 Contributing

Untuk berkontribusi ke sistem analytics:

1. **Fork repository**
2. **Create feature branch**
3. **Implement changes**
4. **Add tests**
5. **Submit pull request**

## 📞 Support

Jika ada pertanyaan atau masalah:

- **GitHub Issues**: Buat issue baru
- **Documentation**: Cek dokumentasi ini
- **Community**: Join Discord/Telegram group

---

**DevHunt Analytics System** - Track your success, grow your impact! 🚀
