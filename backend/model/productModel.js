const db = require("../config/db");

// =======================
// Get Active Products (Index for frontend)
// =======================
exports.index = (callback) => {
  const sql = `
    SELECT 
      products.*, 
      category.cat_name AS category_name, 
      badges.badge_name AS badge_name,
      GROUP_CONCAT(product_images.img_path) AS images
    FROM products
    INNER JOIN category ON products.cat_id = category.cat_id
    INNER JOIN badges ON products.badge_id = badges.badge_id
    LEFT JOIN product_images ON products.prod_id = product_images.prod_id
    WHERE products.prod_status = 1
    GROUP BY products.prod_id
  `;

  db.query(sql, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

// =======================
// Get ALL Products (Admin)
// =======================
exports.getAll = (callback) => {
  const sql = `
    SELECT * 
    FROM products
    INNER JOIN category ON products.cat_id = category.cat_id
    INNER JOIN badges ON products.badge_id = badges.badge_id
  `;
  db.query(sql, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

// =======================
// Get by ID
// =======================
exports.getById = (id, callback) => {
  const query = `
    SELECT *
    FROM products
    INNER JOIN category ON products.cat_id = category.cat_id
    INNER JOIN badges ON products.badge_id = badges.badge_id
    WHERE products.prod_id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// =======================
// Add Product
// =======================
exports.addProduct = (data, callback) => {
  const sql = `
    INSERT INTO products (
      prod_name,
      slug,
      prod_des,
      prod_review,
      prod_price,
      prodoffer_prize,
      stock_quantity,
      cat_id,
      badge_id,
      prod_status,
      prod_color,
      prod_dimensions,
      prod_think
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.prod_name,
      data.slug, // ✅ Handle in controller via slugify
      data.prod_des,
      data.prod_review || 0,
      data.prod_price,
      data.prodoffer_prize || null,
      data.stock_quantity || 0,
      data.category_id || null,
      data.badge_id || null,
      data.prod_status || 1,
      data.prod_color || null,
      data.prod_dimensions || null,
      data.prod_think || null
    ],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    }
  );
};

// =======================
// Update Product by ID
// =======================
exports.updateProductById = (productId, data, callback) => {
  const sql = `
    UPDATE products SET 
      prod_name = ?, 
      slug = ?,
      prod_des = ?, 
      prod_review = ?,
      prod_price = ?, 
      prodoffer_prize = ?, 
      stock_quantity = ?, 
      cat_id = ?, 
      badge_id = ?, 
      prod_status = ?,
      prod_color = ?,
      prod_dimensions = ?,
      prod_think = ?
    WHERE prod_id = ?
  `;

  const values = [
    data.prod_name,
    data.slug, // From controller, regenerated if name changes
    data.prod_des,
    data.prod_review || 0,
    data.prod_price,
    data.prodoffer_prize || null,
    data.stock_quantity || 0,
    data.cat_id,
    data.badge_id || null,
    data.prod_status || 1,
    data.prod_color || null,
    data.prod_dimensions || null,
    data.prod_think || null,
    productId
  ];

  db.query(sql, values, callback);
};

// =======================
// Delete Product by ID
// =======================
exports.deleteProduct = (id, callback) => {
  const sql = "DELETE FROM products WHERE prod_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// =======================
// Toggle Product Status
// =======================
exports.statusToggle = (id, status, callback) => {
  const sql = "UPDATE products SET prod_status = ? WHERE prod_id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};
// =======================
// SLUGS 
// =======================
exports.getProductBySlug = (slug, callback) => {
  const sql = `
    SELECT 
      products.*, 
      category.cat_name,
      badges.badge_name,
      GROUP_CONCAT(product_images.img_path) AS images
    FROM products
    INNER JOIN category ON products.cat_id = category.cat_id
    INNER JOIN badges ON products.badge_id = badges.badge_id
    LEFT JOIN product_images ON products.prod_id = product_images.prod_id
    WHERE products.slug = ?
    GROUP BY products.prod_id
  `;

  db.query(sql, [slug], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0] || null); // Return single product or null
  });
};
// In your Products model file
exports.getProductsByCategory = async (cat_id) => {
  return new Promise((resolve, reject) => {
    const query =`
      SELECT 
        products.*, 
        category.cat_name,
        badges.badge_name,
        GROUP_CONCAT(product_images.img_path) AS images
      FROM products
      INNER JOIN category ON products.cat_id = category.cat_id
      INNER JOIN badges ON products.badge_id = badges.badge_id
      LEFT JOIN product_images ON products.prod_id = product_images.prod_id
      WHERE products.cat_id = ?
      GROUP BY products.prod_id
    `;
    db.query(query, [cat_id], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};
exports.searchProducts = (slug, callback) => {
  const sql = `
    SELECT 
      products.*, 
      category.cat_name,
      badges.badge_name,
      GROUP_CONCAT(product_images.img_path) AS images
    FROM products
    INNER JOIN category ON products.cat_id = category.cat_id
    INNER JOIN badges ON products.badge_id = badges.badge_id
    LEFT JOIN product_images ON products.prod_id = product_images.prod_id
    WHERE products.slug LIKE ?
       OR products.prod_name LIKE ?
       OR products.prod_des LIKE ?
       OR category.cat_name LIKE ?
    GROUP BY products.prod_id
    LIMIT 20
  `;

  const searchTerm = `%${slug}%`;

  db.query(sql, [searchTerm, searchTerm, searchTerm, searchTerm], (err, results) => {
    if (err) {
    
      return callback(err, null);
    }
    callback(null, results);
  });
};




