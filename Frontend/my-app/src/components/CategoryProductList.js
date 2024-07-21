import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import defaultThumbnail from '../assets/default-thumbnail.png';
import '../styles.css'; // Make sure to include this for CSS

const CategoryProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?category=${category}&page=${currentPage}&limit=20`);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, currentPage]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="category-product-listing">
      <div className="left-column"></div>
      <div className="right-column">
        <h2>Products in {category}</h2>
        <div className="product-grid">
          {products.length === 0 ? (
            <p>No products found in this category.</p>
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
                  <p>${product.price.toFixed(2)}</p>
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

export default CategoryProductList;
