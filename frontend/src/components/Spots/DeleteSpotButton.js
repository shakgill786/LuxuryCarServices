import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSpot } from '../../store/spots';

function DeleteSpotButton({ spotId }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteSpot(spotId));
  };

  return (
    <button onClick={handleDelete}>
      Delete Spot
    </button>
  );
}

export default DeleteSpotButton;