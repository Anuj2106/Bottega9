const db = require("../config/db");
const { getActive } = require("./subcategoryModel");

const Item = {
  // Get all items (with subcategory name)
  getAll: (callback) => {
    db.query(
      `
      SELECT i.*, s.sub_name 
      FROM items i
      LEFT JOIN subcategory s ON i.sub_id = s.sub_id
      ORDER BY i.item_id DESC
      `,
      (err, results) => {
        if (err) return callback(err);
        callback(null, results);
      }
    );
  },

  // Get single item
  getById: (id, callback) => {
    db.query(`SELECT * FROM items WHERE item_id = ?`, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  // Add new item
  create: (data, callback) => {
    const { item_name, sub_id, status } = data;
    const slug = item_name.toLowerCase().replace(/\s+/g, "-");
    db.query(
      `INSERT INTO items (item_name, slug, sub_id, item_status) VALUES (?, ?, ?, ?)`,
      [item_name, slug, sub_id, status],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results);
      }
    );
  },

  // Update item
  update: (id, data, callback) => {
    const { item_name, sub_id, status } = data;
    const slug = item_name.toLowerCase().replace(/\s+/g, "-");
    db.query(
      `UPDATE items SET item_name=?, slug=?, sub_id=?, item_status=? WHERE item_id=?`,
      [item_name, slug, sub_id, status, id],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results);
      }
    );
  },

  // Delete item
  delete: (id, callback) => {
    db.query(`DELETE FROM items WHERE item_id = ?`, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  //Get active items 
  getActive: (callback) => {
    db.query(`SELECT * FROM items WHERE item_status = 1`, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },


};

module.exports = Item;
