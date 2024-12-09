const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const csrfFetch = async (url, options = {}) => {
  options.headers = options.headers || {};
  if (options.method && options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = 'application/json';
    const csrfToken = document.cookie.split('=')[1]; // Update as per CSRF retrieval logic
    if (csrfToken) options.headers['X-CSRF-Token'] = csrfToken;
  }

  const response = await fetch(BASE_URL + url, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
};

// API Service Functions
export const login = (credentials) =>
  csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

export const logout = () =>
  csrfFetch('/api/session', {
    method: 'DELETE',
  });

export const restoreSession = () =>
  csrfFetch('/api/session', { method: 'GET' });

export const register = (userData) =>
  csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const fetchSpots = (filters) =>
  csrfFetch('/api/spots' + (filters ? `?${new URLSearchParams(filters)}` : ''));

export const fetchSpotDetails = (id) =>
  csrfFetch(`/api/spots/${id}`);

export const createSpot = (spotData) =>
  csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spotData),
  });

export const updateSpot = (id, spotData) =>
  csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    body: JSON.stringify(spotData),
  });

export const deleteSpot = (id) =>
  csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });

export const addReview = (id, reviewData) =>
  csrfFetch(`/api/spots/${id}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });

export const fetchReviews = (id) =>
  csrfFetch(`/api/spots/${id}/reviews`);

export const editReview = (id, reviewData) =>
  csrfFetch(`/api/reviews/${id}`, {
    method: 'PUT',
    body: JSON.stringify(reviewData),
  });

export const deleteReview = (id) =>
  csrfFetch(`/api/reviews/${id}`, { method: 'DELETE' });

export const fetchBookings = () =>
  csrfFetch('/api/bookings');

export const createBooking = (bookingData) =>
  csrfFetch('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });

export const updateBooking = (id, bookingData) =>
  csrfFetch(`/api/bookings/${id}`, {
    method: 'PUT',
    body: JSON.stringify(bookingData),
  });

export const deleteBooking = (id) =>
  csrfFetch(`/api/bookings/${id}`, { method: 'DELETE' });

export const restoreCsrf = () => csrfFetch('/api/csrf/restore');