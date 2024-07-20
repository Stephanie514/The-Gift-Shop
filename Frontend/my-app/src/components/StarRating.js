// src/components/StarRating.js

import React from 'react';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i}>&#9733;</span>); // Filled star
    } else {
      stars.push(<span key={i}>&#9734;</span>); // Outline star
    }
  }
  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
