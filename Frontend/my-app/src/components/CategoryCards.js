import React from 'react'; // Ensure there's only one import for React
import { Link } from 'react-router-dom';
import '../styles.css';

const categories = [
  { name: 'Electronics', image: 'https://via.placeholder.com/150?text=Electronics' },
  { name: 'Jewelry', image: 'https://via.placeholder.com/150?text=Jewelry' },
  { name: 'Home', image: 'https://via.placeholder.com/150?text=Home' }
];

const CategoryCards = () => {
  return (
    <div className="category-cards">
      {categories.map((category) => (
        <div key={category.name} className="category-card">
          <Link to={`/products/category/${category.name}`}>
            <img src={category.image} alt={category.name} className="category-image" />
            <h2>{category.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
