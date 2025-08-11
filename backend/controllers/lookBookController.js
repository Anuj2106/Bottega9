const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.getLookbooks = (req, res) => {
  const sql = "SELECT * FROM lookbooks";
    db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ lookbooks: results });
    });
};

exports.uploadLookbook = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "PDF file is required" });
  }

  const file_name = req.file.filename;

  const sql = "INSERT INTO lookbooks (file_name) VALUES (?)";
  db.query(sql, [file_name], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.status(200).json({ message: "Look Book uploaded", file: file_name });
  });
};

exports.deleteLookbook = (req, res) => {
  const lookbookId = req.params.id;

  // Step 1: Get the filename from DB
  const selectSql = "SELECT file_name FROM lookbooks WHERE id = ?";
  db.query(selectSql, [lookbookId], (selectErr, selectResult) => {
    if (selectErr) return res.status(500).json({ error: selectErr });

    if (selectResult.length === 0) {
      return res.status(404).json({ message: "Lookbook not found" });
    }

    const fileName = selectResult[0].file_name;
    const filePath = path.join(__dirname, '../public/uploads/lookbooks/', fileName);

    // Step 2: Delete file from disk
    fs.unlink(filePath, (fsErr) => {
      if (fsErr && fsErr.code !== 'ENOENT') {
        return res.status(500).json({ error: "Failed to delete file from server", details: fsErr });
      }

      // Step 3: Delete DB record
      const deleteSql = "DELETE FROM lookbooks WHERE id = ?";
      db.query(deleteSql, [lookbookId], (deleteErr, deleteResult) => {
        if (deleteErr) return res.status(500).json({ error: deleteErr });

        res.status(200).json({ message: "Lookbook deleted successfully" });
      });
    });
  });
};