import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const authToken = sessionStorage.getItem('authToken');
  const handleChangePassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        const response = await fetch('https://rent-car-xa5m.onrender.com/change_password', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken && authToken}`,
        },
          body: JSON.stringify({
            current_password:currentPassword,
            new_password:newPassword
          }),
        });

        if (response.success) {
          // Password changed successfully, navigate to the desired page
          navigate('/view_profile');
        } else {
          // Display an error message based on the response
          const errorData = await response.json();
          navigate('/view_profile');
        }
      } catch (error) {
        console.error('Error changing password:', error.message);
      }
    } else {
      // Display an error or alert for password mismatch
      alert("Passwords don't match");
    }
  };

  return (
    <div className="card mt-4 mx-auto" style={{ maxWidth: '400px' }}>
      <div className="card-header bg-success">
        <h2 className="text-white">Change Password</h2>
      </div>
      <div className="card-body">
        <label className="d-block mb-2">
          Current Password:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="form-control form-control-sm"
          />
        </label>
        <label className="d-block mb-2">
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control form-control-sm"
          />
        </label>
        <label className="d-block mb-2">
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control form-control-sm"
          />
        </label>
        <button onClick={handleChangePassword} className="btn btn-primary">
          Change Password
        </button>
      </div>
    </div>
  );
}
