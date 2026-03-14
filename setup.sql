-- Create users table first (posts depends on it)
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    joined_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    full_name VARCHAR(255) NOT NULL,
    profile_pic_path TEXT,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

-- Create posts table
CREATE TABLE posts (
    post_id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(user_id),
    header_image_file_path text NOT NULL,
    created_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    edited_date TIMESTAMPTZ,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE
);
