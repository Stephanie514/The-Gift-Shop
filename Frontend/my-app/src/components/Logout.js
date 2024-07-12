import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { logout } from '../services/authService';

const Logout = () => {
  const { setToken } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    setToken(null);
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;