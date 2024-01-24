import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

export default function Navbar() 
{
  return (
    <nav className="bg-blue-100 p-2">
      <div className="container mx-auto flex items-center justify-between p-2">
        <img src={logo} alt="Logo" className="w-48 h-32 mx-4" />
        <a href="/" className="text-4xl font-mono font-bold ">RENT-A-CAR</a>
        <div className="hidden lg:flex flex-grow items-center justify-end" id="navbarNav">
          <ul className="flex space-x-4 font-mono text-2xl">
            <li className="nav-item">
              <Link to="/" className="nav-link active">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/cars" className="nav-link active">Cars</Link>
            </li>
            <li className="nav-item">
              <Link to="/rent-vehicle" className="nav-link active">Rent Vehicle</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link active">Profile</Link>
            </li>
          
            <button className="btn btn-success btn-sm me-3">
              <Link to="/signup" className="nav-link active text-white">Sign Up</Link>
            </button>
            <li className="btn btn-success btn-sm">
              <Link to="/login" className="nav-link active text-white">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}