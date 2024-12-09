import React from 'react';

function ReviewList({ reviews }) {
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <p><strong>{review.User.firstName}</strong> ({review.createdAt})</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;