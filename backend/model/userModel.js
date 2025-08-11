const db = require('../config/db');

const User = {
  register: (data, callback) => {
    const query = `
      INSERT INTO user (user_name, user_email, user_pass, role_id, user_status)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
      query,
      [data.user_name, data.user_email, data.user_pass, data.role_id, 1],
      callback
    );
  },

  findByEmail: (email, callback) => {
    const query = "SELECT * FROM user WHERE user_email = ?";
    db.query(query, [email], callback);
  },

  findUserByEmail: (email, callback) => {
    const query = "SELECT * FROM user WHERE user_email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return callback(err, null);
      return callback(null, results[0]); // Return single user
    });
  },

};

module.exports = User;

