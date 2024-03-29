import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for managing car-related state and actions
const CarContext = createContext();
const authToken = sessionStorage.getItem('authToken');
// Custom hook to access the car context
export const useCarContext = () => {
  return useContext(CarContext);
};

// CarContext provider component
export const CarProvider = ({ children }) => {
  // State to hold the list of cars
  const [cars, setCars] = useState([]);

  // Function to fetch the list of cars from the backend
  const fetchCars = async () => {
    try {
      const response = await fetch('https://rent-car-xa5m.onrender.com/cars');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  // Function to add a new car
  const addCar = async (newCarData) => {
    try {
      const response = await fetch('https://rent-car-xa5m.onrender.com/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add your JWT token header if needed
        },
        body: JSON.stringify(newCarData),
      });

      if (response.ok) {
        // If the request was successful, fetch the updated list of cars
        fetchCars();
      } else {
        console.error('Error adding new car:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding new car:', error);
    }
  };

  // Function to update car availability
  const updateCarAvailability = async (carId, available) => {
    try {
      const response = await fetch(`https://rent-car-xa5m.onrender.com/cars/${carId}/availability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // Add your JWT token header if needed
        },
        body: new URLSearchParams({ available: String(available) }),
      });

      if (response.ok) {
        // If the request was successful, fetch the updated list of cars
        fetchCars();
      } else {
        console.error('Error updating car availability:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating car availability:', error);
    }
  };

  // Function to delete a car
  const deleteCar = async (carId) => {
    try {
      const response = await fetch(`https://rent-car-xa5m.onrender.com/cars/${carId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        // If the request was successful, fetch the updated list of cars
        fetchCars();
      } else {
        console.error('Error deleting car:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  // Fetch a single car
  useEffect(() => {
    
    fetchCars();
  }, []);

  return (
    <CarContext.Provider
      value={{
        cars,
        addCar,
        updateCarAvailability,
        deleteCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};