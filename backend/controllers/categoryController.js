// controllers/categoryController.js
const Category = require('../model/categoryModel');

exports.showCategoryPage = (req, res) => {
  Category.getAllCategories((err, categories) => {
    if (err) return res.status(500).send('Error fetching data');
    res.json(categories);
  
    
  });
};
