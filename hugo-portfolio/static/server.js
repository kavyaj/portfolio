const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const { marked } = require("marked");
const app = express();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Add CORS headers for Replit preview
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(".", {
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Ensure index.html is served for root requests
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Blog API endpoints
app.get('/api/blog/posts', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, slug, excerpt, created_at FROM blog_posts WHERE published = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

app.get('/api/blog/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE slug = $1 AND published = true',
      [slug]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// Admin endpoints for creating/editing posts
app.post('/api/admin/blog/posts', async (req, res) => {
  try {
    const { title, content, published = false } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Convert markdown to HTML
    const htmlContent = marked(content);
    
    // Generate excerpt (first 150 characters of content)
    const excerpt = content.replace(/[#*`]/g, '').substring(0, 150) + (content.length > 150 ? '...' : '');

    const result = await pool.query(
      'INSERT INTO blog_posts (title, slug, content, markdown_content, excerpt, published) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, slug, htmlContent, content, excerpt, published]
    );

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({ error: 'A post with this title already exists' });
    }
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

app.put('/api/admin/blog/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Generate new slug if title changed
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    const htmlContent = marked(content);
    const excerpt = content.replace(/[#*`]/g, '').substring(0, 150) + (content.length > 150 ? '...' : '');

    const result = await pool.query(
      'UPDATE blog_posts SET title = $1, slug = $2, content = $3, markdown_content = $4, excerpt = $5, published = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [title, slug, htmlContent, content, excerpt, published, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

app.delete('/api/admin/blog/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// Get all posts for admin (including unpublished)
app.get('/api/admin/blog/posts', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching admin blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Initialize database
async function initializeDatabase() {
  try {
    const fs = require('fs');
    const sql = fs.readFileSync(path.join(__dirname, 'blog.sql'), 'utf8');
    await pool.query(sql);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

const port = process.env.PORT || 5000;

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Static server running on http://0.0.0.0:${port}`);
    console.log(`Preview available at: http://localhost:${port}`);
  });
});
