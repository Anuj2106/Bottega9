// controllers/categoryController.js
const Category = require('../model/categoryModel');
const slugify = require('slugify');

exports.showCategoryPage = (req, res) => {
  Category.getAllCategories((err, categories) => {
    if (err) return res.status(500).send('Error fetching data');
    res.json(categories);  
  });
};

exports.getCategories = (req, res) => {
  Category.getAllCategory((err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).json({ error: "Failed to fetch categories" });
    }

    const categories = {};

    results.forEach((row) => {
      // 🔹 Step 1: Create or find the category
      if (!categories[row.cat_id]) {
        categories[row.cat_id] = {
          key: row.cat_slug,
          label: row.cat_name,
          slug: `${row.cat_slug}`,
          subcategories: [], // new nested layer
        };
      }

      const currentCategory = categories[row.cat_id];

      // 🔹 Step 2: Create or find the subcategory under this category
      if (row.sub_id) {
        let subcategory = currentCategory.subcategories.find(
          (s) => s.slug === row.sub_slug
        );

        if (!subcategory) {
          subcategory = {
            label: row.sub_name,
            slug: row.sub_slug,
            items: [],
          };
          currentCategory.subcategories.push(subcategory);
        }

        // 🔹 Step 3: Add items under this subcategory
        if (row.item_id) {
          subcategory.items.push({
            label: row.item_name,
            slug: row.item_slug,
            href: `${row.cat_slug}/${row.sub_slug}/${row.item_slug}`,
          });
        }
      }
    });

    // 🔹 Step 4: Convert object to array and send response
    res.json(Object.values(categories));
  });
};


// ✅ Add new category (auto-slugify if not provided)
exports.addCategory = (req, res) => {
  const { cat_name, slug, cat_status } = req.body;

  if (!cat_name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  // Auto-generate slug from name if not provided
  const finalSlug = slug ? slug : slugify(cat_name, { lower: true, strict: true });

  Category.addCategory(cat_name, finalSlug, cat_status || 1, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to add category" });
    res.json({ message: "Category added successfully", id: result.insertId });
  });
};

// ✅ Update category (auto-slugify if not provided)
exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { cat_name, slug, status } = req.body;
  console.log(req.body);
  

  if (!cat_name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  // Auto-generate slug if missing
  const finalSlug = slug ? slug : slugify(cat_name, { lower: true, strict: true });
  

  Category.updateCategory(id, { cat_name, slug: finalSlug, status }, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to update category" });
    res.json({ message: "Category updated successfully" });
  });
};

// ✅ Delete category
exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  Category.deleteCategory(id, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete category" });
    res.json({ message: "Category deleted successfully" });
  });
};
// categoryController.js
exports.getActiveCategories = (req, res) => {
  Category.getAllCategories((err, result) => {
    if (err) return res.status(500).json({ error: "Failed to fetch categories" });
    // Filter only active categories (cat_status = 1)
    const activeCategories = result.filter(cat => cat.cat_status === 1);
    res.json(activeCategories);
  });
};
