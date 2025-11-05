const Order = require('../model/orderModel');
const { sendOrderConfirmation } = require('../utils/emailServies');


// ============================================
// 🧍 USER SIDE
// ============================================

// ✅ Place New Order
exports.placeOrder = (req, res) => {
  const {
    user_id, name, email, contact, address, city, state, zip,
    items, subtotal, shippingFee, grandTotal,prod_name
  } = req.body;

  const orderData = {
    user_id, name, email, contact, address, city, state, zip,
    subtotal, shipping_fee: shippingFee, grand_total: grandTotal,
  };

  Order.createOrder(orderData, (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err.message });

    const order_id = result.insertId;

    items.forEach(item => {
      const price =
        item.prodoffer_prize && item.prodoffer_prize < item.prod_price
          ? item.prodoffer_prize
          : item.prod_price;

      const total_price = price * item.quantity;

      Order.addOrderItem(order_id, {
        prod_id: item.prod_id,
        quantity: item.quantity,
        color: item.color,
        price,
        total_price,
      }, (err) => {
        if (err) console.error("Error adding order item:", err);
      });

      Order.updateProductStock(item.prod_id, item.quantity, (err) => {
        if (err) console.error("Error updating stock:", err);
      });
    });

    Order.clearUserCart(user_id, (err) => {
      if (err) console.error("Error clearing cart:", err);
    });

    // ✅ Send email confirmation (non-blocking)
    sendOrderConfirmation(email, {
      name,
      prod_name,
      order_id,
      subtotal,
      shipping_fee: shippingFee,
      grand_total: grandTotal,
      items,
    });

    res.status(200).json({
      success: true,
      message: "Order placed successfully and confirmation email sent!",
      order_id,
    });
  });
};


// ✅ Get All Orders for a User
exports.getUserOrders = (req, res) => {
  const { user_id } = req.params;
  Order.getOrdersByUser(user_id, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

// ✅ Get Single Order Details for User
exports.getOrderDetails = (req, res) => {
  const { order_id, user_id } = req.params;
  Order.getOrderDetails(order_id, user_id, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

// ============================================
// 🧑‍💼 ADMIN SIDE
// ============================================

// ✅ Admin: View all orders
exports.getAllOrders = (req, res) => {
  Order.getAllOrders((err, results) => {
    if (err) return res.status(500).json({ error: err.message || "Database error" });
    res.json({ orders: results });
  });
};


// ✅ Admin: View one order with full details
exports.getOrderDetailsAdmin = (req, res) => {
  const { order_id } = req.params;
  Order.getOrderDetailsAdmin(order_id, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
};

// ✅ Admin: Update order status
exports.updateOrderStatus = (req, res) => {
  const { order_id } = req.params;
  const { status } = req.body;

  Order.updateOrderStatus(order_id, status, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ success: true, message: "Order status updated successfully" });
  });
};
