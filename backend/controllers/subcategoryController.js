const SubCategory = require('../model/subcategoryModel');
const slugify = require('slugify');

// Get all subcategories
exports.getAllSubCategories = (req, res) => {
  SubCategory.getAll((err, data) => {
    if (err) {
      console.error("Error fetching subcategories:", err);
      return res.status(500).json({ error: "Failed to fetch subcategories" });
    }
    res.json(data);
  });
};

// Get subcategory by ID
exports.getSubCategoryById = (req, res) => {
  const id = req.params.id;
  SubCategory.getById(id, (err, sub) => {
    if (err) {
      console.error("Error fetching subcategory:", err);
      return res.status(500).json({ error: "Failed to fetch subcategory" });
    }
    if (!sub) return res.status(404).json({ error: "Not found" });
    res.json(sub);
  });
};

// Create new subcategory
// Create new subcategory
exports.createSubCategory = (req, res) => {
  const { sub_name, cat_id, sub_status } = req.body;
  const slug = req.body.slug ? req.body.slug : slugify(sub_name, { lower: true, strict: true });
  const status = sub_status !== undefined ? sub_status : 1;

  if (!sub_name || !cat_id) {
    return res.status(400).json({ error: "Subcategory name and category ID are required" });
  }

  SubCategory.create(sub_name, slug, cat_id, (err, id) => {
    if (err) return res.status(500).json({ error: "Failed to create subcategory" });
    res.json({ message: "Subcategory created", id });
  });
};
// Update subcategory
exports.updateSubCategory = (req, res) => {
  const { sub_name, slug, cat_id, sub_status } = req.body;

  if (!sub_name || !cat_id) {
    return res.status(400).json({ error: "Subcategory name and category ID are required" });
  }

  const finalSlug = slug ? slug : slugify(sub_name, { lower: true, strict: true });
  const status = sub_status !== undefined ? sub_status : 1;

  SubCategory.update(req.params.id, sub_name, finalSlug, cat_id, status, (err, result) => {
    if (err) {
      console.error("Error updating subcategory:", err);
      return res.status(500).json({ error: "Failed to update subcategory" });
    }
    if (!result) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Subcategory updated" });
  });
};

// Delete subcategory
exports.deleteSubCategory = (req, res) => {
  SubCategory.delete(req.params.id, (err, result) => {
    if (err) {
      console.error("Error deleting subcategory:", err);
      return res.status(500).json({ error: "Failed to delete subcategory" });
    }
    if (!result) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Subcategory deleted" });
  });
};
