// src/components/pages/UserProfile.js
import React from 'react';

const userProfiles = [
  // 20 user profiles with relevant information
  { id: 1, username: 'User1', imageUrl: 'user_image_url_1', bookingHistory: ['Booking 1', 'Booking 2'] },
  { id: 2, username: 'User2', imageUrl: 'user_image_url_2', bookingHistory: ['Booking 3', 'Booking 4'] },
  { id: 3, username: 'User3', imageUrl: 'user_image_url_3', bookingHistory: ['Booking 5', 'Booking 6'] },
  // ... Add more user profiles as needed
  { id: 4, username: 'User4', imageUrl: 'user_image_url_4', bookingHistory: ['Booking 7', 'Booking 8'] },
  { id: 5, username: 'User5', imageUrl: 'user_image_url_5', bookingHistory: ['Booking 9', 'Booking 10'] },
  // ... Add more user profiles as needed
  { id: 6, username: 'User6', imageUrl: 'user_image_url_6', bookingHistory: ['Booking 11', 'Booking 12'] },
  { id: 7, username: 'User7', imageUrl: 'user_image_url_7', bookingHistory: ['Booking 13', 'Booking 14'] },
  // ... Add more user profiles as needed
];

const UserProfile = () => {
  return (
    <div className="container py-16">
      <h2>User Profile</h2>
      <div className="grid grid-cols-5 gap-4">
        {userProfiles.map((user) => (
          <div key={user.id} className="bg-gray-100 p-4 rounded-md">
            <img src={user.imageUrl} alt={`User ${user.id}`} className="w-full h-32 object-cover mb-4" />
            <h3 className="text-lg font-semibold">{user.username}</h3>
            <p>Booking History: {user.bookingHistory.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
