import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import Footer from '../layout/Footer';
import logo from '../../images/logo (1).png';

export default function NavbarComponent() {
  return (
    <Layout> {/* Include the Layout component */}
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
              {/* ... other menu items */}
            </ul>
          </div>
        </div>
      </nav>
      <Footer /> {/* Include the Footer component */}
    </Layout>
  );
}
