import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotDetails } from '../../store/spots';
import { fetchReviews } from '../../store/reviews';
import CreateReviewForm from '../Reviews/CreateReviewForm';
import './SpotDetails.css';

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const reviews = useSelector((state) => state.reviews[spotId]);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  if (!spot) return <div>Loading...</div>;

  return (
    <div className="spot-details">
      <h1>{spot.name}</h1>
      <img src={spot.previewImage} alt={spot.name} className="spot-image" />
      <p>{spot.description}</p>
      <p>
        <strong>Price:</strong> ${spot.price} per night
      </p>
      <h2>Reviews</h2>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.review}</p>
              <p>
                <strong>Rating:</strong> {review.stars} stars
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to leave one!</p>
      )}
      <CreateReviewForm spotId={spotId} />
    </div>
  );
};

export default SpotDetails;