// routes/shopRoutes.js
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const authMiddleware = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');

router.post('/', authMiddleware, shopController.createShop);
router.get('/user', authMiddleware, shopController.getShopsByUser);
router.get('/:id', authMiddleware, shopController.getShopById);
router.get('/:id/products', authMiddleware, shopController.getProductsByShop);
router.post('/:id/products', authMiddleware, productController.createProduct);
router.get('/', shopController.getAllShops);

module.exports = router;
