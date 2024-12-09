const LOGIN = 'session/LOGIN';
const LOGOUT = 'session/LOGOUT';

export const login = (credentials) => async (dispatch) => {
  const response = await fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  const user = await response.json();
  dispatch({ type: LOGIN, payload: user });
};

export const logout = () => async (dispatch) => {
  await fetch('/api/session', { method: 'DELETE' });
  dispatch({ type: LOGOUT });
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
}