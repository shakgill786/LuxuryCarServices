import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBooking } from '../../store/bookings';

function AddBookingForm({ spotId, onClose }) {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createBooking({ spotId, startDate, endDate }));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Start Date
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End Date
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <button type="submit">Create Booking</button>
    </form>
  );
}

export default AddBookingForm;