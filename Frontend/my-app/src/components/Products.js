// Products.js
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
      {/* Products listing logic */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Products;