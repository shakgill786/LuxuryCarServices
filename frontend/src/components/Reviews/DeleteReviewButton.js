import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';

function DeleteReviewButton({ reviewId }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteReview(reviewId));
  };

  return (
    <button onClick={handleDelete}>
      Delete Review
    </button>
  );
}

export default DeleteReviewButton;