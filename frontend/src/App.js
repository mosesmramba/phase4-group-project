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
import { CarReviewsProvider } from './contexts/CarReviewsContext';
import AuthProvider from './contexts/AuthContext';
import BookingsProvider from './contexts/BookingsContext';
import Profile from './pages/Profile';
import ChangePassword from './components/ChangePassword';
import ViewProfile from './components/ViewProfile';
import AddCarForm from './pages/AddCarForm';
import AddBookingForm from './pages/AddBookingsForm';



function App() {
  return (
    <BrowserRouter>
    <CarReviewsProvider>
      <BookingsProvider>
    <CarProvider>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:carId" element={<CarDetails />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/carreviews" element={<CarReviews />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/view_profile' element={<ViewProfile />} />
          <Route path='/change_profile' element={<ChangePassword/>} />
          <Route path='/add_car' element={<AddCarForm/>} />
          <Route path='/rent-vehicle' element={<AddBookingForm/>} />
          </Route>
        
      </Routes>
    </AuthProvider>
    </CarProvider>
    </BookingsProvider>

    </CarReviewsProvider>
    </BrowserRouter>
  );
}

export default App;