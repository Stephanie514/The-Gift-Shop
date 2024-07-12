import React, { useContext, useEffect } from 'react';
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

export default Cart;