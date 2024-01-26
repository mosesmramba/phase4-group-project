import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Cars from './pages/Cars';
import Bookings from './pages/Bookings';
import CarReviews from './pages/CarReviews';
import CarDetails from './components/CarDetails';
import { CarProvider } from './contexts/CarContext';
import { BookingsProvider } from './contexts/BookingsContext';
import { CarReviewsProvider } from './contexts/CarReviewsContext';

function App() {
  return (
    <CarReviewsProvider>
    <BookingsProvider>
    <CarProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:carId" element={<CarDetails />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/carreviews" element={<CarReviews />} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
    </CarProvider>
    </BookingsProvider>
    </CarReviewsProvider>
  );
}

export default App;