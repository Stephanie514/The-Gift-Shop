// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from './Hero'; // Import the Hero component
import '../styles.css';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


// Helper function to fetch categories from the backend
const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products/filters');
    return response.data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const HomePage = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    getCategories();
  }, []);

  // Check if the user is authenticated, if not redirect to /auth
  if (!state.isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/LandingPage');
  };

  return (
    <div className="homepage">
     <button onClick={handleLogout}>Logout</button> 
      <Hero /> {/* Add Hero section */}

      <div className="category-section">
        <h1>Categories</h1>
        <p>Browse through our wide selection of products and enjoy a seamless shopping experience.</p>
        <div className="category-cards-container">
          {categories.length === 0 ? (
            <p>No categories available.</p>
          ) : (
            categories.slice(0, 3).map((category) => (
              <div className="category-card" key={category}>
                <a href={`/products/category/${category}`}>
                  <img
                    src={`path/to/icons/${category.toLowerCase()}.png`} // Replace with actual path to category icons
                    alt={category}
                    className="category-icon"
                  />
                  <h3>{category}</h3>
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="newArrivals-section">
        <div className="newArrivals-text">
          <h1>New Arrivals</h1>
          <p>A selection of our newest products!</p>
          <a href="/products" className="shop-now-button">Shop Now!</a>
        </div>
        <div className="newArrivals-images">
          <div className="newArrivals-image-small">
            <img src="path/to/small-image.jpg" alt="New Arrival Small" />
          </div>
          <div className="newArrivals-image-large">
            <img src="path/to/large-image.jpg" alt="New Arrival Large" />
          </div>
        </div>
      </div>

      <div className="mostWanted-section">
        <div className="mostWanted-images">
          <div className="mostWanted-image-small">
            <img src="path/to/small-image.jpg" alt="Most Wanted Small" />
          </div>
          <div className="mostWanted-image-large">
            <img src="path/to/large-image.jpg" alt="Most Wanted Large" />
          </div>
        </div>
        <div className="mostWanted-text">
          <h1>Most Wanted</h1>
          <p>A selection of our most wanted products!</p>
          <a href="/products" className="shop-now-button">Shop Now!</a>
        </div>
      </div>

      <div className="bestSellers-section">
        <div className="bestSellers-text">
          <h1>Best Sellers</h1>
          <p>A selection of our best-selling products!</p>
          <a href="/products" className="shop-now-button">Shop Now!</a>
        </div>
        <div className="bestSellers-images">
          <div className="bestSellers-image-small">
            <img src="path/to/small-image.jpg" alt="Best Seller Small" />
          </div>
          <div className="bestSellers-image-large">
            <img src="path/to/large-image.jpg" alt="Best Seller Large" />
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h1>Contact Us</h1>
        <p>Our customer care support is here for you!</p>
        <a href="/contact" className="contact-button">Contact Us</a>
      </div>

      <div className="support-section">
        <div className="support-column">
          <img src="path/to/logo.png" alt="Logo" className="support-logo" />
          <h2>Website Name</h2>
        </div>
        <div className="support-column">
          <p>Contact Details:</p>
          <p>Mobile: +254 700 000000</p>
          <p>Phone: +254 20 0000000</p>
          <p>Email: support@example.com</p>
        </div>
        <div className="support-column">
          <p>Pickup Locations in Nairobi:</p>
          <ul>
            <li>Location 1: Address 1</li>
            <li>Location 2: Address 2</li>
            <li>Location 3: Address 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
