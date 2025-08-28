-- Migration to add github_url and demo_url columns to products table
-- Run this in your MySQL database if the columns don't exist

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS github_url VARCHAR(500) NULL AFTER website_url,
ADD COLUMN IF NOT EXISTS demo_url VARCHAR(500) NULL AFTER github_url;

-- Optionally, add indexes for better performance
-- CREATE INDEX idx_products_github_url ON products(github_url);
-- CREATE INDEX idx_products_demo_url ON products(demo_url);