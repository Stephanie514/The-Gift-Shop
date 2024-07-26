// src/components/Auth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login, signup, logout } from '../services/authService';

const Auth = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isSignup) {
        response = await signup(formData.username, formData.email, formData.password);
        dispatch({ type: 'SIGNUP', payload: response.token });
      } else {
        response = await login(formData.email, formData.password);
        dispatch({ type: 'LOGIN', payload: response.token });
      }
      localStorage.setItem('token', response.token);
      navigate('/products');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    logout();
    dispatch({ type: 'LOGOUT' });
    navigate('/homepage');
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  /*return (
    <div>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
      </form>
      <button onClick={switchMode}>
        {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
      </button>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Auth;*/
return (
  <div className="form-container">
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 className="form-title">{isSignup ? 'Sign Up' : 'Log In'}</h2>
      {isSignup && (
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
      )}
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="form-button">
        {isSignup ? 'Sign Up' : 'Log In'}
      </button>
      <div className="auth-actions">
        <button className="switch-button" onClick={switchMode} type="button">
          {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </button>
        <button className="logout-button" onClick={handleLogout} type="button">
          Log Out
        </button>
      </div>
    </form>
  </div>
);
};

export default Auth;