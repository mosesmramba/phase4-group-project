import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import {Outlet} from 'react-router-dom';

function Layout() {
  return (
    <div className='container'>
        <NavBar /> 
          
          <Outlet /> {/* To render the current route selected */}

        <Footer />
    </div>
  )
}

export default Layout;