import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  return (
    <div className="landing-container">
      {Object.values(spots).map((spot) => (
        <Link key={spot.id} to={`/spots/${spot.id}`} className="spot-card">
          <img src={spot.Images?.[0]?.url} alt={spot.title} />
          <h3>{spot.title}</h3>
          <p>{spot.location}</p>
          <p>${spot.price}/night</p>
        </Link>
      ))}
    </div>
  );
}

export default LandingPage;