const db = require("../config/db");

// Get All Products
exports.getBadges = (callback) => {
  const sql = "SELECT * FROM badges";
  db.query(sql, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};