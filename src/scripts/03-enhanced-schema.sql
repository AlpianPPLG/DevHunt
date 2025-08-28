-- Enhanced DevHunt Database Schema Extensions
-- Run this after the initial database setup

USE devhunt_db;

-- Product Media Gallery Table
CREATE TABLE product_media (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    media_type ENUM('image', 'video', 'gif', 'logo') NOT NULL,
    media_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500), -- For videos
    caption TEXT,
    alt_text VARCHAR(255),
    display_order INT DEFAULT 0,
    file_size INT, -- in bytes
    mime_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_media_product_id (product_id),
    INDEX idx_product_media_type (media_type)
);

-- Collections/Lists System
CREATE TABLE collections (
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

CREATE TABLE collection_products (
    collection_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    note TEXT, -- User's note about why this product is in collection
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (collection_id, product_id),
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- User Following System
CREATE TABLE user_follows (
    follower_id VARCHAR(36) NOT NULL,
    following_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Product Updates/Changelog
CREATE TABLE product_updates (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    version VARCHAR(50),
    update_type ENUM('feature', 'bugfix', 'breaking', 'security', 'other') DEFAULT 'other',
    is_major BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_updates_product_id (product_id),
    INDEX idx_product_updates_type (update_type)
);

-- User Achievements & Reputation
CREATE TABLE user_achievements (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    achievement_type VARCHAR(50) NOT NULL,
    achievement_name VARCHAR(100) NOT NULL,
    achievement_description TEXT,
    achievement_data JSON,
    points_awarded INT DEFAULT 0,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_achievements_user_id (user_id),
    INDEX idx_user_achievements_type (achievement_type)
);

-- User Reputation/Points System
CREATE TABLE user_reputation (
    user_id VARCHAR(36) PRIMARY KEY,
    total_points INT DEFAULT 0,
    submission_points INT DEFAULT 0,
    vote_points INT DEFAULT 0,
    comment_points INT DEFAULT 0,
    collection_points INT DEFAULT 0,
    reputation_level ENUM('newcomer', 'contributor', 'expert', 'veteran', 'legend') DEFAULT 'newcomer',
    last_calculated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Product Analytics
CREATE TABLE product_views (
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

CREATE TABLE product_clicks (
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

-- Enhanced Products Table (add new columns)
ALTER TABLE products 
ADD COLUMN pricing_type ENUM('free', 'freemium', 'paid', 'open_source') DEFAULT 'free',
ADD COLUMN price_range ENUM('free', 'under_10', '10_50', '50_100', 'over_100') DEFAULT 'free',
ADD COLUMN github_url VARCHAR(500),
ADD COLUMN demo_url VARCHAR(500),
ADD COLUMN view_count INT DEFAULT 0,
ADD COLUMN click_count INT DEFAULT 0,
ADD COLUMN status ENUM('active', 'archived', 'pending') DEFAULT 'active',
ADD COLUMN featured_at TIMESTAMP NULL,
ADD INDEX idx_products_pricing (pricing_type),
ADD INDEX idx_products_status (status),
ADD INDEX idx_products_featured (featured_at);

-- Enhanced Users Table (add reputation and stats)
ALTER TABLE users 
ADD COLUMN total_points INT DEFAULT 0,
ADD COLUMN reputation_level ENUM('newcomer', 'contributor', 'expert', 'veteran', 'legend') DEFAULT 'newcomer',
ADD COLUMN followers_count INT DEFAULT 0,
ADD COLUMN following_count INT DEFAULT 0,
ADD COLUMN products_count INT DEFAULT 0,
ADD COLUMN collections_count INT DEFAULT 0,
ADD COLUMN location VARCHAR(100),
ADD COLUMN website_url VARCHAR(500),
ADD COLUMN twitter_handle VARCHAR(50),
ADD COLUMN github_username VARCHAR(50),
ADD INDEX idx_users_reputation (reputation_level),
ADD INDEX idx_users_points (total_points);

-- Search and Filtering Support
CREATE TABLE product_search_index (
    product_id VARCHAR(36) PRIMARY KEY,
    search_vector TEXT, -- For full-text search
    tag_names TEXT, -- Concatenated tag names for faster searching
    last_indexed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FULLTEXT(search_vector)
);

-- Trending Reports and Analytics
CREATE TABLE trending_reports (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    report_type ENUM('daily', 'weekly', 'monthly') NOT NULL,
    report_date DATE NOT NULL,
    top_products JSON, -- Array of top trending products with scores
    top_tags JSON, -- Array of trending tags
    metrics JSON, -- Various metrics for the period
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_report (report_type, report_date),
    INDEX idx_trending_reports_type_date (report_type, report_date)
);

-- Sample Data for Testing
-- Insert sample media for existing products
INSERT INTO product_media (product_id, media_type, media_url, caption, display_order) VALUES
('prod-1-uuid', 'image', 'https://ui.shadcn.com/examples/authentication.jpg', 'Authentication page example', 1),
('prod-1-uuid', 'image', 'https://ui.shadcn.com/examples/dashboard.jpg', 'Dashboard components', 2),
('prod-2-uuid', 'image', 'https://resend.com/static/images/homepage-hero.png', 'Resend email API interface', 1);

-- Initialize reputation for existing users
INSERT INTO user_reputation (user_id, total_points, submission_points) VALUES
('user-1-uuid', 100, 50),
('user-2-uuid', 80, 40);

-- Sample collections
INSERT INTO collections (id, name, description, slug, user_id) VALUES
('coll-1-uuid', 'Best React Tools', 'Essential tools for React development', 'best-react-tools', 'user-1-uuid'),
('coll-2-uuid', 'Developer APIs', 'Must-have APIs for developers', 'developer-apis', 'user-2-uuid');

-- Link products to collections
INSERT INTO collection_products (collection_id, product_id, note) VALUES
('coll-1-uuid', 'prod-1-uuid', 'Great for building consistent UIs'),
('coll-2-uuid', 'prod-2-uuid', 'Reliable email delivery service');