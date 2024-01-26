// UserContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    // Check if the user is already authenticated (e.g., by checking a token)
    // If authenticated, set the user in the state
    // You need to replace the placeholder logic with your actual authentication check
    const isAuthenticated = /* Implement your authentication check logic */ false;
    if (isAuthenticated) {
      fetch('http://127.0.0.1:5000/loggedIn')
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: 'SET_USER', payload: { user: data } });
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, []); 

  const loginUser = (userData) => {
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'SET_USER', payload: { user: data } });
      })
      .catch((error) => console.error('Error logging in:', error));
  };

  const logoutUser = () => {
    fetch('http://127.0.0.1:5000/logout', {
      method: 'POST',
    })
      .then(() => {
        dispatch({ type: 'LOGOUT' });
      })
      .catch((error) => console.error('Error logging out:', error));
  };

  return (
    <UserContext.Provider value={{ state, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
