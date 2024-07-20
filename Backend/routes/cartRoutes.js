/* const express = require('express');
const router = express.Router();
const { getCart, addItemToCart, removeItemFromCart } = require('../controllers/cartController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, getCart);
router.post('/add', auth, addItemToCart);
router.post('/remove', auth, removeItemFromCart);

module.exports = router;*/

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes for cart operations
router.post('/add', authMiddleware, cartController.addToCart);
router.delete('/remove/:id', authMiddleware, cartController.removeFromCart);
router.get('/view', authMiddleware, cartController.viewCart);

module.exports = router;