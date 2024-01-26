// CarReviewsContext.js

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define the initial state
const initialState = {
  carReviews: [],
  error: null,
};

// Define actions
const actions = {
  SET_CAR_REVIEWS: 'SET_CAR_REVIEWS',
  SET_ERROR: 'SET_ERROR',
};

// Reducer function
const carReviewsReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_CAR_REVIEWS:
      return { ...state, carReviews: action.payload, error: null };
    case actions.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Create the context
const CarReviewsContext = createContext();

// Create the context provider
export const CarReviewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carReviewsReducer, initialState);

  // Fetch car reviews on component mount
  useEffect(() => {
    const fetchCarReviews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/carreviews'); // Adjust the API endpoint accordingly
        const data = await response.json();
        dispatch({ type: actions.SET_CAR_REVIEWS, payload: data.car_reviews });
      } catch (error) {
        dispatch({ type: actions.SET_ERROR, payload: 'Failed to fetch car reviews' });
      }
    };

    fetchCarReviews();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <CarReviewsContext.Provider value={{ state, dispatch }}>
      {children}
    </CarReviewsContext.Provider>
  );
};

// Custom hook to use the context
export const useCarReviews = () => {
  const context = useContext(CarReviewsContext);

  if (!context) {
    throw new Error('useCarReviews must be used within a CarReviewsProvider');
  }

  return context;
};