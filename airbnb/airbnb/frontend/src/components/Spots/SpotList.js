import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import './SpotList.css';

const SpotList = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div className="spot-list">
      <h1>Available Spots</h1>
      {spots.map((spot) => (
        <div key={spot.id} className="spot-card">
          <Link to={`/spots/${spot.id}`}>
            <img src={spot.previewImage} alt={spot.name} />
            <h2>{spot.name}</h2>
            <p>{spot.description}</p>
            <p>
              <strong>${spot.price}</strong> per night
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SpotList;