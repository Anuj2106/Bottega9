const db = require('../config/db'); // Your MySQL connection

const FeaturedCategory = {};

// Create a new featured category
FeaturedCategory.create = (data, callback) => {
  const sql = 'INSERT INTO featured_category (cat_id, cat_slug, image_url) VALUES (?, ?, ?)';
  db.query(sql, [data.cat_id, data.cat_slug, data.image_url], callback);
};

// Update featured category by ID
FeaturedCategory.update = (id, data, callback) => {
  const sql = 'UPDATE featured_category SET cat_id = ?, cat_slug = ?, image_url = ? WHERE id = ?';
  db.query(sql, [data.cat_id, data.cat_slug, data.image_url, id], callback);
};

// Delete featured category by ID
FeaturedCategory.delete = (id, callback) => {
  const sql = 'DELETE FROM featured_category WHERE id = ?';
  db.query(sql, [id], callback);
};

// Get all featured categories (join with category table for name & slug)
FeaturedCategory.getAll = (callback) => {
  const sql = `
    SELECT f.id, f.image_url, f.cat_id, f.cat_slug, c.cat_name
    FROM featured_category f
    LEFT JOIN category c ON f.cat_id = c.cat_id
    ORDER BY f.id DESC
  `;
  db.query(sql, callback);
};

// Get featured category by ID
FeaturedCategory.getById = (id, callback) => {
  const sql = 'SELECT * FROM featured_category WHERE id = ?';
  db.query(sql, [id], callback);
};

module.exports = FeaturedCategory;
