import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Products = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  // Check if the user is authenticated, if not redirect to /auth
  if (!state.isAuthenticated) {
    navigate('/auth');
    return null;
  }

  return (
    <div>
      <h1>Products Page</h1>
      {/* Products listing logic */}
    </div>
  );
};

export default Products;