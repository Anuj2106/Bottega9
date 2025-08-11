const Wishlist = require('../model/wishlistModel');

exports.toggleWishlist = async (req, res) => {
  const { user_id, prod_id } = req.body;
  console.log(user_id,prod_id);
  

  try {
    const exists = await Wishlist.isInWishlist(user_id, prod_id);

    if (exists) {
      await Wishlist.removeFromWishlist(user_id, prod_id);
      res.json({ message: 'Removed from wishlist', isWishlisted: false });
    } else {
      await Wishlist.addToWishlist(user_id, prod_id);
      res.json({ message: 'Added to wishlist', isWishlisted: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getWishlist = async (req, res) => {
  const { user_id } = req.params;

  try {
    const items = await Wishlist.getWishlistByUser(user_id);
    res.json( items );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
};
// REMOVE from wishlist (explicit delete)
exports.removeFromWishlist = async (req, res) => {
  try {
    const { user_id, prod_id } = req.params;
    if (!user_id || !prod_id) {
      return res.status(400).json({ error: "User ID and Product ID are required" });
    }

    await Wishlist.removeFromWishlist(user_id, prod_id);
    res.json({ message: "Item removed from wishlist" });
  } catch (err) {
    console.error("Remove from wishlist error:", err);
    res.status(500).json({ error: "Server error removing wishlist item" });
  }
};