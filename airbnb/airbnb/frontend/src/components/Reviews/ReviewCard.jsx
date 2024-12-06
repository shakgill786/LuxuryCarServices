import React from 'react';

const ReviewCard = ({ review }) => (
  <div className="review-card">
    <h4>{review.user.firstName}</h4>
    <p>{review.comment}</p>
    <p>Rating: {review.rating}</p>
  </div>
);

export default ReviewCard;