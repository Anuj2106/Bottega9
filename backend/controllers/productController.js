const Products = require('../model/productModel');
const Categories = require('../model/categoryModel');
const Badges = require('../model/badgeModel');
const db = require('../config/db');
const slugify = require('slugify'); // ✅ Add this package (npm i slugify)

/**
 * Get products (with categories)
 */
exports.index = (req, res) => {
  Products.index((err, products) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).send('Internal Server Error');
    }

    Categories.getAllCategories((err, categories) => {
      if (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.json({
        products: products,
        categories: categories
      });
    });
  });
};

/**
 * Show all products with categories & badges
 */
exports.show = (req, res) => {
  Products.getAll((err, products) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).send('Internal Server Error');
    }

    Categories.getAllCategories((err, categories) => {
      if (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).send('Internal Server Error');
      }

      Badges.getBadges((err, badges) => {
        if (err) {
          console.error('Error fetching badges:', err);
          return res.status(500).send('Internal Server Error');
        }

        res.json({
          products,
          categories,
          badges
        });
      });
    });
  });
};

/**
 * Add product with slug + new fields + multiple images
 */
exports.addproduct = (req, res) => {
  const slug = slugify(req.body.prod_name, { lower: true, strict: true });

  const data = {
    prod_name: req.body.prod_name,
    slug: slug,
    prod_des: req.body.prod_des,
    prod_price: req.body.prod_price,
    prodoffer_prize: req.body.prodoffer_prize,
    stock_quantity: req.body.stock_quantity || 0,
    category_id: req.body.category_id,
    badge_id: req.body.badge_id || null,
    prod_status: req.body.prod_status,
    prod_review: req.body.prod_review || 0,
    prod_color: req.body.prod_color || null,
    prod_dimensions: req.body.prod_dimensions || null,
    prod_think: req.body.prod_think || null
  };

  // Step 1: Insert product
  Products.addProduct(data, (err, result) => {
    if (err) {
      console.error("Error inserting product:", err);
      return res.status(500).json({ success: false, message: "Failed to add product." });
    }

    const productId = result.insertId;

    // Step 2: Insert multiple images if any
    if (req.files && req.files.length > 0) {
      const imageValues = req.files.map(file => [productId, file.filename]);

      const insertImagesQuery = "INSERT INTO product_images (prod_id, img_path) VALUES ?";
      db.query(insertImagesQuery, [imageValues], (imgErr) => {
        if (imgErr) {
          console.error("Error saving images:", imgErr);
          return res.status(500).json({ success: false, message: "Product added, but image upload failed." });
        }
        return res.status(200).json({ success: true, message: "Product and images added successfully." });
      });
    } else {
      return res.status(200).json({ success: true, message: "Product added without images." });
    }
  });
};

/**
 * Update product with optional new slug
 */
exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const productData = { ...req.body };

  // If product name changed, regenerate slug
  if (productData.prod_name) {
    productData.slug = slugify(productData.prod_name, { lower: true, strict: true });
  }

  Products.updateProductById(productId, productData, (err) => {
    if (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // If new images uploaded
    if (req.files && req.files.length > 0) {
      const imageValues = req.files.map(file => [productId, file.filename]);
      const insertImagesQuery = "INSERT INTO product_images (prod_id, img_path) VALUES ?";
      db.query(insertImagesQuery, [imageValues], (imgErr) => {
        if (imgErr) {
          console.error("Error updating images:", imgErr);
        }
      });
    }

    res.json({ message: "Product updated successfully" });
  });
};

/**
 * Delete product
 */
exports.Delete = (req, res) => {
  const productId = req.params.id;
  Products.deleteProduct(productId, (err, result) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  });
};

/**
 * Toggle product status
 */
exports.toggleStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  Products.statusToggle(id, status, (err) => {
    if (err) {
      console.error("Error toggling status:", err);
      return res.status(500).json({ success: false, message: "Failed to update status." });
    }
    res.status(200).json({ success: true, message: "Status updated successfully." });
  });
};

/**
 * Get products with images
 */
exports.showProductImages = (req, res) => {
  const sql = `
    SELECT p.prod_id, p.prod_name, p.slug, i.img_path
    FROM products p
    LEFT JOIN product_images i ON p.prod_id = i.prod_id
    LIMIT 0, 25
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching product images:', err);
      return res.status(500).send('Server Error');
    }

    // Group images by product
    const groupedProducts = {};
    results.forEach(row => {
      if (!groupedProducts[row.prod_id]) {
        groupedProducts[row.prod_id] = {
          prod_id: row.prod_id,
          prod_name: row.prod_name,
          slug: row.slug,
          images: []
        };
      }
      if (row.img_path) {
        groupedProducts[row.prod_id].images.push(row.img_path);
      }
    });

    const products = Object.values(groupedProducts);
    res.json(products);
  });
};
// Get product by slug controller
exports.getProductBySlug = (req, res) => {
  const { slug } = req.params;

  Products.getProductBySlug(slug, (err, product) => {
    if (err) {
      console.error("Error fetching product by slug:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  });
};