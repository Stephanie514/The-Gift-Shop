// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGift } from 'react-icons/fa';
import '../styles.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to The Gift Shop</h1>
      <div className="button-container">
      </div>
      <FaGift size={50} color="#007bff" className="icon" />
      <p>
        Find the perfect gift for your loved ones. Browse through our wide selection of products and enjoy a seamless shopping experience.
      </p>
      <div className="buttons">
        <button className="button"><Link to="/products" style={{color: 'white', textDecoration: 'none'}}>Shop Now</Link></button>
        <button className="button"><Link to="/contact" style={{color: 'white', textDecoration: 'none'}}>Contact Us</Link></button>
      </div>
    </div>
  );
};

export default HomePage;