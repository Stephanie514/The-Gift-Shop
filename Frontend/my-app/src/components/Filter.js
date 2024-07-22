import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Range, getTrackBackground } from 'react-range';
import '../styles.css'; // Make sure to import your CSS file

const Filter = ({ onFilterChange, currentFilters }) => {
  const [categories, setCategories] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [shops, setShops] = useState([]);
  const [genders, setGenders] = useState(['His', 'Her', 'Non-Binary']);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedCategory, setSelectedCategory] = useState(currentFilters.category || '');
  const [selectedOccasion, setSelectedOccasion] = useState(currentFilters.occasion || '');
  const [selectedShop, setSelectedShop] = useState(currentFilters.shop || '');
  const [selectedGender, setSelectedGender] = useState(currentFilters.gender || '');
  const [availability, setAvailability] = useState(currentFilters.availability || 'In Stock');

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/filters');
        setCategories(response.data.categories);
        setOccasions(response.data.occasions);
        setShops(response.data.shops);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = () => {
    onFilterChange({
      category: selectedCategory,
      price: priceRange.join(','),
      occasion: selectedOccasion,
      shop: selectedShop,
      gender: selectedGender,
      availability,
    });
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 500000]);
    setSelectedOccasion('');
    setSelectedShop('');
    setSelectedGender('');
    setAvailability('In Stock');
    onFilterChange({});
  };

  return (
    <div className="filter-container">
      <h3>Filter Products</h3>
      
      {/* Price Filter */}
      <div>
        <label>Price</label>
        <div className="price-slider">
          <Range
            step={1000}
            min={0}
            max={500000}
            values={priceRange}
            onChange={(values) => setPriceRange(values)}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                ref={props.ref}
                className="price-slider-track"
                style={{
                  background: getTrackBackground({
                    values: priceRange,
                    colors: ['#007bff', '#ddd'],
                    min: 0,
                    max: 500000,
                  }),
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ index, props }) => (
              <div
                {...props}
                className="price-slider-thumb"
              >
                {index === 0 ? '' : ''}
              </div>
            )}
          />
          <div className="price-inputs">
            <input
              type="number"
              min="0"
              max="500000"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Math.min(Math.max(Number(e.target.value), 0), priceRange[1]), priceRange[1]])}
            />
            <input
              type="number"
              min="0"
              max="500000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Math.min(Math.max(Number(e.target.value), priceRange[0]), 500000)])}
            />
          </div>
        </div>
        <span>{`KES ${priceRange[0]} - KES ${priceRange[1]}`}</span>
      </div>

      {/* Occasion Filter */}
      <div>
        <label>Occasion</label>
        <select value={selectedOccasion} onChange={(e) => setSelectedOccasion(e.target.value)}>
          <option value="">All</option>
          {occasions.map((occasion) => (
            <option key={occasion} value={occasion}>{occasion}</option>
          ))}
        </select>
      </div>

      {/* Gender Filter */}
      <div>
        <label>Gender</label>
        <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
          <option value="">All</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
      </div>

      {/* Shop Filter */}
      <div>
        <label>Shop</label>
        <select value={selectedShop} onChange={(e) => setSelectedShop(e.target.value)}>
          <option value="">All</option>
          {shops.map((shop) => (
            <option key={shop} value={shop}>{shop}</option>
          ))}
        </select>
      </div>

      {/* Availability Filter */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={availability === 'In Stock'}
            onChange={(e) => setAvailability(e.target.checked ? 'In Stock' : '')}
          />
          In Stock
        </label>
      </div>

      {/* Filter Buttons */}
      <button className="filter-button apply-filters" onClick={handleFilterChange}>Apply Filters</button>
      <button className="filter-button reset-filters" onClick={handleResetFilters}>Reset</button>
    </div>
  );
};

export default Filter;
