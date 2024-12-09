import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpotDetails } from '../../store/spots';

function SpotDetails({ match }) {
  const spot = useSelector((state) => state.spots.current);
  const dispatch = useDispatch();
  const { id } = match.params;

  useEffect(() => {
    dispatch(fetchSpotDetails(id));
  }, [dispatch, id]);

  if (!spot) return <p>Loading...</p>;

  return (
    <div className="spot-details">
      <h1>{spot.name}</h1>
      <p>{spot.city}, {spot.state}, {spot.country}</p>
      <div>
        <img src={spot.previewImage} alt={spot.name} />
      </div>
      <p>{spot.description}</p>
      <p>${spot.price} / night</p>
    </div>
  );
}

export default SpotDetails;