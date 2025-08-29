-- Add downvote capability to the votes table
USE devhunt_db;

-- Add vote_type column to votes table
ALTER TABLE votes 
ADD COLUMN vote_type ENUM('upvote', 'downvote') NOT NULL DEFAULT 'upvote';

-- Update existing votes to be upvotes (since that was the only type before)
UPDATE votes SET vote_type = 'upvote' WHERE vote_type IS NULL;

-- Update primary key to include vote_type
-- First, we need to drop the existing primary key
ALTER TABLE votes DROP PRIMARY KEY;

-- Then create a new primary key that includes vote_type
-- This allows a user to both upvote and downvote the same product (if needed)
ALTER TABLE votes 
ADD PRIMARY KEY (user_id, product_id, vote_type);

-- Create an index for faster counting by vote_type
CREATE INDEX idx_votes_product_type ON votes(product_id, vote_type);

SELECT 'Vote table has been updated to support downvoting' as message;