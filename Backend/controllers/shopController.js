// controllers/shopController.js
const Shop = require('../models/Shop');
const User = require('../models/User');

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

exports.getShopsByUser = async (req, res) => {
  try {
    const shops = await Shop.find({ owner: req.user.id });
    res.status(200).json(shops);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
