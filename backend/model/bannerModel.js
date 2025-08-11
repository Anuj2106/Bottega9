const db = require('../config/db');

const Banner = {
   index: (page, callback) => {
    let sql = 'SELECT * FROM banners';
    const values = [];

    if (page && page !== 'all') {
      sql += ' WHERE banner_page = ?';
      values.push(page);
    }

    db.query(sql, values, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  }
,

  getAll: (callback) => {
    db.query('SELECT * FROM banners ORDER BY banner_id DESC', callback);
  },

  create: (data, callback) => {
    db.query(
      'INSERT INTO banners (banner_title,banner_subhead, banner_img, banner_video,banner_page, banner_status) VALUES ( ?,?, ?,?, ?, ?)',
      [
        data.banner_title,
        data.banner_subhead,
        data.banner_img || '',
        data.banner_video || '',
        data.banner_page ,
        data.status || 1
      ],
      callback
    );
  },

  remove: (id, callback) => {
    db.query('DELETE FROM banners WHERE banner_id = ?', [id], callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM banners WHERE banner_id = ?', [id], callback);
  },

  update: (id, data, callback) => {
    db.query(
      'UPDATE banners SET banner_title = ?, banner_img = ?, banner_video = ?, banner_status = ? WHERE banner_id = ?',
      [
        data.banner_title,
        data.banner_img || '',
        data.banner_video || '',
        data.status || 1,
        id
      ],
      callback
    );
  },
statusToggle: (status, id, callback) => {
  db.query('UPDATE banners SET banner_status = ? WHERE banner_id = ?', [status, id], callback);
}

};

module.exports = Banner;
