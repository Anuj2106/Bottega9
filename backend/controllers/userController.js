const db = require('../config/db');

// Get all users (for modal)
exports.getAllUsers = (req, res) => {
  const sql = 'SELECT  user.user_id, user.user_name, user.user_email, user.role_id, role.role_name, user.user_status FROM  user JOIN role ON user.role_id = role.role_id;';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    res.json(results); // Send user data as JSON
  });
};
exports.toggleUserStatus = (req, res) => {
  const userId = req.params.id;
  const { status } = req.body; // New status from frontend

  const sql = 'UPDATE user SET user_status = ? WHERE user_id = ?';

  db.query(sql, [status, userId], (err, result) => {
    if (err) {
      console.error('Error updating user status:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User status updated successfully' });
  });
};
