import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview, updateReview } from '../../store/reviews';

const ReviewForm = ({ initialData = {}, isEdit = false, spotId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    comment: initialData.comment || '',
    rating: initialData.rating || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await dispatch(updateReview(initialData.id, formData));
    } else {
      await dispatch(createReview(spotId, formData));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <label>
        Comment
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Rating
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="1"
          max="5"
          required
        />
      </label>
      <button type="submit">{isEdit ? 'Update Review' : 'Submit Review'}</button>
    </form>
  );
};

export default ReviewForm;