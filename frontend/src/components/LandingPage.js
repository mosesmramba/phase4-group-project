import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './layout/Layout';  // Assuming you have a Layout component

const LandingPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8">Welcome to Rent-A-Car!</h1>
        <p className="text-lg mb-6">
          Explore our collection of high-quality cars and find the perfect vehicle for your needs.
        </p>
        <Link to="/cars" className="btn btn-primary">
          View Cars
        </Link>
      </div>
    </Layout>
  );
};

export default LandingPage;
