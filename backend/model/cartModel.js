const db = require('../config/db');

exports.addToCart = (user_id, prod_id, quantity, color, callback) => {
  const sql = `
    INSERT INTO cart (user_id, prod_id, quantity, color)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      quantity = quantity + VALUES(quantity),
      color = VALUES(color)
  `;
  
  db.query(sql, [user_id, prod_id, quantity, color], callback);
};


exports.getCartByUser = (user_id, callback) => {
  const sql = `
    SELECT 
      products.*, 
      category.cat_name AS category_name, 
      badges.badge_name AS badge_name,
      GROUP_CONCAT(product_images.img_path) AS images,
      cart.quantity AS quantity,
      cart.color AS color
    FROM cart
    INNER JOIN products ON cart.prod_id = products.prod_id
    INNER JOIN category ON products.cat_id = category.cat_id
    INNER JOIN badges ON products.badge_id = badges.badge_id
    LEFT JOIN product_images ON products.prod_id = product_images.prod_id
    WHERE cart.user_id = ? 
      AND products.prod_status = 1
    GROUP BY products.prod_id, cart.color, cart.quantity
  `;
  db.query(sql, [user_id], callback);
};



exports.updateQuantity = (prod_id, quantity, callback) => {
  db.query(`UPDATE cart SET quantity = ? WHERE prod_id = ?`, [quantity, prod_id], callback);
};

exports.removeFromCart = (user_id, prod_id, callback) => {
  const sql = `DELETE FROM cart WHERE user_id = ? AND prod_id = ?`;
  db.query(sql, [user_id, prod_id], callback);
};
