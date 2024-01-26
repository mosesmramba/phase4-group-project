// CarReviews.js

import React, { useEffect } from 'react';
import { useCarReviews } from '../contexts/CarReviewsContext';

const CarReviews = () => {
  const { state, dispatch } = useCarReviews();

  useEffect(() => {
    const fetchCarReviews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/carreviews');
        const data = await response.json();
        dispatch({ type: 'SET_CAR_REVIEWS', payload: data.car_reviews });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch car reviews' });
      }
    };

    fetchCarReviews();
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 bg-orange-600 rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-white">Car Reviews</h2>
      {state.error && <p className="text-red-500">{state.error}</p>}
      {state.carReviews.map((review) => (
        <div className=''>
            <div key={review.id} className="bg-white p-6 my-4 rounded-md shadow-md mx-auto max-w-md">
            <p className="text-xl font-semibold mb-2">Rating: {review.rating}</p>
            <p className="text-black font-semibold mb-2">Comment: {review.comment}</p>
            <p className="text-black font-semibold mb-2">User: {review.user_id}</p>
            <p className="text-blak font-semibold">Car: {review.car_id}</p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default CarReviews;
