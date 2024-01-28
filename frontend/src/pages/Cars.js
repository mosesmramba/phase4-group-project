import React from 'react';
import { Link } from 'react-router-dom';
import { useCarContext } from '../contexts/CarContext';

const Cars = () => {
  const { cars, deleteCar, updateCarAvailability, addCar } = useCarContext();

  const handleDelete = (carId) => {
    console.log('Deleting car with ID:', carId);
    if (window.confirm('Are you sure you want to delete this car?')) {
      deleteCar(carId);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-orange-600">
      <h1 className="text-3xl font-semibold mb-4 text-center text-white">Our Fleet</h1>
      
      <div className="card-body">
        <Link to={'/add_car'} className="btn btn-primary">
          Add Car
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="hover:cursor-pointer">
            <Link to={`https://rent-car-xa5m.onrender.com/cars/${car.id}`}>
              <div className="bg-white p-4 rounded-md shadow-md">
                <img
                  src={car.image}
                  alt={car.name}
                  className="mb-4 rounded-md object-cover h-40 w-full"
                />
                <div className="mb-2">
                  <span className="font-semibold">id:</span> {car.id}
                </div>
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
              </div>
            </Link>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleDelete(car.id)}
                className="bg-red-500 text-white px-4 py-1 rounded-md cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
