-- Insert Sample Data for DevHunt
USE devhunt_db;

-- Sample Users (password for all is "password123")
INSERT IGNORE INTO users (id, name, username, email, password) VALUES
('user-1-uuid', 'Alice Johnson', 'alice', 'alice@example.com', '$2b$10$E9pP6lZkL2sY.QzC1nJ4b.2wX.gOq1zJ8zR7v.yR3i.bW3qY.kC5q'),
('user-2-uuid', 'Bob Smith', 'bob', 'bob@example.com', '$2b$10$E9pP6lZkL2sY.QzC1nJ4b.2wX.gOq1zJ8zR7v.yR3i.bW3qY.kC5q');

-- Sample Products
INSERT IGNORE INTO products (id, name, tagline, description, website_url, submitter_id) VALUES
('prod-1-uuid', 'ShadCN UI', 'Beautifully designed components that you can copy and paste into your apps.', 'A collection of reusable components built using Radix UI and Tailwind CSS. Perfect for building modern web applications with consistent design.', 'https://ui.shadcn.com/', 'user-1-uuid'),
('prod-2-uuid', 'Resend', 'The best email API to reach humans instead of spam folders.', 'Modern email API that ensures your transactional emails reach the inbox, not spam. Built for developers with a simple, powerful API.', 'https://resend.com/', 'user-2-uuid');

-- Sample Votes
INSERT IGNORE INTO votes (user_id, product_id) VALUES
('user-1-uuid', 'prod-2-uuid'), -- Alice upvoted Resend
('user-2-uuid', 'prod-1-uuid'), -- Bob upvoted ShadCN UI
('user-1-uuid', 'prod-1-uuid');  -- Alice upvoted her own submission

-- Sample Tags
INSERT IGNORE INTO tags (id, name, description) VALUES 
(1, 'React', 'React-based tools and libraries'),
(2, 'Developer Tool', 'Tools that help developers build better software'),
(3, 'UI/UX', 'User interface and experience tools'),
(4, 'API', 'Application programming interfaces and services');

-- Link Products to Tags
INSERT IGNORE INTO product_tags (product_id, tag_id) VALUES
('prod-1-uuid', 1), ('prod-1-uuid', 2), ('prod-1-uuid', 3), -- ShadCN is React, Dev Tool, UI/UX
('prod-2-uuid', 2), ('prod-2-uuid', 4); -- Resend is Dev Tool, API

-- Sample Comments (threaded)
INSERT IGNORE INTO comments (id, content, user_id, product_id, parent_comment_id) VALUES
('comment-1-uuid', 'This library is a game-changer for my projects!', 'user-2-uuid', 'prod-1-uuid', NULL),
('comment-2-uuid', 'I agree! The theming is so easy to configure.', 'user-1-uuid', 'prod-1-uuid', 'comment-1-uuid'); -- Alice replies to Bob
