import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postReview, editReview } from '../../store/reviews';

function ReviewForm({ spotId, initialData = {}, isUpdate, onSuccess }) {
  const [comment, setComment] = useState(initialData.comment || '');
  const [stars, setStars] = useState(initialData.stars || 0);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      await dispatch(editReview(initialData.id, { comment, stars }));
    } else {
      await dispatch(postReview(spotId, { comment, stars }));
    }
    setComment('');
    setStars(0);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave your review here..."
      />
      <select
        value={stars}
        onChange={(e) => setStars(parseInt(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num} Star{num > 1 && 's'}
          </option>
        ))}
      </select>
      <button type="submit">
        {isUpdate ? 'Update Review' : 'Submit Review'}
      </button>
    </form>
  );
}

export default ReviewForm;