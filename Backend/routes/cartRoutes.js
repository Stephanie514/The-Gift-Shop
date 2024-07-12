const express = require('express');
const router = express.Router();
const { getCart, addItemToCart, removeItemFromCart } = require('../controllers/cartController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, getCart);
router.post('/add', auth, addItemToCart);
router.post('/remove', auth, removeItemFromCart);

module.exports = router;