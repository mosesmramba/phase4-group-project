// src/components/auth/SignInForm.jsx
import React from 'react';

const SignInForm = () => {
  const handleSignIn = (e) => {
    e.preventDefault();
    // Simulate sign-in functionality (e.g., show a success message)
    console.log('Simulating sign-in...');
  };

  return (
    <form onSubmit={handleSignIn}>
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
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
