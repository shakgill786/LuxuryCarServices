import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import SpotList from './components/Spots/SpotList';
import SpotDetails from './components/Spots/SpotDetails';
import SpotForm from './components/Spots/SpotForm';
import AddReviewForm from './components/Reviews/AddReviewForm';
import EditReviewForm from './components/Reviews/EditReviewForm';
import BookingList from './components/Bookings/BookingList';
import AddBookingForm from './components/Bookings/AddBookingForm';
import EditBookingForm from './components/Bookings/EditBookingForm';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<SpotList />} />
          <Route path="/spots/:id" element={<SpotDetails />} />
          <Route path="/spots/new" element={<SpotForm />} />
          <Route path="/spots/:id/reviews/add" element={<AddReviewForm />} />
          <Route path="/reviews/:id/edit" element={<EditReviewForm />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/bookings/add" element={<AddBookingForm />} />
          <Route path="/bookings/:id/edit" element={<EditBookingForm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;