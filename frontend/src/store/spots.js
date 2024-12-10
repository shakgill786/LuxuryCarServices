const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT_DETAILS = 'spots/LOAD_SPOT_DETAILS';
const CREATE_SPOT = 'spots/CREATE_SPOT'; // New action type
const UPDATE_SPOT = 'spots/UPDATE_SPOT';

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

export const createSpot = (newSpotData) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(newSpotData),
  });
  const createdSpot = await response.json();
  dispatch({ type: CREATE_SPOT, payload: createdSpot });
  return createdSpot; // Return the newly created spot if needed
};

export const updateSpot = (id, updatedData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedData),
  });
  const updatedSpot = await response.json();
  dispatch({ type: UPDATE_SPOT, payload: updatedSpot });
  return updatedSpot; // Return the updated spot if needed
};

export default function reducer(state = { all: [], current: null }, action) {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, all: action.payload };
    case LOAD_SPOT_DETAILS:
      return { ...state, current: action.payload };
    case CREATE_SPOT:
      return { ...state, all: [...state.all, action.payload] }; // Add the new spot to the list
    case UPDATE_SPOT:
      return {
        ...state,
        all: state.all.map((spot) =>
          spot.id === action.payload.id ? action.payload : spot
        ), // Update the specific spot in the list
        current:
          state.current?.id === action.payload.id
            ? action.payload
            : state.current, // Update the current spot if it matches
      };
    default:
      return state;
  }
}