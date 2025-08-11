// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');

const markAsProductUpload = (req, res, next) => {
  req.body.isProduct = true;
  next();
};

router.get('/product/index', productController.index); // List all products
router.get('/product', productController.show); // Single combined function
router.post('/addproduct', upload.array('prod_img', 5),markAsProductUpload, productController.addproduct);
 // ✅ include full path
router.delete('/product/:id', productController.Delete);
 // Single combined function
//   For toggle status 
 router.put('/product/status/:id', productController.toggleStatus);
//  To put the product edit 
router.put("/product/edit/:id",upload.none(), productController.updateProduct);
router.get('/products/:slug', productController.getProductBySlug);
router.get('/product-image', productController.showProductImages);
router.get('/product/category/:cat_id', productController.getProductsByCategoryController);

module.exports = router;
