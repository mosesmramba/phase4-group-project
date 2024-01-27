import React, { useContext, useState, useEffect } from 'react';
import { BookingsContext } from '../contexts/BookingsContext';

const Bookings = () => {
  const { bookings, setBookings } = useContext(BookingsContext);
  const [showEditForm, setShowEditForm] = useState(false);
  const authToken = sessionStorage.getItem('authToken');
  const [formData, setFormData] = useState({
    id: '',
    start_date: '',
    end_date: '',
    price: '',
    user_id: '',
    car_id: '',
  });

  // Function to fetch bookings from the backend
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/bookings');
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
    }
  };

  // Function to handle booking deletion
  const handleDelete = async (bookingId) => {
    try {
      const response = await fetch(`/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken && authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }
      fetchBookings(); // Refetch bookings after deletion
    } catch (error) {
      console.error('Error deleting booking:', error.message);
    }
  };

  // Function to handle form submission for updating booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/bookings/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken && authToken}`,
        },
        
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update booking');
      }
      fetchBookings(); // Refetch bookings after update
      setShowEditForm(false); // Hide edit form
    } catch (error) {
      console.error('Error updating booking:', error.message);
    }
  };

  // Function to handle editing of booking
  const handleEdit = (booking) => {
    setFormData(booking);
    setShowEditForm(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Bookings</h1>

      {showEditForm && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
            <label htmlFor="start_date">Start Date:</label>
            <input
              type="text"
              className="form-control"
              id="start_date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_date">End Date:</label>
            <input
              type="text"
              className="form-control"
              id="end_date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            />
          </div>
          {/* Other input fields go here */}
          <button type="submit" className="btn btn-primary mr-2">Update Booking</button>
          <button type="button" className="btn btn-secondary" onClick={() => setShowEditForm(false)}>Cancel</button>
        </form>
      )}

      <ul className="list-group">
        {bookings && bookings.map((booking) => (
          <li key={booking.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <p><strong>ID:</strong> {booking.id}</p>
              <p><strong>Start Date:</strong> {booking.start_date}</p>
              <p><strong>End Date:</strong> {booking.end_date}</p>
              <p><strong>Price:</strong> {booking.price}</p>
              <p><strong>User ID:</strong> {booking.user_id}</p>
              <p><strong>Car ID:</strong> {booking.car_id}</p>
            </div>
            <div>
              <button
                className="btn btn-danger mr-2"
                onClick={() => handleDelete(booking.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleEdit(booking)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
