import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBooking } from '../../store/bookings';

function EditBookingForm({ booking, onClose }) {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(booking.startDate || '');
  const [endDate, setEndDate] = useState(booking.endDate || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateBooking(booking.id, { startDate, endDate }));
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
      <button type="submit">Update Booking</button>
    </form>
  );
}

export default EditBookingForm;