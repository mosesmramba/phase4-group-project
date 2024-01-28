import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useCarContext } from '../contexts/CarContext';

const AddCarForm = () => {
  const { addCar } = useCarContext();
  const authToken = sessionStorage.getItem('authToken');
  const [newCar, setNewCar] = useState({
    image: '',
    name: '',
    brand: '',
    model: '',
    year: '',
    color: '',
    daily_rate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const resetForm = () => {
    setNewCar({
      image: '',
      name: '',
      brand: '',
      model: '',
      year: '',
      color: '',
      daily_rate: '',
    });
  };

  const handleAddCar = async (e) => {
    try {
      if (!authToken) {
        // Handle the case when there is no authToken
        console.error('Authentication token not available.');
        return;
      }

      const response = await fetch('https://rent-car-xa5m.onrender.com/add_car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(newCar),
      });

      if (response.status === 201) {
        addCar(newCar);
        resetForm();

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Car added successfully!',
        });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.error || 'Failed to add car!',
        });
      }
    } catch (error) {
      console.error('Error adding car:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while adding the car!',
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-md shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Add New Car</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={newCar.name}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Brand:</label>
          <input
            type="text"
            name="brand"
            value={newCar.brand}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Model:</label>
          <input
            type="text"
            name="model"
            value={newCar.model}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Year:</label>
          <input
            type="text"
            name="year"
            value={newCar.year}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Color:</label>
          <input
            type="text"
            name="color"
            value={newCar.color}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Daily Rate:</label>
          <input
            type="text"
            name="daily_rate"
            value={newCar.daily_rate}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URL:</label>
          <input
            type="text"
            name="image"
            value={newCar.image}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
          />
        </div>

        <div className="mb-4">
          <button
            onClick={handleAddCar}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 w-full"
          >
            Add Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCarForm;
