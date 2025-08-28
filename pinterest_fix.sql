-- Minimal fix for Pinterest thumbnail display
-- Run this in your MySQL database

USE devhunt_db;

-- Add missing columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS github_url VARCHAR(500) NULL;
ALTER TABLE products ADD COLUMN IF NOT EXISTS demo_url VARCHAR(500) NULL;

-- Create product_media table if it doesn't exist (required for media API)
CREATE TABLE IF NOT EXISTS product_media (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    media_type ENUM('image', 'video', 'gif', 'logo') NOT NULL,
    media_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    caption TEXT,
    alt_text VARCHAR(255),
    display_order INT DEFAULT 0,
    file_size INT,
    mime_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

SELECT 'Pinterest thumbnail fix applied successfully!' as result;