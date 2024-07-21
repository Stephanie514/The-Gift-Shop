import React from 'react'; // Ensure there's only one import for React
import { Link } from 'react-router-dom';
import { FaGift } from 'react-icons/fa';
import CategoryCards from './CategoryCards'; // Import the CategoryCards component
import '../styles.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to The Gift Shop</h1>
      <div className="button-container">
        <FaGift size={50} color="#007bff" className="icon" />
        <p>
          Find the perfect gift for your loved ones. Browse through our wide selection of products and enjoy a seamless shopping experience.
        </p>
        <div className="buttons">
          <button className="button"><Link to="/products" style={{color: 'white', textDecoration: 'none'}}>Shop Now</Link></button>
          <button className="button"><Link to="/contact" style={{color: 'white', textDecoration: 'none'}}>Contact Us</Link></button>
        </div>
        <div className="button-container">
          <CategoryCards />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
