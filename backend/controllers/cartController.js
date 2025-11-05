const Cart = require('../model/cartModel');

exports.addToCart = (req, res) => {
  const { user_id, prod_id, quantity ,color} = req.body;
  Cart.addToCart(user_id, prod_id, quantity || 1,color,(err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Added to cart successfully' });
  });
};

exports.getCartByUser = (req, res) => {
  const user_id = req.params.user_id;
  Cart.getCartByUser(user_id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.updateQuantity = (req, res) => {
  const { prod_id, quantity } = req.body;
  
  Cart.updateQuantity(prod_id, quantity, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Quantity updated' });
  });
};

exports.removeFromCart = (req, res) => {
  const user_id = req.params.user_id;
  const prod_id = req.params.prod_id;

  Cart.removeFromCart(user_id,prod_id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Removed from cart' });
  });
};
exports.clearCart = (req, res) => {
  const { user_id } = req.params;

  const sql = `DELETE FROM cart WHERE user_id = ?`;

  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("❌ Error clearing cart:", err);
      return res.status(500).json({ error: "Error clearing cart" });
    }

    res.status(200).json({ message: "✅ Cart cleared successfully" });
  });
};
