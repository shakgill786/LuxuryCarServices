import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardReducer';
import spotsReducer from './spots';
import reviewsReducer from './reviews';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    spots: spotsReducer,
    reviews: reviewsReducer,
  },
});

export default store;