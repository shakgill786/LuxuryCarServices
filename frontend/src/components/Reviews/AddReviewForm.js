import React, { useState } from 'react';

const AddReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ review, rating });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Review</h2>
      <textarea
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <div>
        <label>Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          required
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default AddReviewForm;