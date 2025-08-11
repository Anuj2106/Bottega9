const db = require('../config/db');
const fs = require("fs");
const path = require("path");
// Get all testimonials
exports.getAll = (callback) => {
  db.query("SELECT * FROM testimonials ORDER BY id DESC", callback);
};

// Add new testimonial
exports.create = (data, callback) => {
  const { name, message, user_image, rating, video_url, status } = data;
  const sql = `INSERT INTO testimonials (name, message, user_image, rating, video_url, status) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [name, message, user_image, rating, video_url, status || 1];
  db.query(sql, values, callback);
};

// Update testimonial
exports.update = (id, data, callback) => {
  const { name, message, user_image, rating, video_url, status } = data;
  const sql = `UPDATE testimonials SET name=?, message=?, user_image=?, rating=?, video_url=?, status=? WHERE id=?`;
  const values = [name, message, user_image, rating, video_url, status, id];
  db.query(sql, values, callback);
};

// Delete testimonial;

const IMAGE_DIR = path.join(__dirname, "../public/uploads/images");
const VIDEO_DIR = path.join(__dirname, "../public/uploads/videos");

exports.remove = (id, callback) => {
  // Step 1: Get testimonial details
  db.query("SELECT user_image, video_url FROM testimonials WHERE id = ?", [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(new Error("Testimonial not found"));

    const { user_image, video_url } = results[0];

    // Step 2: Delete image file
    if (user_image) {
      const imagePath = path.join(IMAGE_DIR, user_image);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error("Error deleting image:", err);
        });
      }
    }

    // Step 3: Delete video file
    if (video_url) {
      const videoPath = path.join(VIDEO_DIR, video_url);
      if (fs.existsSync(videoPath)) {
        fs.unlink(videoPath, (err) => {
          if (err) console.error("Error deleting video:", err);
        });
      }
    }

    // Step 4: Delete testimonial from DB
    db.query("DELETE FROM testimonials WHERE id = ?", [id], callback);
  });
};
