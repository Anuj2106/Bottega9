    const express = require("express");
    const router = express.Router();
    const shopController = require("../controllers/shopController");

    // GET products by category
    router.get("/:category", shopController.getProductsByCategory);

    // GET products by category + subcategory
    router.get("/:category/:subcategory", shopController.getProductsBySubCategory);
    // GET products by category + subcategory + item
    router.get("/:category/:subcategory/:item", shopController.getByItem);

    module.exports = router;
