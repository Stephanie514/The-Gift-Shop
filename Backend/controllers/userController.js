// controllers/userController.js
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get a user by ID
// @route   GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new user
// @route   POST /api/users
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update a user by ID
// @route   PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete a user by ID
// @route   DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update the default address
// @route   PATCH /api/users/:id/address/default
const updateDefaultAddress = async (req, res) => {
    const { addressId } = req.body;
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Set all addresses as non-default
      user.addresses.forEach(addr => addr.isDefault = false);
  
      // Set the specified address as default
      const address = user.addresses.id(addressId);
      if (!address) return res.status(404).json({ message: 'Address not found' });
      address.isDefault = true;
  
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};
  
// @desc    Add or update an address
// @route   PATCH /api/users/:id/address
const addOrUpdateAddress = async (req, res) => {
    const { addressId, address, isDefault } = req.body;
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      if (addressId) {
        // Update existing address
        const existingAddress = user.addresses.id(addressId);
        if (!existingAddress) return res.status(404).json({ message: 'Address not found' });
        existingAddress.address = address;
        existingAddress.isDefault = isDefault || existingAddress.isDefault;
      } else {
        // Add new address
        user.addresses.push({ address, isDefault });
      }
  
      // Ensure only one default address
      if (isDefault) {
        user.addresses.forEach(addr => addr.isDefault = addr.id === (user.addresses.id(addressId) ? addressId : user.addresses.length - 1));
      }
  
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

const getShopsByUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: 'shops',
      populate: { path: 'products' }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user.shops);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
    getAllUsers,
    getUserById,
    getShopsByUser,
    createUser,
    updateUser,
    deleteUser,
    updateDefaultAddress,
    addOrUpdateAddress
};
