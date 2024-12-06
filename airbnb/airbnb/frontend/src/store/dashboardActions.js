export const LOAD_USER_SPOTS = 'dashboard/loadUserSpots';
export const LOAD_USER_REVIEWS = 'dashboard/loadUserReviews';

export const loadUserSpots = (spots) => ({
  type: LOAD_USER_SPOTS,
  spots,
});

export const loadUserReviews = (reviews) => ({
  type: LOAD_USER_REVIEWS,
  reviews,
});

export const fetchUserSpots = () => async (dispatch) => {
  const res = await fetch('/api/users/spots');
  const spots = await res.json();
  dispatch(loadUserSpots(spots));
};

export const fetchUserReviews = () => async (dispatch) => {
  const res = await fetch('/api/users/reviews');
  const reviews = await res.json();
  dispatch(loadUserReviews(reviews));
};