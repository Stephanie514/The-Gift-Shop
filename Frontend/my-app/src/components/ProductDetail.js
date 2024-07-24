import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import defaultThumbnail from '../assets/default-thumbnail.png'; // Ensure you have this image in your assets folder
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /*const handleAddToCart = () => {
    // Implement the add to cart functionality here
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };*/

  const handleAddToCart = async () => {
    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        productId: product._id,
        quantity: quantity
      });
      console.log(`Added ${quantity} of ${product.name} to cart`);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };  

  const handleOrderNow = () => {
    // Implement the order now functionality here
    console.log(`Ordered ${quantity} of ${product.name}`);
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-detail">
      {product ? (
        <>
          <h1>{product.name}</h1>
          <img
            src={product.thumbnail || defaultThumbnail} // Use default image if no thumbnail
            alt={product.name}
            className="product-thumbnail"
          />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <div className="additional-photos">
            {product.images && product.images.length > 0 && (
              product.images.map((photo, index) => (
                <img key={index} src={photo} alt={`Additional view ${index + 1}`} className="additional-photo" />
              ))
            )}
          </div>
          <div className="reviews">
            <h2>Reviews</h2>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="review">
                  <p><strong>{review.user}</strong> ({review.rating} stars)</p>
                  <p>{review.comment}</p>
                  <p><em>{new Date(review.createdAt).toLocaleDateString()}</em></p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
          <div className="quantity-controls">
            <button onClick={handleDecrement}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
          <div className="actions">
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={handleOrderNow}>Order Now</button>
          </div>
          <div>
            <Link to="/cart">View Your Cart</Link>
          </div>
        </>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default ProductDetail;
