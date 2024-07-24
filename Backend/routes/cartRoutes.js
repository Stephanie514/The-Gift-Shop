/*const express = require('express');
const router = express.Router();
const { getCart, addItemToCart, removeItemFromCart } = require('../controllers/cartController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, getCart);
router.post('/add', auth, addItemToCart);
router.post('/remove', auth, removeItemFromCart);

module.exports = router;*/

/*const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

// Routes for cart operations
router.post('/add', authMiddleware, cartController.addToCart);
router.delete('/remove/:id', authMiddleware, cartController.removeFromCart);
router.get('/view', authMiddleware, cartController.viewCart);

module.exports = router;*/

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Update with the correct path
const Product = require('../models/Product'); // Update with the correct path

// Add to cart
router.post('/add', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Add product to the cart (Implement your logic here)
    let cart = await Cart.findOne({ user: req.user._id }); // Assuming you're using authentication and user ID is in req.user._id
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Update cart with new product or quantity
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View cart
router.get('/view', async (req, res) => {
    try {
      // Find the cart for the logged-in user
      const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
      if (!cart) return res.status(404).json({ error: 'Cart not found' });
  
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });  

module.exports = router;