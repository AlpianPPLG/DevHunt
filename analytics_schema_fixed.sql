-- Fixed Analytics Schema for DevHunt
-- This version matches the existing database data types (VARCHAR(36) for IDs)

USE devhunt_db;

-- Create product_views table to track product page views
CREATE TABLE IF NOT EXISTS product_views (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36),
    session_id VARCHAR(100),
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    country VARCHAR(2),
    device_type ENUM('desktop', 'mobile', 'tablet') DEFAULT 'desktop',
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product_views_product (product_id),
    INDEX idx_product_views_user (user_id),
    INDEX idx_product_views_date (viewed_at)
);

-- Create product_clicks table to track product clicks
CREATE TABLE IF NOT EXISTS product_clicks (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36),
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    click_type ENUM('website', 'external_link', 'demo', 'github') NOT NULL,
    target_url VARCHAR(500),
    ip_address VARCHAR(45),
    user_agent TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product_clicks_product (product_id),
    INDEX idx_product_clicks_user (user_id),
    INDEX idx_product_clicks_date (clicked_at),
    INDEX idx_product_clicks_type (click_type)
);

-- Create user_activity_log table for comprehensive activity tracking
CREATE TABLE IF NOT EXISTS user_activity_log (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    activity_type ENUM('product_submit', 'product_edit', 'vote', 'comment', 'profile_update', 'login', 'logout') NOT NULL,
    target_id VARCHAR(36),
    target_type ENUM('product', 'comment', 'user') NULL,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_activity_user (user_id),
    INDEX idx_user_activity_type (activity_type),
    INDEX idx_user_activity_date (created_at),
    INDEX idx_user_activity_target (target_id, target_type)
);

-- Create analytics_summary table for cached analytics data
CREATE TABLE IF NOT EXISTS analytics_summary (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    date DATE NOT NULL,
    products_submitted INT DEFAULT 0,
    votes_received INT DEFAULT 0,
    comments_received INT DEFAULT 0,
    views_received INT DEFAULT 0,
    clicks_received INT DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0.00,
    performance_score DECIMAL(8,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_date (user_id, date),
    INDEX idx_analytics_summary_user (user_id),
    INDEX idx_analytics_summary_date (date)
);

-- Create product_performance table for cached product performance data
CREATE TABLE IF NOT EXISTS product_performance (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    product_id VARCHAR(36) NOT NULL,
    total_votes INT DEFAULT 0,
    total_comments INT DEFAULT 0,
    total_views INT DEFAULT 0,
    total_clicks INT DEFAULT 0,
    performance_score DECIMAL(8,2) DEFAULT 0.00,
    engagement_rate DECIMAL(5,2) DEFAULT 0.00,
    last_calculated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product (product_id),
    INDEX idx_product_performance_score (performance_score),
    INDEX idx_product_performance_engagement (engagement_rate)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_votes_product_user ON votes(product_id, user_id);
CREATE INDEX IF NOT EXISTS idx_comments_product_user ON comments(product_id, user_id);
CREATE INDEX IF NOT EXISTS idx_products_submitter_date ON products(submitter_id, created_at);

-- Note: Sample data insertion will need to use actual UUIDs from your database
-- You can get sample product and user IDs with:
-- SELECT id FROM users LIMIT 3;
-- SELECT id FROM products LIMIT 3;

SELECT 'Fixed analytics schema created successfully!' as message;
SELECT 'To insert sample data, first get actual UUIDs from your database' as note;