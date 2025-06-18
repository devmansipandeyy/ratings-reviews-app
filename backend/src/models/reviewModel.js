const pool = require('../config/db');

const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT
    );
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      product_id INTEGER REFERENCES products(id),
      user_id VARCHAR(50) NOT NULL,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5),
      review_text TEXT,
      tags TEXT[],
      photo_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    INSERT INTO products (name, description) VALUES
      ('Laptop', 'High-performance laptop'),
      ('Headphones', 'Noise-cancelling headphones'),
      ('Smartphone', 'Latest model smartphone')
    ON CONFLICT DO NOTHING;
  `);
};

const addReview = async (productId, userId, rating, reviewText, tags, photoUrl) => {
  const existingReview = await pool.query(
    'SELECT * FROM reviews WHERE product_id = $1 AND user_id = $2',
    [productId, userId]
  );
  if (existingReview.rows.length > 0) {
    throw new Error('User has already reviewed this product');
  }
  const result = await pool.query(
    'INSERT INTO reviews (product_id, user_id, rating, review_text, tags, photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [productId, userId, rating || null, reviewText || null, tags || [], photoUrl || null]
  );
  return result.rows[0];
};

const getProductReviews = async (productId) => {
  const reviews = await pool.query(
    'SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC',
    [productId]
  );
  const avgRating = await pool.query(
    'SELECT AVG(rating)::numeric(10,2) as avg_rating FROM reviews WHERE product_id = $1 AND rating IS NOT NULL',
    [productId]
  );
  return { reviews: reviews.rows, avgRating: avgRating.rows[0].avg_rating };
};

const getTopTags = async (limit = 5) => {
  const result = await pool.query(
    'SELECT tag, COUNT(*) as count FROM (SELECT unnest(tags) as tag FROM reviews) tags GROUP BY tag ORDER BY count DESC LIMIT $1',
    [limit]
  );
  return result.rows;
};

const getReviewsByTag = async (productId, tag) => {
  const reviews = await pool.query(
    'SELECT * FROM reviews WHERE product_id = $1 AND $2 = ANY(tags) ORDER BY created_at DESC',
    [productId, tag]
  );
  return reviews.rows;
};

module.exports = { createTables, addReview, getProductReviews, getTopTags, getReviewsByTag };