import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postReview } from '../../store/reviews';

function ReviewForm({ spotId }) {
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postReview(spotId, { comment, stars }));
    setComment('');
    setStars(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave your review here..."
      />
      <input
        type="number"
        min="1"
        max="5"
        value={stars}
        onChange={(e) => setStars(e.target.value)}
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;