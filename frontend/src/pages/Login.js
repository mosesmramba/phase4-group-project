import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import loginImage from '../images/login.jpg';

import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)

function handleSubmit(e){
  e.preventDefault()
  login(email,password)
}






  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: new URLSearchParams({
  //         email,
  //         password,
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       // Store the access token in localStorage or a state management solution
  //       console.log('Access Token:', data.access_token);
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Success!',
  //         text: 'User logged in successfully!',
  //       });
  //       // Redirect to the cars page after successful login
  //       navigate('/cars');
  //     } else {
  //       const data = await response.json();
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: data.error || 'Login failed!',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'An error occurred during login!',
  //     });
  //   }
  // };

  return (
    <div className="container py-16 flex h-screen">
      {/* Left side - Image */}
      <div className="w-1/2">
        <img src={loginImage} alt="nice car" className="object-cover h-full w-full" />
      </div>

      {/* Right side - Login Form */}
      <div className="w-1/2 bg-orange-600 mx-auto flex items-center justify-center p-8">
        <div className="w-full max-w-md p-6 bg-blue-100 rounded-lg shadow-lg">
          <div className="text-center">
            <img className="h-24 mx-auto" src={logo} alt="My Company Logo" />
            <h2 className="mt-2 text-2xl font-semibold text-gray-800">Log in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Not a member? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {/* Additional features like "Remember me" can be added here */}
              </div>
              <div className="text-sm">
                <Link to="/" className="text-indigo-600 hover:underline">Forgot password?</Link>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;