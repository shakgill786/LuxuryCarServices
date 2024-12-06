import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../store/reviews';
import ReviewCard from './ReviewCard';

const ReviewsList = ({ spotId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews[spotId] || []);

  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  return (
    <div className="reviews-list">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsList;