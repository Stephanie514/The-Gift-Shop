// controllers/shopController.js
const Shop = require('../models/Shop');
const User = require('../models/User');
const Product = require('../models/Product');

// Create a new shop
exports.createShop = async (req, res) => {
  try {
    const { name, description } = req.body;
    const shop = new Shop({
      name,
      description,
      owner: req.user.id
    });
    await shop.save();

    // Add shop to user's shops
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.shops.push(shop._id);
    await user.save();

    res.status(201).json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get shops by user/owner
exports.getShopsByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is set by authentication middleware
    const shops = await Shop.find({ owner: userId });

    if (shops.length === 0) {
      return res.status(404).json({ message: 'No shops found for this user' });
    }

    res.status(200).json(shops);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get shop by shopID
exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).populate('products');
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products in a shop
exports.getProductsByShop = async (req, res) => {
  try {
    const shopId = req.params.id;

    // Find the shop
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    // Get all products in the shop
    const products = await Product.find({ shop: shopId });
    
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get All shops
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json(shops);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new product in a shop
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, thumbnail, images, reviews, averageRating, occasion, gender, stockNumbers } = req.body;
    const { id: shopId } = req.params;

    if (!name || !description || !price || !category || !shopId || !gender || !occasion) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Create a new product
    const product = new Product({
      name,
      description,
      price,
      category,
      thumbnail,
      images,
      reviews,
      averageRating,
      occasion,
      gender,
      stockNumbers,
      shop: shopId // Link product to the shop
    });

    const newProduct = await product.save();

    // Add product to the shop
    await Shop.findByIdAndUpdate(
      shopId,
      { $push: { products: newProduct._id } },
      { new: true }
    );

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};