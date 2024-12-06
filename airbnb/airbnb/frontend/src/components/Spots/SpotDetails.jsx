import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import ReviewsList from '../Reviews/ReviewsList';

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots[spotId]);

  useEffect(() => {
    if (!spot) {
      dispatch(fetchSpots());
    }
  }, [dispatch, spot]);

  if (!spot) return <p>Loading...</p>;

  return (
    <div className="spot-details">
      <h1>{spot.name}</h1>
      <img src={spot.previewImage} alt={spot.name} />
      <p>{spot.description}</p>
      <p>${spot.price} / night</p>
      <ReviewsList spotId={spotId} />
    </div>
  );
};

export default SpotDetails;