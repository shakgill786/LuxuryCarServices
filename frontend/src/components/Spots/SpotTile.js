import React from 'react';
import { Link } from 'react-router-dom';

function SpotTile({ spot }) {
  return (
    <Link to={`/spots/${spot.id}`} className="spot-tile">
      <img src={spot.previewImage} alt={spot.name} />
      <div>
        <h3>{spot.name}</h3>
        <p>{spot.city}, {spot.state}</p>
        <p>${spot.price} / night</p>
      </div>
    </Link>
  );
}

export default SpotTile;