-- Verification Queries for Analytics Tables
-- Run this after creating the tables and inserting sample data

USE devhunt_db;

-- Check tables exist
SELECT 'Checking if analytics tables exist:' as info;
SELECT table_name, table_type, engine, table_rows 
FROM information_schema.tables 
WHERE table_schema = 'devhunt_db' AND 
      table_name IN ('product_views', 'product_clicks', 'user_activity_log', 'analytics_summary', 'product_performance');

-- Check sample data
SELECT 'Product views data:' as info;
SELECT COUNT(*) as count, MIN(viewed_at) as oldest, MAX(viewed_at) as newest FROM product_views;

SELECT 'Product clicks data:' as info;
SELECT COUNT(*) as count, click_type, MIN(clicked_at) as oldest, MAX(clicked_at) as newest 
FROM product_clicks 
GROUP BY click_type;

SELECT 'User activity log data:' as info;
SELECT COUNT(*) as count, activity_type, MIN(created_at) as oldest, MAX(created_at) as newest 
FROM user_activity_log 
GROUP BY activity_type;

SELECT 'Analytics summary data:' as info;
SELECT COUNT(*) as count, MIN(date) as oldest_date, MAX(date) as newest_date 
FROM analytics_summary;

SELECT 'Product performance data:' as info;
SELECT COUNT(*) as count, AVG(performance_score) as avg_score, AVG(engagement_rate) as avg_engagement 
FROM product_performance;

-- Example analytics query - top viewed products
SELECT 'Top viewed products:' as info;
SELECT 
    p.id,
    p.name,
    p.tagline,
    COUNT(pv.id) as view_count,
    COUNT(DISTINCT pv.user_id) as unique_viewers
FROM products p
LEFT JOIN product_views pv ON p.id = pv.product_id
GROUP BY p.id, p.name, p.tagline
ORDER BY view_count DESC
LIMIT 5;

-- Example analytics query - user engagement
SELECT 'User engagement:' as info;
SELECT
    u.username,
    u.name,
    COUNT(DISTINCT pv.id) as total_views,
    COUNT(DISTINCT pc.id) as total_clicks,
    COUNT(DISTINCT c.id) as total_comments,
    COUNT(DISTINCT v.product_id) as total_votes
FROM users u
LEFT JOIN product_views pv ON u.id = pv.user_id
LEFT JOIN product_clicks pc ON u.id = pc.user_id
LEFT JOIN comments c ON u.id = c.user_id
LEFT JOIN votes v ON u.id = v.user_id
GROUP BY u.id, u.username, u.name
ORDER BY total_views DESC
LIMIT 5;