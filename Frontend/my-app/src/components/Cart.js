/*import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getCart, addItemToCart, removeItemFromCart } from '../services/cartService';

const Cart = () => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = React.useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await getCart(token);
      setCart(cartData);
    };
    fetchCart();
  }, [token]);

  const handleAddItem = async (productId) => {
    const cartData = await addItemToCart(token, productId, 1);
    setCart(cartData);
  };

  const handleRemoveItem = async (productId) => {
    const cartData = await removeItemFromCart(token, productId);
    setCart(cartData);
  };

  if (!cart) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.map(item => (
        <div key={item.productId}>
          <span>{item.productId}</span>
          <span>{item.quantity}</span>
          <button onClick={() => handleAddItem(item.productId)}>Add</button>
          <button onClick={() => handleRemoveItem(item.productId)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from API
    axios.get('/api/cart/view')
      .then(response => setCartItems(response.data))
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  const handleCheckout = () => {
    // Handle checkout process
    axios.post('/api/checkout/checkout')
      .then(response => window.location.href = response.data.url)
      .catch(error => console.error('Error during checkout:', error));
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Continue Shopping</Link></p>
      ) : (
        <div>
          {/* Display cart items */}
          {cartItems.map(item => (
            <div key={item._id}>
              <h2>{item.product.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.product.price}</p>
            </div>
          ))}
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;