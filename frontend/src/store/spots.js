const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT_DETAILS = 'spots/LOAD_SPOT_DETAILS';

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const spots = await response.json();
  dispatch({ type: LOAD_SPOTS, payload: spots });
};

export const fetchSpotDetails = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  const spot = await response.json();
  dispatch({ type: LOAD_SPOT_DETAILS, payload: spot });
};

export default function reducer(state = { all: [], current: null }, action) {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, all: action.payload };
    case LOAD_SPOT_DETAILS:
      return { ...state, current: action.payload };
    default:
      return state;
  }
}