-- Comprehensive database fix for DevHunt image handling
-- Run this after applying the Pinterest fix

USE devhunt_db;

-- First, let's see what we have
SELECT 'Current database state:' as info;
SELECT COUNT(*) as total_products FROM products;
SELECT COUNT(*) as products_with_thumbnails FROM products WHERE thumbnail_url IS NOT NULL;

-- Check current thumbnail URLs
SELECT 'Current thumbnail URLs:' as info;
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
WHERE thumbnail_url IS NOT NULL
ORDER BY created_at DESC;

-- Update products with proper image URLs
-- Replace pin.it URLs with proper image URLs or remove them
UPDATE products 
SET thumbnail_url = NULL 
WHERE thumbnail_url LIKE '%pin.it%' 
   OR thumbnail_url LIKE '%pinterest.com%'
   OR thumbnail_url = '';

-- Add sample products with proper image URLs for testing
INSERT IGNORE INTO products (id, name, tagline, description, website_url, thumbnail_url, submitter_id, created_at) VALUES
(
    'sample-product-1',
    'React 21',
    'Performant React framework with new features',
    'React 21 introduces groundbreaking performance improvements and new concurrent features that make React applications faster and more responsive than ever before.',
    'https://react.dev',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop',
    (SELECT id FROM users LIMIT 1),
    NOW()
),
(
    'sample-product-2',
    'Next.js 15',
    'Full-stack React framework',
    'Next.js 15 brings server components, app router, and improved performance to make building full-stack React applications easier and faster.',
    'https://nextjs.org',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop',
    (SELECT id FROM users LIMIT 1),
    NOW()
),
(
    'sample-product-3',
    'TypeScript 5.0',
    'Typed JavaScript at scale',
    'TypeScript 5.0 introduces new language features, improved performance, and better tooling for building large-scale JavaScript applications.',
    'https://www.typescriptlang.org',
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=400&fit=crop',
    (SELECT id FROM users LIMIT 1),
    NOW()
);

-- Add sample tags if they don't exist
INSERT IGNORE INTO tags (name, description) VALUES
('React', 'React.js framework and ecosystem'),
('Next.js', 'Full-stack React framework'),
('TypeScript', 'Typed JavaScript language'),
('Frontend', 'Frontend development tools'),
('Framework', 'Development frameworks'),
('Performance', 'Performance optimization tools'),
('Developer Tool', 'Tools for developers');

-- Link sample products to tags
INSERT IGNORE INTO product_tags (product_id, tag_id) VALUES
('sample-product-1', (SELECT id FROM tags WHERE name = 'React')),
('sample-product-1', (SELECT id FROM tags WHERE name = 'Frontend')),
('sample-product-1', (SELECT id FROM tags WHERE name = 'Framework')),
('sample-product-2', (SELECT id FROM tags WHERE name = 'Next.js')),
('sample-product-2', (SELECT id FROM tags WHERE name = 'React')),
('sample-product-2', (SELECT id FROM tags WHERE name = 'Full-stack')),
('sample-product-3', (SELECT id FROM tags WHERE name = 'TypeScript')),
('sample-product-3', (SELECT id FROM tags WHERE name = 'Developer Tool'));

-- Add sample media for products
INSERT IGNORE INTO product_media (id, product_id, media_type, media_url, thumbnail_url, caption, alt_text, display_order) VALUES
(
    'sample-media-1',
    'sample-product-1',
    'image',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    'React 21 performance improvements',
    'React 21 logo and performance graph',
    0
),
(
    'sample-media-2',
    'sample-product-2',
    'image',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    'Next.js 15 features',
    'Next.js 15 logo and features',
    0
),
(
    'sample-media-3',
    'sample-product-3',
    'image',
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
    'TypeScript 5.0 improvements',
    'TypeScript logo and new features',
    0
);

-- Show final state
SELECT 'Final database state:' as info;
SELECT COUNT(*) as total_products FROM products;
SELECT COUNT(*) as products_with_thumbnails FROM products WHERE thumbnail_url IS NOT NULL;
SELECT COUNT(*) as total_media FROM product_media;
SELECT COUNT(*) as total_tags FROM tags;

-- Show updated products
SELECT 'Updated products:' as info;
SELECT 
    p.id, 
    p.name, 
    p.thumbnail_url,
    CASE 
        WHEN p.thumbnail_url IS NULL THEN 'No thumbnail'
        WHEN p.thumbnail_url LIKE 'http%' THEN 'External URL'
        WHEN p.thumbnail_url LIKE '/%' THEN 'Local path'
        ELSE 'Other format'
    END as thumbnail_type,
    GROUP_CONCAT(t.name SEPARATOR ', ') as tags
FROM products p
LEFT JOIN product_tags pt ON p.id = pt.product_id
LEFT JOIN tags t ON pt.tag_id = t.id
GROUP BY p.id, p.name, p.thumbnail_url
ORDER BY p.created_at DESC;

-- Show sample media
SELECT 'Sample media:' as info;
SELECT 
    pm.id,
    p.name as product_name,
    pm.media_type,
    pm.media_url,
    pm.caption
FROM product_media pm
JOIN products p ON pm.product_id = p.id
ORDER BY pm.display_order, pm.created_at;

-- Success message
SELECT 'Database fix completed successfully!' as result;
SELECT 'Sample products with proper image URLs have been added.' as note;
SELECT 'You can now test the image proxy system.' as next_step;