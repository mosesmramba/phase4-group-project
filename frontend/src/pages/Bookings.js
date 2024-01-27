import React, { useContext } from 'react';
import { BookingsContext } from '../contexts/BookingsContext';

const Bookings = () => {
  const { bookings } = useContext(BookingsContext);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Bookings</h1>

      {(bookings && Array.isArray(bookings) && bookings.length === 0) ? (
        <p>No bookings available.</p>
      ) : (
        <ul>
          {bookings && Array.isArray(bookings) && bookings.map((booking) => (
            <li key={booking.id} className="border p-4 mb-4 rounded">
              <p>ID: {booking.id}</p>
              <p>Start Date: {booking.start_date}</p>
              <p>End Date: {booking.end_date}</p>
              <p>Price: {booking.price}</p>
              <p>User ID: {booking.user_id}</p>
              <p>Car ID: {booking.car_id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookings;
