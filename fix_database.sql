-- Fix missing database columns for DevHunt
USE devhunt_db;

-- Add missing columns to products table if they don't exist
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS github_url VARCHAR(500) NULL,
ADD COLUMN IF NOT EXISTS demo_url VARCHAR(500) NULL;

-- Create product_media table if it doesn't exist (needed for media fallback)
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
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_media_product_id (product_id),
    INDEX idx_product_media_type (media_type)
);

-- Create analytics tables if they don't exist (for analytics features)
CREATE TABLE IF NOT EXISTS product_views (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36),
    session_id VARCHAR(100),
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    country VARCHAR(2),
    device_type ENUM('desktop', 'mobile', 'tablet') DEFAULT 'desktop',
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product_views_product_id (product_id),
    INDEX idx_product_views_user_id (user_id),
    INDEX idx_product_views_date (viewed_at)
);

CREATE TABLE IF NOT EXISTS product_clicks (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36),
    click_type ENUM('website', 'external_link', 'demo', 'github') NOT NULL,
    target_url VARCHAR(500),
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product_clicks_product_id (product_id),
    INDEX idx_product_clicks_type (click_type),
    INDEX idx_product_clicks_date (clicked_at)
);

SELECT 'Database migration completed successfully!' as message;