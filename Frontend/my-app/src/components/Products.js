/* Products.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../services/authService';

const Products = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  // Check if the user is authenticated, if not redirect to /auth
  if (!state.isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Products Page</h1>
      /* {/* Products listing logic */
      /*<button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Products;*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import Product from './Products'; // Import the Product component
import { logout } from '../services/authService';

const Products = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Check if the user is authenticated, if not redirect to /auth
  if (!state.isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Products Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <div className="products-list">
        {products.map(product => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;