// src/components/AddProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ shopId, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [images, setImages] = useState([]);
  const [occasion, setOccasion] = useState('');
  const [gender, setGender] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate shopId
    if (!shopId) {
      setError('Shop ID is required.');
      return;
    }

    try {
      const response = await axios.post(`/api/shops/${shopId}/products`, {
        name,
        description,
        price,
        category,
        thumbnail,
        images,
        occasion,
        gender,
        stock,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('Product added:', response.data);
      // Optionally clear the form or redirect
      if (onClose) onClose();
    } catch (error) {
      setError(`Error adding product: ${error.response?.data?.message || error.message}`);
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      <div>
        <label>Thumbnail URL:</label>
        <input type="url" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
      </div>
      <div>
        <label>Images URLs (comma separated):</label>
        <input type="text" value={images.join(', ')} onChange={(e) => setImages(e.target.value.split(', '))} />
      </div>
      <div>
        <label>Occasion:</label>
        <input type="text" value={occasion} onChange={(e) => setOccasion(e.target.value)} required />
      </div>
      <div>
        <label>Gender:</label>
        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
      </div>
      <div>
        <label>Stock:</label>
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
      </div>
      <button type="submit">Add Product</button>
      {error && <p style={{ color:  'red' }}>{error}</p>}
    </form>
  );
};

export default AddProductForm;
