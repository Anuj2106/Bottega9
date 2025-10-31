const db = require('../config/db');

// ✅ Get all categories
exports.getAllCategories = (callback) => {
  const sql = "SELECT * FROM category";
  db.query(sql, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

// ✅ Add new category (with slug + status)
exports.addCategory = (name, slug, status, callback) => {
  const sql = "INSERT INTO category (cat_name, slug, cat_status) VALUES (?, ?, ?)";
  db.query(sql, [name, slug, status], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

// ✅ Get categories with subcategories (active only)
exports.getAllCategory = (callback) => {
  const query = `
    SELECT 
      c.cat_id,
      c.cat_name,
      c.slug AS cat_slug,
      c.cat_status,

      s.sub_id,
      s.sub_name,
      s.slug AS sub_slug,
      s.sub_status,

      i.item_id,
      i.item_name,
      i.slug AS item_slug,
      i.item_status

    FROM category c
    LEFT JOIN subcategory s ON c.cat_id = s.cat_id
    LEFT JOIN items i ON s.sub_id = i.sub_id

    WHERE 
      c.cat_status = 1
      AND (s.sub_status = 1 OR s.sub_status IS NULL)
      AND (i.item_status = 1 OR i.item_status IS NULL)

    ORDER BY c.cat_id, s.sub_id, i.item_id;
  `;

  db.query(query, callback);
};


// ✅ Update category (with slug + status)
exports.updateCategory = (id, data, callback) => {
  const sql = "UPDATE category SET cat_name = ?, slug = ?, cat_status = ? WHERE cat_id = ?";
  db.query(sql, [data.cat_name, data.slug, data.status, id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

// ✅ Delete category
exports.deleteCategory = (id, callback) => {
  const sql = "DELETE FROM category WHERE cat_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

exports.getById=(id, callback) => {
  const sql = 'SELECT * FROM category WHERE cat_id = ?';
  db.query(sql, [id], callback);
};