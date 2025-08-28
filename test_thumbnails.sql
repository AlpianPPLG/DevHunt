-- Quick test to see what Pinterest URLs are stored in the database
USE devhunt_db;

-- Show all products with their thumbnail URLs
SELECT 
  id, 
  name, 
  thumbnail_url,
  created_at
FROM products 
WHERE thumbnail_url IS NOT NULL
ORDER BY created_at DESC;

-- Check if github_url and demo_url columns exist
SHOW COLUMNS FROM products LIKE '%url%';