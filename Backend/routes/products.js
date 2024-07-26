// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Search products by keyword
router.get('/search', productController.searchProducts);

// Get all products or filter by category
router.get('/', productController.getAllProducts);

// Get filter options
router.get('/filters', productController.getFilterOptions);

// Get product by ID
router.get('/:id', productController.getProductById);

// Create new product
router.post('/', productController.createProduct);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

// Get products for a specific shop
router.get('/shop/:shopId', productController.getProductsForShop);

// Update product availability
router.patch('/:id/availability', productController.updateProductAvailability);

module.exports = router;
