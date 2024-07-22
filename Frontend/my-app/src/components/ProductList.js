// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import defaultThumbnail from '../assets/default-thumbnail.png';
import Filter from './Filter';
import StarRatings from 'react-star-ratings'; // Import the StarRatings component
import '../styles.css';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [searchParams] = useSearchParams();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const keyword = searchParams.get('keyword') || '';
      const query = new URLSearchParams({ ...filters, keyword, page: currentPage, limit: 20 }).toString();
      const response = await axios.get(`http://localhost:5000/api/products?${query}`);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, filters, searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="product-listing">
      <div className="left-column">
        <Filter onFilterChange={handleFilterChange} currentFilters={filters} />
      </div>
      <div className="right-column">
        <h2>Products Catalogue</h2>
        <p>Explore Our Wide Range of Gifts!</p>
        <div className="product-grid">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => (
              <Link to={`/products/${product._id}`} key={product._id} className="product-item-link">
                <div className="product-item">
                  <img
                    src={product.thumbnail || defaultThumbnail}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>KES {product.price.toFixed(2)}</p>
                  <StarRatings
                    rating={product.averageRating}
                    starRatedColor="gold"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                  />
                </div>
              </Link>
            ))
          )}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
