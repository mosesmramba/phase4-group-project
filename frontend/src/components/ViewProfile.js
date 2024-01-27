import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ViewProfile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="card mt-4">
      <div className="card-header bg-info">
        <h2 className="text-white">View Profile</h2>
      </div>
      <div className="card-body">
        <div>
          <p className="mb-1">Username: {currentUser.username}</p>
          <p className="mb-1">Email: {currentUser.email}</p>
          <p className="mb-0">Phone: {currentUser.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
