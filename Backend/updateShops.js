// Example of updating a shop's owner manually
const Shop = require('./models/Shop');
const User = require('./models/User');

const updateShopOwners = async () => {
  try {
    const shops = await Shop.find(); // Get all shops
    for (let shop of shops) {
      await User.findByIdAndUpdate(shop.owner, { $addToSet: { shops: shop._id } });
    }
    console.log('Shop owners updated successfully');
  } catch (error) {
    console.error('Error updating shop owners:', error);
  }
};

updateShopOwners();
