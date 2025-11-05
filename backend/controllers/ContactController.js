const db = require('../config/db'); // your MySQL connection

exports.submitContactForm = (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }

  const sql = 'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone || '', message], (err, result) => {
    if (err) {
      console.error('Error saving contact message:', err);
      return res.status(500).json({ success: false, error: 'Failed to save message' });
    }

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  });
};
