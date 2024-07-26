// src/components/Hero.js
import React from 'react';
import { FaGift } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../styles.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <FaGift size={120} color="#662549" className="icon" />
          <img src="../assets/giftshop.png" alt="Gift Shop Logo" className="logo" />
          <h1>Welcome to The Gift Shop</h1>
          <p>Find the perfect gift for your loved ones.</p>
        </div>
        <div className="hero-button-container">
          <Link to="/products" className="hero-button">Shop Now</Link> {/* Updated to use Link for client-side navigation */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
