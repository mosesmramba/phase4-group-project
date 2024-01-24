// src/components/auth/SignUpForm.jsx
import React from 'react';

const SignUpForm = () => {
  const handleSignUp = (e) => {
    e.preventDefault();
    // Simulate sign-up functionality (e.g., show a success message)
    console.log('Simulating sign-up...');
  };

  return (
    <form onSubmit={handleSignUp}>
      <label>
        Email:
        <input type="email" />
      </label>
      <br />
      <label>
        Password:
        <input type="password" />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
