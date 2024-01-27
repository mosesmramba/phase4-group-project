import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function ViewProfile() {
const {currentUser} = useContext(AuthContext)
   
 
 
   return (
     <div>
       <h2>View Profile</h2>
      
         <div>
           <p>Username: {currentUser.username}</p>
           <p>Email: {currentUser.email}</p>
           <p>Phone: {currentUser.phone}</p>
         </div>
      
     </div>
   );
}
