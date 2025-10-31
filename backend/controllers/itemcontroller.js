// controllers/itemController.js
const Item = require('../model/itemmodel');
const slugify = require('slugify'); // ✅ added slugify
// Get all items (for DataGrid)
exports.showItemsPage = (req, res) => {
  Item.getAll((err, items) => {
    if (err) return res.status(500).json({ error: 'Error fetching items' });
    res.json(items);
  });
};

exports
// Add new item
exports.addItem = (req, res) => {
  const { item_name, sub_id, status, slug } = req.body;
  if (!item_name) return res.status(400).json({ error: 'Item name is required' });

  const finalSlug = slug ? slug : slugify(item_name, { lower: true, strict: true });

  Item.create({ item_name, sub_id, status, slug: finalSlug }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to add item' });
    res.json({ message: 'Item added successfully', id: result.insertId });
  });
};

// Update item
exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { item_name, sub_id, status, slug } = req.body;
  if (!item_name) return res.status(400).json({ error: 'Item name is required' });

  const finalSlug = slug ? slug : slugify(item_name, { lower: true, strict: true });

  Item.update(id, { item_name, sub_id, status, slug: finalSlug }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update item' });
    res.json({ message: 'Item updated successfully' });
  });
};

// Delete item
exports.deleteItem = (req, res) => {
  const { id } = req.params;
  Item.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete item' });
    res.json({ message: 'Item deleted successfully' });
  });
};

// Get active items (optional)
exports.getActiveItems = (req, res) => {
  Item.getAll((err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch items' });
    const activeItems = results.filter(item => item.item_status === 1);
    res.json(activeItems);
  });
};