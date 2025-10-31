const db = require("../config/db"); // mysql2 pool (not promise)

const SubCategory = {
  // Get all subcategories with their category
  getAll: (callback) => {
    const sql = `
      SELECT s.*, c.cat_name 
      FROM subcategory s 
      JOIN category c ON s.cat_id = c.cat_id
      ORDER BY s.created_at DESC
    `;
    db.query(sql, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

   getActive:(callback)=>{
const sql=`SELECT* FROM  subcategory where sub_status='1'`;
db.query(sql,(err,results)=>{
   if (err) return callback(err, null);
      callback(null, results);
})
   },
  // Get subcategory by ID
  getById: (id, callback) => {
    const sql = `
      SELECT s.*, c.cat_name 
      FROM subcategory s
      JOIN category c ON s.cat_id = c.cat_id
      WHERE s.sub_id = ?
    `;
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0] || null);
    });
  },

  // Create subcategory
  create: (sub_name, slug, cat_id, callback) => {
    const sql = `INSERT INTO subcategory (sub_name, slug, cat_id) VALUES (?, ?, ?)`;
    db.query(sql, [sub_name, slug, cat_id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.insertId);
    });
  },

  // Update subcategory
  update: (id, sub_name, slug, cat_id, sub_status, callback) => {
    const sql = `
      UPDATE subcategory 
      SET sub_name = ?, slug = ?, cat_id = ?, sub_status = ? 
      WHERE sub_id = ?
    `;
    db.query(sql, [sub_name, slug, cat_id, sub_status, id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows);
    });
  },

  // Delete subcategory
  delete: (id, callback) => {
    const sql = `DELETE FROM subcategory WHERE sub_id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows);
    });
  }
};

module.exports = SubCategory;
