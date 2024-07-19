// Contact.js
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import '../styles.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      console.log(response.data); // Log the response from backend

      // Optionally, show a success message to the user
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>Contact Us</h2>
      <p>If you have any questions, please reach out to us using the information below.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
      <p>Email: thegiftshop401@gmail.com</p>
      <p>Phone: +25492022972 +254715124162</p>
    </div>
  );
};

export default Contact;