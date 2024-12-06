import { LOAD_USER_SPOTS, LOAD_USER_REVIEWS } from './dashboardActions';

const initialState = {
  spots: {},
  reviews: {},
};

export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_SPOTS:
      return { ...state, spots: action.spots };
    case LOAD_USER_REVIEWS:
      return { ...state, reviews: action.reviews };
    default:
      return state;
  }
}