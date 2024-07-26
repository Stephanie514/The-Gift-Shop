// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Import updated useAuth hook
import { FaCartPlus, FaUserCircle, FaSearch, FaTimes, FaGift } from 'react-icons/fa'; // Import icons
import '../styles.css'; // Import your CSS file for Navbar styling

const Navbar = () => {
  const { state, dispatch } = useAuth(); // Use updated useAuth hook
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' }); // Dispatch logout action
    localStorage.removeItem('token'); // Remove token from localStorage if needed
    navigate('/homepage'); // Redirect to homepage after logout
  };

  const handleSearch = () => {
    if (keyword.trim() === '') {
      navigate('/products');
    } else {
      navigate(`/products?keyword=${keyword}`);
    }
  };

  const handleClearSearch = () => {
    setKeyword('');
    navigate('/products');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/homepage" className="navbar-logo">
          <FaGift size={50} color="#f39f5a" className="logo-icon" />
          <span className="website-name">The Gift Shop</span>
        </Link>
      </div>
      <div className="navbar-center">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-label="Search"
        />
        <button onClick={handleSearch} className="icon-button" aria-label="Search">
          <FaSearch size={30} color='#f39f5a'/>
        </button>
        <button onClick={handleClearSearch} className="icon-button" aria-label="Clear Search">
          <FaTimes size={30} color='#f39f5a'/>
        </button>
      </div>
      <div className="navbar-right">
        <Link to="/cart" className="nav-link" aria-label="Cart">
          <FaCartPlus size={35} />
        </Link>
        <Link to="/account" className="nav-link" aria-label="Account">
          <FaUserCircle size={35} />
        </Link>
        {!state.isAuthenticated ? (
          <>
            <Link to="/login" className="nav-link" aria-label="Login">Login</Link>
            <Link to="/signup" className="nav-link" aria-label="Signup">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn" aria-label="Logout">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
