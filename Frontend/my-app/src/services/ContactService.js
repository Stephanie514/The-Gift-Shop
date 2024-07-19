import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const sendContactForm = async (name, email, message) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, { name, email, message });
    return response.data;
  } catch (error) {
    console.error("Error sending contact form:", error.response?.data?.message || 'Error sending contact form');
    throw new Error(error.response?.data?.message || 'Error sending contact form');
  }
};