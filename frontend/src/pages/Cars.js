import React from 'react';
import { Link } from 'react-router-dom';
import { useCarContext } from '../contexts/CarContext';

const Cars = () => {
  const { cars, deleteCar, updateCarAvailability } = useCarContext();

  const handleDelete = (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      deleteCar(carId);
    }
  };

  const handleAvailabilityChange = (carId, available) => {
    updateCarAvailability(carId, !available);
  };

  return (
    <div className="container mx-auto p-4 bg-orange-600">
      <h1 className="text-3xl font-semibold mb-4 text-center text-white">Our Fleet</h1>

      <div className="grid grid-cols-4 gap-4">
        {cars.map((car) => (
          <Link
            to={`/cars/${car.id}`} // Use React Router Link to navigate to CarDetails.js
            key={car.id}
            className="hover:cursor-pointer"
          >
            <div className="bg-white p-4 rounded-md shadow-md">
              <img
                src={car.image}
                alt={car.name}
                className="mb-4 rounded-md object-cover h-40 w-full"
              />

              <div className="mb-2">
                <span className="font-semibold">Name:</span> {car.name}
              </div>

              <div className="mb-2">
                <span className="font-semibold">Brand:</span> {car.brand}
              </div>

              <div className="mb-2">
                <span className="font-semibold">Availability:</span>{' '}
                {car.available ? 'Available' : 'Not Available'}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleAvailabilityChange(car.id, car.available)}
                  className={`${
                    car.available ? 'bg-green-600' : 'bg-red-500'
                  } text-white px-4 py-2 rounded-md cursor-pointer`}
                >
                  {car.available ? 'Mark Unavailable' : 'Mark Available'}
                </button>

                <button
                  onClick={() => handleDelete(car.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cars;
