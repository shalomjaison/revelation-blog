import express from 'express';
import cors from 'cors';
import { pool } from './db';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateToken } from './middleware/auth';

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000',
    /\.vercel\.app$/,
  ],
}));
app.use(express.json());

// GET all posts
app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT posts.*, users.full_name AS author_name
       FROM posts
       LEFT JOIN users ON posts.user_id = users.user_id
       ORDER BY posts.created_date DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// GET single post by slug
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      'SELECT * FROM posts WHERE slug = $1',
      [slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.user_id, email: user.email, name: user.full_name } });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE POST (Protected)
app.post('/api/posts', authenticateToken, async (req, res) => {
  try {
    const { title, content, slug, header_image_file_path } = req.body;
    const userId = (req as any).user.userId;
    
    const result = await pool.query(
      `INSERT INTO posts (post_id, user_id, title, content, slug, header_image_file_path) 
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) 
       RETURNING *`,
      [userId, title, content, slug, header_image_file_path]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE POST (Protected)
app.put('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, slug, header_image_file_path } = req.body;
    
    const result = await pool.query(
      `UPDATE posts 
       SET title = $1, content = $2, slug = $3, header_image_file_path = $4, edited_date = NOW() 
       WHERE post_id = $5 
       RETURNING *`,
      [title, content, slug, header_image_file_path, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE POST (Protected)
app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM posts WHERE post_id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});