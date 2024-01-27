import React from 'react';
import { Link } from 'react-router-dom';
import ViewProfile from '../components/ViewProfile';
import ChangePassword from '../components/ChangePassword';

const Profile = () => {
  return (
    <div className="container my-4">
      <div className="card text-center mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-header bg-warning">
          <h1 className="text-white">User Profile</h1>
        </div>
        <div className="card-body">
          <Link to={'/view_profile'} className="btn btn-primary">
            View Profile
          </Link>
          <br />
          <Link to={'/change_profile'} className="btn btn-primary mt-2">
            Change Password
          </Link>
          <div className="mt-4">
            {window.location.pathname === '/view_profile' && <ViewProfile />}
            {window.location.pathname === '/change_profile' && <ChangePassword />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
