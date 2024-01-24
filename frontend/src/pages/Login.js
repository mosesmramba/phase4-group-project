import React, { useState } from 'react';
import loginImage from '../images/login.jpg';
import logo from '../images/logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your login logic here, e.g., make an API request
    console.log('Logging in with:', { email, password });
  };

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
            <p className="mt-2 text-sm text-gray-600">Not a member? <a href="/signup" className="text-indigo-600 hover:underline">Sign Up</a></p>
          </div>
          <form onSubmit={handleLogin} className="mt-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="mr-2 text-indigo-500 focus:ring-indigo-500" />
                <label htmlFor="remember-me" className="text-sm font-medium text-gray-600">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="/" className="text-indigo-600 hover:underline">Forgot password?</a>
              </div>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
