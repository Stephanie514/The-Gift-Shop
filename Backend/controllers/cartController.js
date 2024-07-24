/*const Cart = require('../models/Cart');*/

/*exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.removeItemFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};*/

const CartItem = require('../models/cartItem'); // Make sure to import the CartItem model

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const userId = req.user.id; // Extract user ID from auth middleware

    // Validate input
    if (!product || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const newCartItem = new CartItem({ user: userId, product, quantity });
    await newCartItem.save();
    res.status(200).json({ message: 'Product added to cart' });
  } catch (err) {
    console.error('Error adding product to cart:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const itemId = req.params.id;

    // Validate input
    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const result = await CartItem.findByIdAndDelete(itemId);

    if (!result) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (err) {
    console.error('Error removing product from cart:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// View cart items
exports.viewCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const cartItems = await CartItem.find({ user: userId }).populate('product');

    if (!cartItems.length) {
      return res.status(404).json({ message: 'No items in cart' });
    }

    res.status(200).json(cartItems);
  } catch (err) {
    console.error('Error viewing cart:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};