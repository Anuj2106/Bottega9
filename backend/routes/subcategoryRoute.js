const express = require('express');
 const subCategory=require('../controllers/subcategoryController');

const router = express.Router();

router.get("/subcategory", subCategory.getAllSubCategories);
router.get("/:id", subCategory.getSubCategoryById);
router.post("/subcategory/add", subCategory.createSubCategory);
router.put("/subcategory/:id", subCategory.updateSubCategory);
router.delete("/subcategory/:id", subCategory.deleteSubCategory);

module.exports= router;
