-- Test script to verify thumbnail system functionality
-- Run this after applying the Pinterest fix

USE devhunt_db;

-- Test 1: Check if all required tables exist
SELECT 'Testing table structure...' as test_step;

SHOW TABLES LIKE 'products';
SHOW TABLES LIKE 'product_media';
SHOW TABLES LIKE 'tags';
SHOW TABLES LIKE 'product_tags';

-- Test 2: Check products table structure
SELECT 'Testing products table structure...' as test_step;

DESCRIBE products;

-- Test 3: Check if sample products exist
SELECT 'Testing sample products...' as test_step;

SELECT 
    id, 
    name, 
    thumbnail_url, 
    CASE 
        WHEN thumbnail_url IS NULL THEN 'No thumbnail'
        WHEN thumbnail_url LIKE 'http%' THEN 'External URL'
        WHEN thumbnail_url LIKE '/%' THEN 'Local path'
        ELSE 'Other format'
    END as thumbnail_type
FROM products 
LIMIT 5;

-- Test 4: Test external URL handling (simulate Pinterest URL)
SELECT 'Testing external URL handling...' as test_step;

-- This simulates how the proxy API would handle a Pinterest URL
SELECT 
    'https://pin.it/3FjHo9YqN' as original_url,
    CONCAT('/api/images/proxy?url=', ENCODE('https://pin.it/3FjHo9YqN', 'UTF8')) as proxy_url,
    'External Pinterest URL' as description;

-- Test 5: Check tags
SELECT 'Testing tags...' as test_step;

SELECT * FROM tags;

-- Test 6: Check product tags relationships
SELECT 'Testing product-tag relationships...' as test_step;

SELECT 
    p.name as product_name,
    GROUP_CONCAT(t.name SEPARATOR ', ') as tags
FROM products p
LEFT JOIN product_tags pt ON p.id = pt.product_id
LEFT JOIN tags t ON pt.tag_id = t.id
GROUP BY p.id, p.name
LIMIT 5;

-- Test 7: Verify media table structure
SELECT 'Testing media table structure...' as test_step;

DESCRIBE product_media;

-- Test 8: Check if any media exists
SELECT 'Testing existing media...' as test_step;

SELECT 
    pm.id,
    p.name as product_name,
    pm.media_type,
    pm.media_url,
    pm.thumbnail_url,
    CASE 
        WHEN pm.media_url LIKE 'http%' THEN 'External URL'
        WHEN pm.media_url LIKE '/%' THEN 'Local path'
        ELSE 'Other format'
    END as url_type
FROM product_media pm
JOIN products p ON pm.product_id = p.id
LIMIT 5;

-- Test 9: Summary
SELECT 'Test Summary' as summary;
SELECT 
    COUNT(*) as total_products,
    COUNT(CASE WHEN thumbnail_url IS NOT NULL THEN 1 END) as products_with_thumbnails,
    COUNT(CASE WHEN thumbnail_url LIKE 'http%' THEN 1 END) as products_with_external_thumbnails,
    COUNT(CASE WHEN thumbnail_url LIKE '/%' THEN 1 END) as products_with_local_thumbnails
FROM products;

-- Test 10: Recommendations
SELECT 'Recommendations for Pinterest URLs:' as recommendation;
SELECT '1. Use direct image URLs from Pinterest (not pin.it links)' as tip1;
SELECT '2. The proxy API will handle CORS issues automatically' as tip2;
SELECT '3. Thumbnails will be cached for 24 hours' as tip3;
SELECT '4. External link indicators will show on external images' as tip4;

-- Test 11: Sample Pinterest URL conversion
SELECT 'Sample Pinterest URL conversion:' as conversion_example;
SELECT 
    'Original Pinterest URL' as type,
    'https://i.pinimg.com/originals/example.jpg' as example_url
UNION ALL
SELECT 
    'Proxy API URL' as type,
    CONCAT('/api/images/proxy?url=', ENCODE('https://i.pinimg.com/originals/example.jpg', 'UTF8')) as example_url;