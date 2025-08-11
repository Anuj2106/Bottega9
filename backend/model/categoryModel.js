const db = require('../config/db');

// Get all categories
exports.getAllCategories = (callback) => {
    const sql = "SELECT * FROM category ";
    db.query(sql, (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

// Optional: Add new category
exports.addCategory = (name, callback) => {
    const sql = "INSERT INTO category (name) VALUES (?)";
    db.query(sql, [name], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};
