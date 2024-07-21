// src/components/ProductFilter.js
import React, { useState } from 'react';

const ProductFilter = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    onFilter({ category, minPrice, maxPrice });
  };

  return (
    <div className="product-filter">
      <h3>Filter Products</h3>
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="minPrice">Min Price</label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="maxPrice">Max Price</label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default ProductFilter;
