const db = require('../config/db');

const Order = {
  // ✅ Create Order
  createOrder: (orderData, callback) => {
    const {
      user_id, name, email, contact, address,
      city, state, zip, subtotal, shipping_fee, grand_total
    } = orderData;

    const sql = `
      INSERT INTO orders (
        user_id, name, email, contact, address, city, state, zip,
        subtotal, shipping_fee, grand_total
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [user_id, name, email, contact, address, city, state, zip, subtotal, shipping_fee, grand_total],
      callback
    );
  },

  // ✅ Add Order Items
  addOrderItem: (order_id, item, callback) => {
    const { prod_id, quantity, color, price, total_price } = item;
    const sql = `
      INSERT INTO order_items (order_id, prod_id, quantity, color, price, total_price)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [order_id, prod_id, quantity, color, price, total_price], callback);
  },

  // ✅ Update Stock Quantity
  updateProductStock: (prod_id, qty, callback) => {
    const sql = `UPDATE products SET stock_quantity = stock_quantity - ? WHERE prod_id = ?`;
    db.query(sql, [qty, prod_id], callback);
  },

  // ✅ Clear Cart after order placed
  clearUserCart: (user_id, callback) => {
    const sql = `DELETE FROM cart WHERE user_id = ?`;
    db.query(sql, [user_id], callback);
  },

  // ✅ User: Get All Orders
  getOrdersByUser: (user_id, callback) => {
    const sql = `
      SELECT 
        order_id, subtotal, shipping_fee, grand_total,
        order_status, created_at
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
    db.query(sql, [user_id], callback);
  },

  // ✅ User: Get Single Order Details
  getOrderDetails: (order_id, user_id, callback) => {
    const sql = `
      SELECT 
        o.order_id, o.name, o.email, o.contact, o.address, o.city, o.state, o.zip,
        o.subtotal, o.shipping_fee, o.grand_total, o.order_status, o.created_at,
        oi.prod_id, oi.quantity, oi.color, oi.price, oi.total_price,
        p.prod_name, GROUP_CONCAT(pi.img_path) AS images
      FROM orders o
      INNER JOIN order_items oi ON o.order_id = oi.order_id
      INNER JOIN products p ON oi.prod_id = p.prod_id
      LEFT JOIN product_images pi ON p.prod_id = pi.prod_id
      WHERE o.order_id = ? AND o.user_id = ?
      GROUP BY oi.id
    `;
    db.query(sql, [order_id, user_id], callback);
  },

  // ✅ Admin: Get All Orders (with user info)
  getAllOrders: (callback) => {
    const sql = `
      SELECT o.order_id, o.user_id, o.name , o.contact,o.address,o.city,o.state,o.zip, o.email , o.subtotal, o.shipping_fee, o.grand_total, o.order_status, o.created_at FROM orders o LEFT JOIN user u ON o.user_id = u.user_id ORDER BY o.created_at DESC;
    `;
    db.query(sql, callback);
  },

  // ✅ Admin: Get Full Order Details (with items)
  getOrderDetailsAdmin: (order_id, callback) => {
    const sql = `
      SELECT 
        o.order_id, o.user_id, u.name AS user_name, u.email AS user_email,
        o.contact, o.address, o.city, o.state, o.zip,
        o.subtotal, o.shipping_fee, o.grand_total, o.order_status, o.created_at,
        oi.prod_id, oi.quantity, oi.color, oi.price, oi.total_price,
        p.prod_name, GROUP_CONCAT(pi.img_path) AS images
      FROM orders o
      INNER JOIN order_items oi ON o.order_id = oi.order_id
      INNER JOIN products p ON oi.prod_id = p.prod_id
      LEFT JOIN product_images pi ON p.prod_id = pi.prod_id
      LEFT JOIN user u ON o.user_id = u.user_id
      WHERE o.order_id = ?
      GROUP BY oi.id
    `;
    db.query(sql, [order_id], callback);
  },

  // ✅ Admin: Update Order Status
  updateOrderStatus: (order_id, status, callback) => {
    const sql = `UPDATE orders SET order_status = ? WHERE order_id = ?`;
    db.query(sql, [status, order_id], callback);
  },
};

module.exports = Order;
