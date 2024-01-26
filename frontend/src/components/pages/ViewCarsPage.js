// src/components/pages/ViewCars.js
import React from 'react';

const cars = [
  // 20 cars with relevant information
  { id: 1, model: 'Car Model 1', imageUrl: 'car_image_url_1', description: 'Car details and description go here.' },
  { id: 2, model: 'Car Model 2', imageUrl: 'car_image_url_2', description: 'Car details and description go here.' },
  { id: 3, model: 'Car Model 3', imageUrl: 'car_image_url_3', description: 'Car details and description go here.' },
  // ... Add more cars as needed
  { id: 4, model: 'Car Model 4', imageUrl: 'car_image_url_4', description: 'Car details and description go here.' },
  { id: 5, model: 'Car Model 5', imageUrl: 'car_image_url_5', description: 'Car details and description go here.' },
  // ... Add more cars as needed
  { id: 6, model: 'Car Model 6', imageUrl: 'car_image_url_6', description: 'Car details and description go here.' },
  { id: 7, model: 'Car Model 7', imageUrl: 'car_image_url_7', description: 'Car details and description go here.' },
  // ... Add more cars as needed
];

const ViewCars = () => {
  return (
    <div className="container py-16">
      <h2>View Cars</h2>
      <div className="grid grid-cols-5 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="bg-gray-100 p-4 rounded-md">
            <img src={car.imageUrl} alt={`Car ${car.id}`} className="w-full h-32 object-cover mb-4" />
            <h3 className="text-lg font-semibold">{car.model}</h3>
            <p>{car.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCars;
