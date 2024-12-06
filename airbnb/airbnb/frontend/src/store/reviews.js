import { csrfFetch } from './csrf';

// Types
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';

// Action Creators
const loadReviews = (spotId, reviews) => ({
  type: LOAD_REVIEWS,
  spotId,
  reviews,
});

const addReview = (spotId, review) => ({
  type: ADD_REVIEW,
  spotId,
  review,
});

// Thunks
export const fetchReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(spotId, reviews));
  }
};

export const createReview = (spotId, reviewData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(addReview(spotId, review));
  }
};

// Reducer
const initialState = {};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWS: {
      return {
        ...state,
        [action.spotId]: action.reviews,
      };
    }
    case ADD_REVIEW: {
      return {
        ...state,
        [action.spotId]: [...(state[action.spotId] || []), action.review],
      };
    }
    default:
      return state;
  }
}