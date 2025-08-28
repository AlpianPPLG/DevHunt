-- Analytics Schema Migration
-- This script adds necessary tables for user analytics and performance tracking

-- Create product_views table to track product views
CREATE TABLE IF NOT EXISTS product_views (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product_views_product (product_id),
    INDEX idx_product_views_user (user_id),
    INDEX idx_product_views_date (viewed_at)
);

-- Create product_clicks table to track product clicks
CREATE TABLE IF NOT EXISTS product_clicks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT,
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    click_type ENUM('thumbnail', 'title', 'tagline', 'external_link') DEFAULT 'thumbnail',
    ip_address VARCHAR(45),
    user_agent TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product_clicks_product (product_id),
    INDEX idx_product_clicks_user (user_id),
    INDEX idx_product_clicks_date (clicked_at)
);

-- Create user_activity_log table for comprehensive activity tracking
CREATE TABLE IF NOT EXISTS user_activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_type ENUM('product_submit', 'product_edit', 'vote', 'comment', 'profile_update', 'login', 'logout') NOT NULL,
    target_id INT,
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
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

-- Insert sample data for testing
INSERT INTO product_views (product_id, user_id, viewed_at) VALUES
(1, 2, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(1, 3, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(2, 2, DATE_SUB(NOW(), INTERVAL 30 MINUTE)),
(3, 2, DATE_SUB(NOW(), INTERVAL 15 MINUTE)),
(4, 2, DATE_SUB(NOW(), INTERVAL 5 MINUTE));

INSERT INTO product_clicks (product_id, user_id, click_type, clicked_at) VALUES
(1, 2, 'thumbnail', DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(1, 3, 'title', DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(2, 2, 'thumbnail', DATE_SUB(NOW(), INTERVAL 30 MINUTE)),
(3, 2, 'external_link', DATE_SUB(NOW(), INTERVAL 15 MINUTE));

INSERT INTO user_activity_log (user_id, activity_type, target_id, target_type, metadata) VALUES
(1, 'product_submit', 1, 'product', '{"product_name": "React 21"}'),
(1, 'product_submit', 2, 'product', '{"product_name": "Next.js 15"}'),
(1, 'product_submit', 3, 'product', '{"product_name": "TypeScript 5.0"}'),
(1, 'product_submit', 4, 'product', '{"product_name": "React 21"}'),
(2, 'vote', 1, 'product', '{"vote_type": "upvote"}'),
(2, 'comment', 1, 'product', '{"comment_length": 45}'),
(3, 'vote', 2, 'product', '{"vote_type": "upvote"}'),
(3, 'comment', 2, 'product', '{"comment_length": 32}');

-- Update analytics_summary with sample data
INSERT INTO analytics_summary (user_id, date, products_submitted, votes_received, comments_received, views_received, clicks_received, engagement_rate, performance_score) VALUES
(1, CURDATE(), 4, 2, 2, 5, 4, 25.00, 8.50),
(1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 0, 0, 0, 2, 1, 0.00, 0.00),
(1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), 0, 0, 0, 1, 0, 0.00, 0.00);

-- Update product_performance with sample data
INSERT INTO product_performance (product_id, total_votes, total_comments, total_views, total_clicks, performance_score, engagement_rate) VALUES
(1, 1, 1, 2, 2, 4.20, 50.00),
(2, 0, 1, 1, 1, 1.30, 100.00),
(3, 0, 0, 1, 1, 0.30, 0.00),
(4, 0, 0, 1, 0, 0.20, 0.00);

-- Create view for easy analytics queries
CREATE OR REPLACE VIEW user_analytics_view AS
SELECT 
    u.id as user_id,
    u.username,
    u.name,
    COUNT(DISTINCT p.id) as total_products,
    SUM(COALESCE(pp.total_votes, 0)) as total_votes_received,
    SUM(COALESCE(pp.total_comments, 0)) as total_comments_received,
    SUM(COALESCE(pp.total_views, 0)) as total_views_received,
    SUM(COALESCE(pp.total_clicks, 0)) as total_clicks_received,
    AVG(COALESCE(pp.performance_score, 0)) as avg_performance_score,
    CASE 
        WHEN SUM(COALESCE(pp.total_views, 0)) > 0 
        THEN ROUND(((SUM(COALESCE(pp.total_votes, 0)) + SUM(COALESCE(pp.total_comments, 0))) / SUM(COALESCE(pp.total_views, 0)) * 100), 2)
        ELSE 0 
    END as overall_engagement_rate
FROM users u
LEFT JOIN products p ON u.id = p.submitter_id
LEFT JOIN product_performance pp ON p.id = pp.product_id
GROUP BY u.id, u.username, u.name;

-- Create indexes for better performance
CREATE INDEX idx_votes_product_user ON votes(product_id, user_id);
CREATE INDEX idx_comments_product_user ON comments(product_id, user_id);
CREATE INDEX idx_products_submitter_date ON products(submitter_id, created_at);

-- Add comments
COMMENT ON TABLE product_views IS 'Tracks when users view product pages';
COMMENT ON TABLE product_clicks IS 'Tracks when users click on product elements';
COMMENT ON TABLE user_activity_log IS 'Comprehensive log of all user activities';
COMMENT ON TABLE analytics_summary IS 'Daily aggregated analytics data for performance';
COMMENT ON TABLE product_performance IS 'Cached performance metrics for products';
COMMENT ON VIEW user_analytics_view IS 'Aggregated view for user analytics queries';
