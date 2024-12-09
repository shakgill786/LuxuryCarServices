import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings } from '../../store/bookings';

function BookingList() {
  const bookings = useSelector((state) => state.bookings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <ul>
      {bookings.map((booking) => (
        <li key={booking.id}>
          {booking.startDate} to {booking.endDate}
        </li>
      ))}
    </ul>
  );
}

export default BookingList;