// src/components/pages/RentACar.js
import React from 'react';

const rentalCars = [
  // 20 rental cars with relevant information
  { id: 1, model: 'Rental Car 1', imageUrl: 'rental_car_image_url_1', description: 'Rental car details and description go here.' },
  { id: 2, model: 'Rental Car 2', imageUrl: 'rental_car_image_url_2', description: 'Rental car details and description go here.' },
  { id: 3, model: 'Rental Car 3', imageUrl: 'rental_car_image_url_3', description: 'Rental car details and description go here.' },
  // ... Add more rental cars as needed
  { id: 4, model: 'Rental Car 4', imageUrl: 'rental_car_image_url_4', description: 'Rental car details and description go here.' },
  { id: 5, model: 'Rental Car 5', imageUrl: 'rental_car_image_url_5', description: 'Rental car details and description go here.' },
  // ... Add more rental cars as needed
  { id: 6, model: 'Rental Car 6', imageUrl: 'rental_car_image_url_6', description: 'Rental car details and description go here.' },
  { id: 7, model: 'Rental Car 7', imageUrl: 'rental_car_image_url_7', description: 'Rental car details and description go here.' },
  // ... Add more rental cars as needed
];

const RentACar = () => {
  return (
    <div className="container py-16">
      <h2>Rent a Car</h2>
      <div className="grid grid-cols-5 gap-4">
        {rentalCars.map((car) => (
          <div key={car.id} className="bg-gray-100 p-4 rounded-md">
            <img src={car.imageUrl} alt={`Rental Car ${car.id}`} className="w-full h-32 object-cover mb-4" />
            <h3 className="text-lg font-semibold">{car.model}</h3>
            <p>{car.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentACar;
