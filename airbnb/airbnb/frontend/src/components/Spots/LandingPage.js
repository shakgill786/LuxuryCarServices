import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (!spots.length) return <p>Loading...</p>;

  return (
    <div className="landing-page">
      <h1>Explore Our Luxury Houses</h1>
      <div className="spot-list">
        {spots.map((spot) => (
          <Link to={`/spots/${spot.id}`} key={spot.id} className="spot-card">
            <img src={spot.previewImage} alt={spot.name} />
            <h2>{spot.name}</h2>
            <p>{spot.city}, {spot.state}</p>
            <p>${spot.price}/night</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;