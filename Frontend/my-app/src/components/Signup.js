import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(username, email, password);
      localStorage.setItem('token', data.token);
      alert('Signup successful! Please log in.');
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      console.error('Signup error:', error.message);
      alert('Signup failed. Please try again.');
    }
  };

  /*return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;*/

return (
  <div className="form-container">
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Sign Up</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" className="form-button">Sign Up</button>
    </form>
  </div>
);
};

export default Signup;