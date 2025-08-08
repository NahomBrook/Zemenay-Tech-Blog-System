/*
 * Tech Pulse Database Schema
 * This file contains the complete database schema for the Tech Pulse blog system.
 * It includes table definitions, relationships, indexes, and sample data.
 */

-- Enable UUID generation extension for unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Enable trigram matching for advanced text search
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

/*
 * User Roles
 * Defines the possible roles for users in the system
 * - admin: Full system access
 * - author: Can create and manage their own content
 * - user: Regular user with basic permissions
 */
CREATE TYPE user_role AS ENUM ('admin', 'author', 'user');

/*
 * Article Status
 * Tracks the publication state of articles
 * - draft: Not yet published
 * - published: Visible to all users
 * - archived: No longer actively maintained
 */
CREATE TYPE article_status AS ENUM ('draft', 'published', 'archived');

/*
 * Users Table
 * Stores user account information and authentication details
 */
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Unique identifier for each user
    username VARCHAR(50) UNIQUE NOT NULL,            -- Unique username for login
    email VARCHAR(255) UNIQUE NOT NULL,              -- User's email address (must be unique)
    password_hash VARCHAR(255) NOT NULL,             -- Hashed password (use bcrypt)
    full_name VARCHAR(100),                          -- User's full name
    avatar_url TEXT,                                 -- URL to user's profile picture
    bio TEXT,                                        -- Short biography/description
    role user_role DEFAULT 'user',                   -- User's role in the system
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- Account creation timestamp
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP   -- Last update timestamp
);

/*
 * Categories Table
 * Organizes articles into broad topics
 */
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Unique identifier
    name VARCHAR(50) UNIQUE NOT NULL,                -- Category name ('Web Development')
    slug VARCHAR(60) UNIQUE NOT NULL,                -- URL friendly version of the name
    description TEXT,                                -- Brief description of the category
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  -- Creation timestamp
);

/*
 * Tags Table
 * Labels for categorizing articles with more specific terms
 */
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Unique identifier
    name VARCHAR(50) UNIQUE NOT NULL,                -- Tag name ('React', 'TypeScript')
    slug VARCHAR(60) UNIQUE NOT NULL,                -- URL friendly version of the tag
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  -- Creation timestamp
);

/*
 * Articles Table
 * Main content container for blog posts
 */
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Unique identifier
    title VARCHAR(255) NOT NULL,                     -- Article title
    slug VARCHAR(300) UNIQUE NOT NULL,               -- URL friendly title (for SEO)
    content TEXT NOT NULL,                           -- Full article content (HTML)
    excerpt TEXT,                                    -- Short summary for previews
    cover_image_url TEXT,                            -- URL to the article's cover image
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,  -- Article author
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,  -- Primary category
    status article_status DEFAULT 'draft',           -- Publication status
    published_at TIMESTAMP WITH TIME ZONE,           -- When the article was published
    view_count INTEGER DEFAULT 0,                    -- Number of views
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- Creation timestamp
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP   -- Last update timestamp
);

/*
 * Article Tags (Junction Table)
 * Many-to-many relationship between articles and tags
 */
CREATE TABLE article_tags (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,      -- Reference to article
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,              -- Reference to tag
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- When tag was added
    PRIMARY KEY (article_id, tag_id)  -- Ensures unique tag per article
);

/*
 * Comments Table
 * User comments on articles
 */
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Unique identifier
    content TEXT NOT NULL,                           -- Comment text
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,      -- Parent article
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,            -- Comment author
    parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,  -- For nested comments
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- Creation timestamp
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP   -- Last update timestamp
);

/*
 * Likes Table
 * Tracks which users have liked which articles
 */
CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Unique identifier
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,      -- Liked article
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,            -- User who liked
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- When liked
    UNIQUE(article_id, user_id)  -- Prevents duplicate likes
);

/*
 * Bookmarks Table
 * Allows users to save articles for later reading
 */
CREATE TABLE bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Unique identifier
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,      -- Bookmarked article
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,            -- User who bookmarked
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- When bookmarked
    UNIQUE(article_id, user_id)  -- Prevents duplicate bookmarks
);

/*
 * Media Table
 * Stores information about uploaded files (images, documents, etc.)
 */
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- Unique identifier
    url TEXT NOT NULL,                               -- Public URL of the file
    file_name TEXT NOT NULL,                         -- Original filename
    file_type VARCHAR(100) NOT NULL,                 -- MIME type ('image/jpg')
    file_size INTEGER NOT NULL,                      -- File size in bytes
    alt_text TEXT,                                   -- Alternative text for accessibility
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,  -- User who uploaded the file
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  -- Upload timestamp
);

/*
 * Performance Indexes
 * These indexes improve query performance for common operations
 */

-- User related indexes
CREATE INDEX idx_users_email ON users(email);         -- Faster login lookups
CREATE INDEX idx_users_username ON users(username);   -- Faster username lookups

-- Article related indexes
CREATE INDEX idx_articles_author ON articles(author_id);        -- Find articles by author
CREATE INDEX idx_articles_category ON articles(category_id);    -- Filter by category
CREATE INDEX idx_articles_status ON articles(status);           -- Filter by status
CREATE INDEX idx_articles_published ON articles(published_at)   -- Find published articles
    WHERE status = 'published';
CREATE INDEX idx_articles_created ON articles(created_at);      -- Sort by creation date
CREATE INDEX idx_articles_updated ON articles(updated_at);      -- Sort by last update

-- Comment related indexes
CREATE INDEX idx_comments_article ON comments(article_id);  -- Find comments for an article
CREATE INDEX idx_comments_user ON comments(user_id);        -- Find comments by user

-- Tag and Category URL lookups
CREATE INDEX idx_tags_slug ON tags(slug);                   -- Faster tag page loading
CREATE INDEX idx_categories_slug ON categories(slug);       -- Faster category page loading

-- Full-text search index for article content
CREATE INDEX idx_articles_fts ON articles 
    USING GIN (to_tsvector('english', title || ' ' || content));  -- Enables text search

/*
 * Sample Data
 * Initial data to populate the database for development
 */

-- Default admin user
-- WARNING: Replace the password hash with a properly hashed password in production
INSERT INTO users (username, email, password_hash, full_name, role) VALUES
('admin1', 'segniassaye2@gmail.com', '$2b$10$hashed_password_here', 'Admin User', 'admin');
('admin2', 'nahiabi78@gmail.com', '$2b$10$hashed_password_here', 'Admin User', 'admin');

-- Default categories for organizing content
INSERT INTO categories (name, slug, description) VALUES
('Web Development', 'web-development', 'Articles about web development technologies and frameworks'),
('Mobile', 'mobile', 'Mobile app development articles'),
('UI/UX', 'ui-ux', 'User interface and experience design'),
('DevOps', 'devops', 'DevOps practices and tools'),
('Data Science', 'data-science', 'Data analysis and machine learning'),


-- Common tags for categorizing content
INSERT INTO tags (name, slug) VALUES
('React', 'react'),
('Next.js', 'nextjs'),
('TypeScript', 'typescript'),
('Node.js', 'nodejs'),
('Python', 'python'),
('AWS', 'aws'),
('JavaScript', 'javascript'),
('CSS', 'css'),
('HTML', 'html');


/*
 * Automatic Timestamp Updates
 * Functions and triggers to automatically update 'updated_at' fields
 */

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Timestamp update function to relevant tables
CREATE TRIGGER update_users_modtime
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_articles_modtime
BEFORE UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_comments_modtime
BEFORE UPDATE ON comments
FOR EACH ROW EXECUTE FUNCTION update_modified_column();
