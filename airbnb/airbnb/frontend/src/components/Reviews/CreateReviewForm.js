import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/reviews';
import './CreateReviewForm.css';

const CreateReviewForm = ({ spotId }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(1);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const newReview = { review, stars };
    try {
      await dispatch(createReview(spotId, newReview));
      setReview('');
      setStars(1);
    } catch (err) {
      const data = await err.json();
      if (data?.errors) setErrors(data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-review-form">
      <h3>Leave a Review</h3>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <textarea
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <label>
        Stars:
        <input
          type="number"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          min="1"
          max="5"
          required
        />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default CreateReviewForm;