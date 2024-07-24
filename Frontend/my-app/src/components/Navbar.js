// Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaCartPlus, FaUserCircle, FaSearch, FaTimes, FaGift } from 'react-icons/fa'; // Import icons
import '../styles.css'; // Import your CSS file for Navbar styling

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    setToken(null);
    // Optionally, remove the token from localStorage or cookie if you use them
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
        <Link to="/" className="navbar-logo">
          <FaGift size={50} color="#662549" className="logo-icon" />
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
        />
        <button onClick={handleSearch} className="icon-button">
          <FaSearch size={30} color='#f39f5a'/>
        </button>
        <button onClick={handleClearSearch} className="icon-button">
          <FaTimes size={40} color='#f39f5a'/>
        </button>
      </div>
      <div className="navbar-right">
        <Link to="/cart" className="nav-link">
          <FaCartPlus size={35} />
        </Link>
        <Link to="/account" className="nav-link">
          <FaUserCircle size={35} />
        </Link>
        {!token ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
