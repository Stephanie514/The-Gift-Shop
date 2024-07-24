import axios from 'axios';

// Define the base URL for your API
const BASE_URL = 'http://localhost:5000/api/cart';

// Define the cartService object with the methods
const cartService = {
  addToCart: async (productId, quantity) => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, { productId, quantity });
      return response.data;
    } catch (error) {
      throw new Error(`Error adding to cart: ${error.message}`);
    }
  },

  viewCart: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/view`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching cart items: ${error.message}`);
    }
  }
};

// Export the cartService object as default
export default cartService;