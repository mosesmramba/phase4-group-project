// CarReviews.js

import React, { useState, useEffect } from 'react';
import { useCarReviews } from '../contexts/CarReviewsContext';

const CarReviews = () => {
  const { state, dispatch } = useCarReviews();
  const [newReview, setNewReview] = useState({ rating: 0, comment: '', user_id: '', car_id: '' });

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

  const handleCreateReview = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/carreviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      const data = await response.json();
      dispatch({ type: 'ADD_CAR_REVIEW', payload: data.newReview });
      setNewReview({ rating: 0, comment: '', user_id: '', car_id: '' }); // Reset form
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create car review' });
    }
  };

  const handleUpdateReview = async (id, updatedReview) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/carreviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
      });
      const data = await response.json();
      dispatch({ type: 'UPDATE_CAR_REVIEW', payload: { id, updatedReview: data.updatedReview } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update car review' });
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/carreviews/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        dispatch({ type: 'DELETE_CAR_REVIEW', payload: id });
      } else {
        // Handle non-successful response (optional)
        console.error(`Failed to delete car review. Status: ${response.status}`);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to delete car review' });
      }
    } catch (error) {
      // Handle network error or other unexpected issues
      console.error('Error during delete request:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete car review' });
    }
  };
  
  return (
    <div className="container mx-auto p-4 bg-orange-600 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Car Reviews</h2>
      {state.error && <p className="text-red-500">{state.error}</p>}

      {/* Form for creating new reviews */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">Create a New Review</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            placeholder="Rating"
            className="p-2 border rounded w-16 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            placeholder="Comment"
            className="p-2 border rounded w-64 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            value={newReview.user_id}
            onChange={(e) => setNewReview({ ...newReview, user_id: e.target.value })}
            placeholder="User ID"
            className="p-2 border rounded w-32 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            value={newReview.car_id}
            onChange={(e) => setNewReview({ ...newReview, car_id: e.target.value })}
            placeholder="Car ID"
            className="p-2 border rounded w-32 focus:outline-none focus:border-blue-500"
          />
          <button onClick={handleCreateReview} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
            Create
          </button>
        </div>
      </div>

      {/* Display existing reviews */}
      {state.carReviews.map((review) => (
        <div key={review.id} className="bg-white p-6 my-4 rounded-md shadow-md">
          <p className="text-xl font-semibold mb-2">Rating: {review.rating}</p>
          <p className="text-gray-800 mb-2">{review.comment}</p>
          <p className="text-gray-600 mb-2">User: {review.user_id}</p>
          <p className="text-gray-600">Car: {review.car_id}</p>

          {/* Form for updating a review */}
          <div className="mt-4">
            <h4 className="text-lg font-bold mb-2">Update Review</h4>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={review.updatedRating || ''}
                onChange={(e) => dispatch({ type: 'SET_UPDATED_RATING', payload: { id: review.id, updatedRating: e.target.value } })}
                placeholder="Rating"
                className="p-2 border rounded w-16 focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                value={review.updatedComment || ''}
                onChange={(e) => dispatch({ type: 'SET_UPDATED_COMMENT', payload: { id: review.id, updatedComment: e.target.value } })}
                placeholder="Comment"
                className="p-2 border rounded w-64 focus:outline-none focus:border-green-500"
              />
              <button
                onClick={() => handleUpdateReview(review.id, { rating: review.updatedRating, comment: review.updatedComment })}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green"
              >
                Update
              </button>
            </div>
          </div>

          {/* Button to delete the review */}
          <button
            onClick={() => handleDeleteReview(review.id)}
            className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CarReviews;