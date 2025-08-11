const db = require('../config/db');

// Check if product is in wishlist
exports.isInWishlist = (userId, prodId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM wishlist WHERE user_id = ? AND prod_id = ?',
      [userId, prodId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.length > 0);
      }
    );
  });
};

// Add to wishlist
exports.addToWishlist = (userId, prodId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO wishlist (user_id, prod_id) VALUES (?, ?)',
      [userId, prodId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// Remove from wishlist
exports.removeFromWishlist = (userId, prodId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM wishlist WHERE user_id = ? AND prod_id = ?',
      [userId, prodId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

// Get all wishlist items for a user
exports.getWishlistByUser = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        p.*, 
        c.cat_name AS category_name, 
        b.badge_name AS badge_name,
        GROUP_CONCAT(pi.img_path) AS images
      FROM wishlist w
      INNER JOIN products p ON w.prod_id = p.prod_id
      INNER JOIN category c ON p.cat_id = c.cat_id
      INNER JOIN badges b ON p.badge_id = b.badge_id
      LEFT JOIN product_images pi ON p.prod_id = pi.prod_id
      WHERE w.user_id = ? 
        AND p.prod_status = 1
      GROUP BY p.prod_id
    `;
    
    db.query(sql, [userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

