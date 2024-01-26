// Bookings.js

import React, { useEffect } from 'react';
import { useBookings, actionTypes } from '../contexts/BookingsContext';

const Bookings = () => {
  const { state, dispatch } = useBookings();
  const { bookings, loading, error } = state;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('your_auth_token_key'); // replace with your actual token key
        const response = await fetch('/https://127.0.0.1:5000/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching bookings');
        }

        const data = await response.json();
        dispatch({ type: actionTypes.SET_BOOKINGS, payload: data.bookings });
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      }
    };

    fetchBookings();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
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