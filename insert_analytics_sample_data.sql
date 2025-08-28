-- Sample Data for Analytics Tables
-- Run this after creating the analytics tables and after you have some products and users

USE devhunt_db;

-- First, let's see what users and products we have
SELECT 'Current Users:' as info;
SELECT id, username, name FROM users LIMIT 5;

SELECT 'Current Products:' as info;
SELECT id, name, submitter_id FROM products LIMIT 5;

-- Insert sample product views (replace the UUIDs with actual ones from your database)
-- You'll need to replace these UUIDs with real ones from your database
SET @sample_user_id = (SELECT id FROM users LIMIT 1);
SET @sample_product_id = (SELECT id FROM products LIMIT 1);

-- Only insert if we have users and products
INSERT INTO product_views (product_id, user_id, session_id, viewed_at, device_type) 
SELECT 
    @sample_product_id,
    @sample_user_id,
    'session-12345',
    DATE_SUB(NOW(), INTERVAL 2 HOUR),
    'desktop'
WHERE @sample_user_id IS NOT NULL AND @sample_product_id IS NOT NULL;

INSERT INTO product_views (product_id, user_id, session_id, viewed_at, device_type) 
SELECT 
    @sample_product_id,
    NULL, -- Anonymous view
    'session-67890',
    DATE_SUB(NOW(), INTERVAL 1 HOUR),
    'mobile'
WHERE @sample_product_id IS NOT NULL;

-- Insert sample product clicks
INSERT INTO product_clicks (product_id, user_id, click_type, clicked_at) 
SELECT 
    @sample_product_id,
    @sample_user_id,
    'website',
    DATE_SUB(NOW(), INTERVAL 30 MINUTE)
WHERE @sample_user_id IS NOT NULL AND @sample_product_id IS NOT NULL;

-- Insert sample user activity
INSERT INTO user_activity_log (user_id, activity_type, target_id, target_type, metadata) 
SELECT 
    @sample_user_id,
    'product_submit',
    @sample_product_id,
    'product',
    JSON_OBJECT('product_name', (SELECT name FROM products WHERE id = @sample_product_id))
WHERE @sample_user_id IS NOT NULL AND @sample_product_id IS NOT NULL;

-- Create analytics summary for today
INSERT INTO analytics_summary (user_id, date, products_submitted, votes_received, views_received, clicks_received, engagement_rate) 
SELECT 
    @sample_user_id,
    CURDATE(),
    (SELECT COUNT(*) FROM products WHERE submitter_id = @sample_user_id),
    (SELECT COUNT(*) FROM votes WHERE product_id IN (SELECT id FROM products WHERE submitter_id = @sample_user_id)),
    (SELECT COUNT(*) FROM product_views WHERE product_id IN (SELECT id FROM products WHERE submitter_id = @sample_user_id)),
    (SELECT COUNT(*) FROM product_clicks WHERE product_id IN (SELECT id FROM products WHERE submitter_id = @sample_user_id)),
    25.00
WHERE @sample_user_id IS NOT NULL;

-- Create product performance data
INSERT INTO product_performance (product_id, total_votes, total_comments, total_views, total_clicks, performance_score, engagement_rate) 
SELECT 
    @sample_product_id,
    (SELECT COUNT(*) FROM votes WHERE product_id = @sample_product_id),
    (SELECT COUNT(*) FROM comments WHERE product_id = @sample_product_id),
    (SELECT COUNT(*) FROM product_views WHERE product_id = @sample_product_id),
    (SELECT COUNT(*) FROM product_clicks WHERE product_id = @sample_product_id),
    4.20,
    50.00
WHERE @sample_product_id IS NOT NULL;

SELECT 'Sample analytics data inserted successfully!' as result;
SELECT 'Check the data with: SELECT * FROM product_views; SELECT * FROM product_clicks;' as instructions;