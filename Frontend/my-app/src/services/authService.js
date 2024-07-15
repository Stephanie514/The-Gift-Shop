import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust the base URL as needed

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error logging in');
  }
};

export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error signing up');
  }
};