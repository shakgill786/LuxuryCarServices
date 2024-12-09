import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBooking } from '../../store/bookings';

function DeleteBookingButton({ bookingId, onSuccess }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      await dispatch(deleteBooking(bookingId));
      onSuccess();
    }
  };

  return (
    <button onClick={handleDelete} className="delete-booking-button">
      Delete Booking
    </button>
  );
}

export default DeleteBookingButton;