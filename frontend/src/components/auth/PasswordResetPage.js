// src/components/auth/PasswordResetPage.js
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const PasswordResetPage = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
  });

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Implement your password reset logic here, e.g., make an API request

    // Assume successful password reset for now
    // Redirect to the login page
    history.push('/login');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container py-16">
      <h2>Reset Password</h2>
      <form onSubmit={handlePasswordReset}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Reset Password
        </button>
      </form>
      <p className="mt-4">
        Remember your password? <Link to="/login">Login</Link>
      </p>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default PasswordResetPage;
