const Cart = require('../model/cartModel');

exports.addToCart = (req, res) => {
  const { user_id, prod_id, quantity } = req.body;
  Cart.addToCart(user_id, prod_id, quantity || 1, (err, result) => {
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
