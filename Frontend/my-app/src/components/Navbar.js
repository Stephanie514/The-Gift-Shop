import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles.css'; // Import your CSS file for Navbar styling
import CartIcon from '../assets/shoppingcart.png';

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
    // Optionally, remove the token from localStorage or cookie if you use them
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link">
            <img src={CartIcon} alt="Cart" className="cart-icon" />
            </Link>
        </li>
        {!token && (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">Signup</Link>
            </li>
          </>
        )}
        {token && (
          <li className="nav-item">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;