import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function ChangePassword() {
   const navigate = useNavigate()
   const [currentPassword, setCurrentPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
 
   const handleChangePassword = async () => {
     navigate('/profile/view');
   };
 
   return (
     <div>
       <h2>Change Password</h2>
       <label>
         Current Password:
         <input
           type="password"
           value={currentPassword}
           onChange={(e) => setCurrentPassword(e.target.value)}
         />
       </label>
       <br />
       <label>
         New Password:
         <input
           type="password"
           value={newPassword}
           onChange={(e) => setNewPassword(e.target.value)}
         />
       </label>
       <br />
       <button onClick={handleChangePassword}>Change Password</button>
     </div>
   );
}
