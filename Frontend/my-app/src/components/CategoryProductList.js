import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import defaultThumbnail from '../assets/default-thumbnail.png'; // Ensure you have this image in your assets folder

const CategoryProductList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/category/${category}`);
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Products in {category}</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="product-item">
              <img
                src={product.thumbnail || defaultThumbnail} // Use default image if no thumbnail
                alt={product.name}
                className="product-thumbnail"
              />
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductList;
