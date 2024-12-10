const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'; // New action type

export const fetchReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const reviews = await response.json();
  dispatch({ type: LOAD_REVIEWS, payload: reviews });
};

export const postReview = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
  });
  const newReview = await response.json();
  dispatch({ type: ADD_REVIEW, payload: newReview });
};

export const editReview = (reviewId, updatedData) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedData),
  });
  const updatedReview = await response.json();
  dispatch({ type: EDIT_REVIEW, payload: updatedReview });
  return updatedReview; // Return the updated review if needed
};

export default function reducer(state = [], action) {
  switch (action.type) {
    case LOAD_REVIEWS:
      return action.payload;
    case ADD_REVIEW:
      return [action.payload, ...state];
    case EDIT_REVIEW:
      return state.map((review) =>
        review.id === action.payload.id ? action.payload : review
      ); // Update the specific review in the state
    default:
      return state;
  }
}