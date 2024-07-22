// Navbar.js
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaCartPlus, FaUserCircle, FaSearch, FaTimes } from 'react-icons/fa'; // Import icons
import axios from 'axios';
import '../styles.css'; // Import your CSS file for Navbar styling

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    setToken(null);
    // Optionally, remove the token from localStorage or cookie if you use them
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories'); // Adjust URL as needed
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
        <div className="navbar-dropdown">
          <button onClick={toggleDropdown} className="dropdown-button">
            <span className="dropdown-arrow">▼</span>
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              {categories.map((category) => (
                <li key={category._id} className="dropdown-item">
                  <Link to={`/category/${category.name}`} className="dropdown-link">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link to="/" className="navbar-logo">
          <img src="/path/to/logo.png" alt="Logo" className="logo" /> {/* Replace with your logo */}
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
          <FaSearch size={20} />
        </button>
        <button onClick={handleClearSearch} className="icon-button">
          <FaTimes size={20} />
        </button>
      </div>
      <div className="navbar-right">
        <Link to="/cart" className="nav-link">
          <FaCartPlus size={24} />
        </Link>
        <Link to="/account" className="nav-link">
          <FaUserCircle size={24} />
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
