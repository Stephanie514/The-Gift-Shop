// Frontend/my-app/src/components/SearchComponent.js

import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products?keyword=${keyword}`);
      setResults(response.data.products);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for products..."
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {results.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: KES {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
