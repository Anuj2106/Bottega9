const db = require('../config/db');

// ✅ Get all orders
exports.getAllOrders = (callback) => {
const query = `
    SELECT orders.*, user.user_name
    FROM orders
    JOIN user ON orders.user_id = user.user_id
`;
  db.query(query, callback);
};

// ✅ Update order status
exports.updateOrderStatus = (order_id, order_status, callback) => {
  const query = `
    UPDATE orders
    SET order_status = ?
    WHERE order_id = ?
  `;
  db.query(query, [order_status, order_id], callback);
};

// For Order Items
exports.OrderItem = (req, res) => {
  const query = `
SELECT  
  oi.id AS order_item_id,  
  oi.order_id,  
  oi.prod_id,  
  p.prod_name,  
  oi.quantity,  
  oi.price,  
  oi.price
FROM  
  order_items oi
JOIN  
  products p ON oi.prod_id = p.prod_id `;
  
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching order items:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
};