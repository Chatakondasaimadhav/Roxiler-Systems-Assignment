import React from 'react';
import ReactStars from 'react-stars';

const StoreCard = ({ store, userRating, onRate }) => {
  return (
    <div className="store-card">
      <h3>{store.name}</h3>
      <p>{store.address}</p>
      <p>Average Rating: {store.average_rating}</p>
      <ReactStars
        count={5}
        value={userRating}
        onChange={onRate}
        size={24}
        activeColor="#ffd700"
      />
    </div>
  );
};

export default StoreCard;
