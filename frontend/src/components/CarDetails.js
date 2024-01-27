import React, { useContext, useEffect, useState } from 'react';
import { useCarContext } from '../contexts/CarContext';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
 
  const {carId} = useParams()
  const [car, setCar] =useState([])
  useEffect(() => {
    fetch(`/cars/${carId}`)
    .then((res) => res.json())
    .then((data) => {
      setCar(data)
    })
    
  }, [carId])
  
  

  if (!car) {
    return <div>loading.....</div>; // You might want to handle the case where the car is not found differently
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">{car.name} Details</h1>

      <div className="bg-white p-4 rounded-md shadow-md">
        <img src={car.image} alt={car.name} className="img-fluid" />

        {/* Display other car details here */}
        <div className="mb-2">
          <span className="font-semibold">Name:</span> {car.name}
        </div>

        <div className="mb-2">
          <span className="font-semibold">Brand:</span> {car.brand}
        </div>

        <div className="mb-2">
            <span className="font-semibold">Model:</span> {car.model}
        </div>

        <div className="mb-2">
            <span className="font-semibold">Year:</span> {car.year}
        </div>

        <div className="mb-2">
            <span className="font-semibold">Color:</span> {car.color}
        </div>

        <div className="mb-2">
            <span className="font-semibold">Daily Rate:</span> ${car.daily_rate}
        </div>

      </div>
    </div>
  );
};

export default CarDetails;