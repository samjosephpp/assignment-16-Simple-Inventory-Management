
const express = require('express');
const router = express.Router();

const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } =  require('../controller/productController');

// Middleware to validate
function validateProduct(req, res, next) {
    const { name, price, description , stockQty } = req.body;
    if (!name || !price || !description || !stockQty) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    next();
}

router.get("/", getProducts);   // Get all products
router.get("/:id", getProductById);   // Get product by id  
router.post("/", validateProduct, createProduct);    // Create new product
router.patch("/:id", validateProduct, updateProduct); // Update existing product
router.delete("/:id", deleteProduct) ; //Delete existing product
 



module.exports = router;
