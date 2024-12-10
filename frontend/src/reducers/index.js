import { combineReducers } from '@reduxjs/toolkit';
// Import individual reducers
import spotsReducer from './spotsReducer';
import userReducer from './userReducer';

// Combine reducers
const rootReducer = combineReducers({
  spots: spotsReducer,
  user: userReducer,
});

export default rootReducer;