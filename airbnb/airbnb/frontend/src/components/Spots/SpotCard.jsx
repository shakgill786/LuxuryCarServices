import React from 'react';
import { Link } from 'react-router-dom';

const SpotCard = ({ spot }) => (
  <div className="spot-card">
    <Link to={`/spots/${spot.id}`}>
      <img src={spot.previewImage} alt={spot.name} />
      <h3>{spot.name}</h3>
      <p>${spot.price} / night</p>
    </Link>
  </div>
);

export default SpotCard;