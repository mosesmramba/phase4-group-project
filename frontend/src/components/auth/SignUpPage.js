// src/components/auth/SignUpPage.js
import React, { useState } from 'react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    // Implement your sign-up logic here, e.g., make an API request
    console.log('Signing up with:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container py-16">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        {/* Your sign-up form fields */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
