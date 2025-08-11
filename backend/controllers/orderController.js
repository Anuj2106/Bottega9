const Order = require('../model/orderModel');

// ✅ Get all orders
exports.getAllOrders = (req, res) => {
  Order.getAllOrders((err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
};

// ✅ Update order status
exports.updateOrderStatus = (req, res) => {
  const { order_id } = req.params;
  const { order_status } = req.body;

  const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  if (!validStatuses.includes(order_status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  Order.updateOrderStatus(order_id, order_status, (err, result) => {
    if (err) {
      console.error("Error updating order status:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order status updated successfully" });
  });
};

// For ORder Items 
exports.OrderItem=(req,res)=>{
     Order.OrderItem(req, res, (err, results) => {
        if (err) {
            console.error("Error fetching order items:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.json(results);
        console.log(results);
        
    });
}