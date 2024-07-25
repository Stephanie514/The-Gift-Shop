// src/components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      console.log('Login response:', response);

      const { token } = response.data;

      console.log('Token:', token);

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.id;  // Adjust based on your token structure

      console.log('UserId:', userId);

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      dispatch({ type: 'LOGIN', payload: token });
      navigate('/homepage');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
