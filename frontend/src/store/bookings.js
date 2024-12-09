const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS';

export const fetchBookings = () => async (dispatch) => {
  const response = await fetch('/api/bookings');
  const bookings = await response.json();
  dispatch({ type: LOAD_BOOKINGS, payload: bookings });
};

export default function reducer(state = [], action) {
  switch (action.type) {
    case LOAD_BOOKINGS:
      return action.payload;
    default:
      return state;
  }
}