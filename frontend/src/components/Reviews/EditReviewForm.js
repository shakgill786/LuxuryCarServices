import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReview } from '../../store/reviews';

function EditReviewForm({ reviewId, currentComment, currentStars, onClose }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(currentComment);
  const [stars, setStars] = useState(currentStars);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editReview(reviewId, { comment, stars }));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <select value={stars} onChange={(e) => setStars(parseInt(e.target.value))}>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} Star{num > 1 && 's'}
          </option>
        ))}
      </select>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditReviewForm;