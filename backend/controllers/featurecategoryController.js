const FeaturedCategory = require('../model/featurcategoryModel');
const Category = require('../model/categoryModel'); // Your category model
const path = require('path');
const fs = require('fs');

// Add Featured Category
exports.addFeaturedCategory = (req, res) => {
  const { cat_id } = req.body;

  Category.getById(cat_id, (err, category) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!category.length) return res.status(400).json({ error: 'Category not found' });

    let image_url = null;
    if (req.file) {
      image_url = `/uploads/featured_category/${req.file.filename}`;
    }

    const data = {
      cat_id,
      cat_slug: category[0].slug,
      image_url
    };

    FeaturedCategory.create(data, (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to add featured category' });
      res.json({ message: 'Featured category added successfully', id: result.insertId });
    });
  });
};

// Update Featured Category
exports.updateFeaturedCategory = (req, res) => {
  const id = req.params.id;
  const { cat_id } = req.body;

  FeaturedCategory.getById(id, (err, featured) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!featured.length) return res.status(404).json({ error: 'Featured category not found' });

    Category.getById(cat_id, (err2, category) => {
      if (err2) return res.status(500).json({ error: 'Database error' });
      if (!category.length) return res.status(400).json({ error: 'Category not found' });

      let image_url = featured[0].image_url;
      if (req.file) {
        // Delete old image
        if (image_url) {
          const oldPath = path.join(__dirname, '../public', image_url);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        image_url = `/uploads/featured_category/${req.file.filename}`;
      }

      const data = {
        cat_id,
        cat_slug: category[0].slug,
        image_url
      };

      FeaturedCategory.update(id, data, (err3) => {
        if (err3) return res.status(500).json({ error: 'Failed to update featured category' });
        res.json({ message: 'Featured category updated successfully' });
      });
    });
  });
};

// Delete Featured Category
exports.deleteFeaturedCategory = (req, res) => {
  const id = req.params.id;

  FeaturedCategory.getById(id, (err, featured) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!featured.length) return res.status(404).json({ error: 'Featured category not found' });

    const image_url = featured[0].image_url;
    if (image_url) {
      const oldPath = path.join(__dirname, '../public', image_url);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    FeaturedCategory.delete(id, (err2) => {
      if (err2) return res.status(500).json({ error: 'Failed to delete featured category' });
      res.json({ message: 'Featured category deleted successfully' });
    });
  });
};

// Get All Featured Categories
exports.getAllFeaturedCategories = (req, res) => {
  FeaturedCategory.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
};
