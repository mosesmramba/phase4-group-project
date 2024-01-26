import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';

const useNavigation = () => {
  const navigate = useNavigate();

  const redirectTo = (path) => {
    navigate(path);
  };

  return { redirectTo };
};

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { redirectTo } = useNavigation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        handleToken(data.access_token);

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User signed up successfully!',
        });

        redirectTo('/');
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.error || 'Signup failed!',
        });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred during signup!',
      });
    }
  };

  const handleToken = (token) => {
    document.cookie = `authToken=${token}; path=/; secure; HttpOnly; SameSite=Strict`;
    // You might want to decode the token and store user info as well
  };

  return (
    <div className="container py-4 flex h-screen">
      <div className="w-full mx-auto flex items-center justify-center bg-orange-600">
        <div className="w-full max-w-lg p-8 bg-blue-100 rounded-lg shadow-lg">
          <img src={logo} alt="company logo" className="w-1/2 mx-auto my-4" />
          <h2 className="mt-10 text-center text-3xl font-mono font-bold leading-9 tracking-tight text-gray-900">
            Sign Up for an account
          </h2>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
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
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
