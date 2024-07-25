// routes/shopRoutes.js
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, shopController.createShop);
router.get('/user', authMiddleware, shopController.getShopsByUser);
router.get('/:id', authMiddleware, shopController.getShopById);

module.exports = router;
