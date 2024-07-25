// Backend/controllers/productController.js

const Product = require('../models/Product');

// Get all products or filter by multiple criteria with pagination and keyword search
exports.getAllProducts = async (req, res) => {
  const { category, price, occasion, shop, gender, availability, keyword, page = 1, limit = 20 } = req.query; // Default to page 1 and limit 20
  try {
    let query = {};

    if (category) query.category = category;
    if (occasion) query.occasion = { $in: occasion.split(',') }; // Supports multiple occasions
    if (shop) query.shop = shop;
    if (gender) query.gender = gender;
    if (availability === 'In Stock') query.stockNumbers = { $gt: 0 };
    if (price) {
      const [minPrice, maxPrice] = price.split(',').map(Number);
      query.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (keyword) {
      const searchRegex = new RegExp(keyword, 'i'); // 'i' makes it case-insensitive
      query.$or = [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        // Add any other fields you want to search through
      ];
    }

    const products = await Product.find(query)
                                  .skip((page - 1) * limit)
                                  .limit(parseInt(limit))
                                  .sort({ name: 1 }); // Sort alphabetically

    const totalProducts = await Product.countDocuments(query);
    
    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get filter options
exports.getFilterOptions = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    const occasions = await Product.distinct('occasion');
    const shops = await Product.distinct('shop');
    const genders = ['His', 'Her', 'Non-Binary'];
    res.json({ categories, occasions, shops, genders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  const { name, description, price, category, thumbnail, images, reviews, averageRating, occasion, shop, gender, stockNumbers } = req.body;

  // Check if required fields are provided
  if (!name || !description || !price || !category || !shop) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  const product = new Product({
    name,
    description,
    price,
    category,
    thumbnail, // Optional
    images, // Optional
    reviews, // Optional
    averageRating, // Optional
    occasion, // New field
    shop, // New field
    gender, // New field
    stockNumbers // New field
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.thumbnail = req.body.thumbnail || product.thumbnail; // Optional
    product.images = req.body.images || product.images; // Optional
    product.reviews = req.body.reviews || product.reviews; // Optional
    product.averageRating = req.body.averageRating || product.averageRating; // Optional
    product.occasion = req.body.occasion || product.occasion; // Updated field
    product.shop = req.body.shop || product.shop; // Updated field
    product.gender = req.body.gender || product.gender; // Updated field
    product.stockNumbers = req.body.stockNumbers || product.stockNumbers; // Updated field

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search products by keyword
exports.searchProducts = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: 'Keyword query parameter is required' });
  }

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ]
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products for a specific shop/user
exports.getProductsForShop = async (req, res) => {
  const { shop } = req.params;
  try {
    const products = await Product.find({ shop })
                                  .sort({ name: 1 }); // Sort alphabetically

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update product availability
exports.updateProductAvailability = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.stockNumbers = req.body.stockNumbers !== undefined ? req.body.stockNumbers : product.stockNumbers;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};