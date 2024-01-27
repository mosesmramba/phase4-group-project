import React, { createContext, useEffect, useState } from 'react'


export const BookingsContext = createContext()
export default function BookingsProvider({children}) {
  const [bookings,setBookings] = useState([])
  const authToken = sessionStorage.getItem('authToken');

  useEffect(() => {
    
  
      fetch('/bookings', {
        headers: {
          Authorization: `Bearer ${authToken && authToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          // console.log(data)
        })
        .catch((error) => {
          console.log(`Error fetching bookings data: ${error}`);
        })
        .finally(() => {
          
        });
   
    
  }, [])
  

// console.log(bookings)
  const contextData = {
    bookings
  }
  return (
    <BookingsContext.Provider value={contextData}>
      {children}
    </BookingsContext.Provider>
  )
}
