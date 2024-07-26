// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGift } from 'react-icons/fa';
import Hero from './Hero'; // Import the Hero component
import '../styles.css';
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

  return (
    <div className="homepage"> 
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
            <img src="https://i.etsystatic.com/24021242/r/il/f12b24/2474425980/il_1588xN.2474425980_k33s.jpg" alt="New Arrival Small" />
          </div>
          <div className="newArrivals-image-large">
            <img src="https://i.etsystatic.com/16595770/r/il/114a9b/6081603444/il_1588xN.6081603444_d4c7.jpg" alt="New Arrival Large" />
          </div>
        </div>
      </div>

      <div className="mostWanted-section">
        <div className="mostWanted-images">
          <div className="mostWanted-image-small">
            <img src="https://i.etsystatic.com/45650150/r/il/ea4d62/5207046294/il_1588xN.5207046294_juhd.jpg" alt="Most Wanted Small" />
          </div>
          <div className="mostWanted-image-large">
            <img src="https://i.etsystatic.com/12718913/r/il/4e23f0/2453252763/il_1588xN.2453252763_ao0g.jpg" alt="Most Wanted Large" />
          </div>
        </div>
        <div className="mostWanted-text">
          <h1>Most Wanted</h1>
          <p>A selection of our highly-rated products!</p>
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
            <img src="https://i.etsystatic.com/24925695/r/il/c7080a/5159071700/il_1588xN.5159071700_qkr6.jpg" alt="Best Seller Small" />
          </div>
          <div className="bestSellers-image-large">
            <img src="https://i.etsystatic.com/26623167/r/il/9514eb/6051308479/il_1588xN.6051308479_v8qa.jpg" alt="Best Seller Large" />
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
          <FaGift size={120} color="#662549" className="icon" />
          <h2>The Gift Shop</h2>
        </div>
        <div className="support-column">
          <p>Contact Details:</p>
          <p>Mobile: +254 792 022972</p>
          <p>Phone: +254 715 124162</p>
          <p>Email: thegiftshop401@gmail.com</p>
        </div>
        <div className="support-column">
          <p>Pickup Locations in Nairobi:</p>
          <ul>
            <li>Kilimani: Adlife Plaza - 2nd Flr, Chania Ave. - Nairobi</li>
            <li>Imaara Daima: Imaara Mall - 2nd Flr, Mombasa Rd, Nairobi</li>
            <li>Westlands: Sarit Centre - Ground Flr, Karuna Rd, Nairobi</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
