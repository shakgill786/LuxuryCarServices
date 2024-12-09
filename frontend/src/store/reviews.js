const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';

export const fetchReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  const reviews = await response.json();
  dispatch({ type: LOAD_REVIEWS, payload: reviews });
};

export const postReview = (spotId, review) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
  });
  const newReview = await response.json();
  dispatch({ type: ADD_REVIEW, payload: newReview });
};

export default function reducer(state = [], action) {
  switch (action.type) {
    case LOAD_REVIEWS:
      return action.payload;
    case ADD_REVIEW:
      return [action.payload, ...state];
    default:
      return state;
  }
}