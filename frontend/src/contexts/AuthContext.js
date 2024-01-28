import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const AuthContext = createContext()

export default function AuthProvider({children}) {
  const [authToken, setAuthToken] = useState(()=> sessionStorage.getItem("authToken")? sessionStorage.getItem("authToken"): null )
  const [currentUser, setCurrentUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()
  const [onchange, setOnchange] = useState(false)


  // Login
  function login(email, password)
  {
      fetch("https://rent-car-xa5m.onrender.com/login",{
          method: "POST",
          headers: {
              "Content-Type": "application/json",

          },
          body: JSON.stringify({email,password })

      }
      )
      .then(res => res.json())
      .then(response => {
          
          if (response.access_token)
          {
              sessionStorage.setItem("authToken", response.access_token);
              setAuthToken(response.access_token)
              setLoggedIn(true)

              navigate("/cars")
              Swal.fire({
              position: "center",
              icon: "success",
              title: "Login success",
              showConfirmButton: false,
              timer: 1500
              });

              setOnchange(!onchange)
          }
          else{
              Swal.fire({
                  position: "center",
                  icon: "error",
                  title: response.error,
                  showConfirmButton: false,
                  timer: 1500
                  });
          }


      })
  }


    // Get Authenticated user
    useEffect(()=>{
      if(authToken)
      {
          fetch("https://rent-car-xa5m.onrender.com/loggedIn",{
          method: "GET",
          headers: {
              Accept: "application/json",
              Authorization: `Bearer ${authToken}`
          }
          })
          .then(res => res.json())
          .then(response => {
              if(response.email || response.username){
                  setCurrentUser(response)
                  
                  setCurrentUser(response)
                  // console.log(response)

                  setLoggedIn(true)
              }
              else{
                  setCurrentUser(null)
                  setLoggedIn(false)
                  navigate('/')
              }
          })
      }
  

  }, [authToken, onchange])
  // console.log(currentUser)

    //logout
    function logout(){
      fetch('https://rent-car-xa5m.onrender.com/logout',{
         method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${authToken && authToken}`
        }

     })
     .then(res => res.json())
     .then(response => {
      Swal.fire({
         position: "top-end",
         icon: "success",
         title: response.success,
         showConfirmButton: false,
         timer: 1500
         });
         navigate('/')
         setLoggedIn(false)
         
     })
     
     setLoggedIn(false)
     navigate('/')
   }




  const contextData = {
    login,
    currentUser,
    loggedIn,
    logout

  }
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}
