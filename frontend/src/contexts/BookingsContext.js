// BookingsContext.js

import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialState = {
  bookings: [],
  error: null,
  loading: true,
};

const actionTypes = {
  SET_BOOKINGS: 'SET_BOOKINGS',
  SET_ERROR: 'SET_ERROR',
  SET_LOADING: 'SET_LOADING',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const BookingsContext = createContext();

const BookingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        const token = localStorage.getItem('your_auth_token_key'); // replace with your actual token key
        const response = await fetch('/https://127.0.0.1:5000/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching bookings');
        }

        const data = await response.json();
        dispatch({ type: actionTypes.SET_BOOKINGS, payload: data.bookings });
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      }
    };

    fetchBookings();
  }, []);

  return (
    <BookingsContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingsContext.Provider>
  );
};

const useBookings = () => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
};

export { BookingsProvider, useBookings, actionTypes };