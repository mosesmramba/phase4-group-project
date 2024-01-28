import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useCarContext } from '../contexts/CarContext';

const AddBookingForm = () => {
  const { cars } = useCarContext();
  const authToken = sessionStorage.getItem('authToken');
  const [newBooking, setNewBooking] = useState({
    start_date: '',
    end_date: '',
    user_id: '',
    car_id: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const resetForm = () => {
    setNewBooking({
      start_date: '',
      end_date: '',
      user_id: '',
      car_id: '',
    });
  };

  const handleAddBooking = async (e) => {
    try {
      if (!authToken) {
        // Handle the case when there is no authToken
        console.error('Authentication token not available.');
        return;
      }

      const response = await fetch('/rent-vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newBooking),
      });

      if (response.status === 201) {
        resetForm();

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Booking added successfully!',
        });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.error || 'Failed to add booking!',
        });
      }
    } catch (error) {
      console.error('Error adding booking:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while adding the booking!',
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-md shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Add New Booking</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Date:</label>
          <input
            type="text"
            name="start_date"
            value={newBooking.start_date}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Date:</label>
          <input
            type="text"
            name="end_date"
            value={newBooking.end_date}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">User ID:</label>
          <input
            type="text"
            name="user_id"
            value={newBooking.user_id}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Car ID:</label>
          <select
            name="car_id"
            value={newBooking.car_id}
            onChange={handleInputChange}
            className="form-select mt-1 block w-full"
          >
            <option value="" disabled>Select Car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>{car.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <button
            onClick={handleAddBooking}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 w-full"
          >
            Add Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBookingForm;
