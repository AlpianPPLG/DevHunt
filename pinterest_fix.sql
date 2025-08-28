-- Enhanced fix for Pinterest thumbnail display and image handling
-- Run this in your MySQL database

USE devhunt_db;

-- Add missing columns to products table if they don't exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS github_url VARCHAR(500) NULL;
ALTER TABLE products ADD COLUMN IF NOT EXISTS demo_url VARCHAR(500) NULL;

-- Ensure thumbnail_url column exists and has proper type
ALTER TABLE products MODIFY COLUMN thumbnail_url VARCHAR(500) NULL;

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
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_media_product_id (product_id),
    INDEX idx_product_media_type (media_type)
);

-- Create product_clicks table if it doesn't exist
CREATE TABLE IF NOT EXISTS product_clicks (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36),
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_clicks_product_id (product_id),
    INDEX idx_product_clicks_clicked_at (clicked_at)
);

-- Create product_views table if it doesn't exist
CREATE TABLE IF NOT EXISTS product_views (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36),
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_views_product_id (product_id),
    INDEX idx_product_views_viewed_at (viewed_at)
);

-- Create product_search_index table if it doesn't exist
CREATE TABLE IF NOT EXISTS product_search_index (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    search_text TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FULLTEXT idx_product_search_index_search_text (search_text),
    INDEX idx_product_search_index_product_id (product_id)
);

-- Create product_updates table if it doesn't exist
CREATE TABLE IF NOT EXISTS product_updates (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    update_type ENUM('feature', 'bugfix', 'announcement', 'other') DEFAULT 'other',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_updates_product_id (product_id),
    INDEX idx_product_updates_created_at (created_at)
);

-- Create trending_reports table if it doesn't exist
CREATE TABLE IF NOT EXISTS trending_reports (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    report_type ENUM('spam', 'inappropriate', 'duplicate', 'other') NOT NULL,
    description TEXT,
    reporter_id VARCHAR(36),
    status ENUM('pending', 'reviewed', 'resolved', 'dismissed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_trending_reports_product_id (product_id),
    INDEX idx_trending_reports_status (status)
);

-- Create user_achievements table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_achievements (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    achievement_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_achievements_user_id (user_id),
    INDEX idx_user_achievements_type (achievement_type)
);

-- Create user_follows table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_follows (
    follower_id VARCHAR(36) NOT NULL,
    following_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_follows_follower (follower_id),
    INDEX idx_user_follows_following (following_id)
);

-- Create user_reputation table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_reputation (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    reputation_type ENUM('upvote', 'downvote', 'comment', 'product_submit', 'achievement') NOT NULL,
    points INT NOT NULL DEFAULT 0,
    source_id VARCHAR(36), -- ID of the source (product, comment, etc.)
    source_type VARCHAR(50), -- Type of the source
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_reputation_user_id (user_id),
    INDEX idx_user_reputation_type (reputation_type)
);

-- Create collections table if it doesn't exist
CREATE TABLE IF NOT EXISTS collections (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    is_public BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_collections_user_id (user_id),
    INDEX idx_collections_public (is_public),
    INDEX idx_collections_featured (is_featured)
);

-- Create collection_products table if it doesn't exist
CREATE TABLE IF NOT EXISTS collection_products (
    collection_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    note TEXT,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (collection_id, product_id),
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert sample data for testing if tables are empty
INSERT IGNORE INTO tags (name, description) VALUES 
('Developer Tool', 'Tools that help developers be more productive'),
('AI', 'Artificial Intelligence and Machine Learning tools'),
('Productivity', 'Tools to improve developer productivity'),
('Web Development', 'Tools for web development');

-- Show success message
SELECT 'Enhanced Pinterest thumbnail fix applied successfully!' as result;
SELECT 'All necessary tables and columns are now available.' as status;
SELECT 'You can now use Pinterest and other external image URLs.' as note;