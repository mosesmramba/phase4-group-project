import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProfilePage from './components/pages/ProfilePage';
import RentCarPage from './components/pages/RentCarPage';
import ViewCarsPage from './components/pages/ViewCarsPage';
import SignUpPage from './components/auth/SignUpPage';  
import LoginPage from './components/auth/LogInPage';    

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LandingPage />} />
         <Route path="/profile" element={<ProfilePage />} />
         <Route path="/rent-vehicle" element={<RentCarPage />} />
         <Route path="/cars" element={<ViewCarsPage />} />
         <Route path="/signup" element={<SignUpPage />} />
         <Route path="/login" element={<LoginPage />} />
        </Routes>
    </Router>
  );
}

export default App;