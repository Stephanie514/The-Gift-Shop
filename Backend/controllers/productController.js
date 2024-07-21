// controllers/productController.js

const Product = require('../models/Product');

// Get all products or filter by category with pagination
exports.getAllProducts = async (req, res) => {
  const { category, page = 1, limit = 20 } = req.query; // Default to page 1 and limit 20
  try {
    let query = {};
    if (category) {
      query.category = category;
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
  const { name, description, price, category, thumbnail, images, reviews, averageRating } = req.body;

  // Check if required fields are provided
  if (!name || !description || !price || !category) {
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
    averageRating // Optional
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
