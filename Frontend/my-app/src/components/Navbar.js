import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
    // Optionally, remove the token from localStorage or cookie if you use them
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!token && <li><Link to="/login">Login</Link></li>}
        {!token && <li><Link to="/signup">Signup</Link></li>}
        {token && <li><button onClick={handleLogout}>Logout</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar;