const Shop = require("../model/shopModel");

// GET products by category
// GET products by category
exports.getProductsByCategory = (req, res) => {
  const { category } = req.params;
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  console.log(
    limit,offset
  );
  

  Shop.getByCategory(category, limit, offset, (err, products) => {
    if (err) {
      console.error("Error fetching category products:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (!products.length) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.json(products);
  });
};

// GET products by category + subcategory
exports.getProductsBySubCategory = (req, res) => {
  const { category, subcategory } = req.params;
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  Shop.getByCategoryAndSubCategory(category, subcategory, limit, offset, (err, products) => {
    if (err) {
      console.error("Error fetching subcategory products:", err);
      return res.status(500).json({ error: "Server error" });
    }

    if (!products.length) {
      return res.status(404).json({ message: "No products found for this subcategory" });
    }

    res.json(products);
  });
};
// GET products by category + subcategory + item
exports.getByItem = (req, res) => {
  const { category, subcategory, item } = req.params;
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;

  Product.getByCategorySubcategoryAndItem(category, subcategory, item, limit, offset, (err, results) => {
    if (err) {
      console.error("Error fetching item products:", err);
      return res.status(500).json({ error: "Failed to fetch products for item" });
    }
    res.json(results);
  });
};



