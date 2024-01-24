import React from 'react';
import car from '../images/car.png';

function LandingPage() {
  return (
    <div className='bg-orange-600'>
        <main className="py-16">
            <section className="hero flex items-center justify-between text-center">
                <div className="w-1/2 pr-4">
                    <h1 className="text-5xl text-white font-mono font-bold mb-4">Discover the Freedom of the Open Road</h1>
                    <p className="text-white text-2xl font-mono mb-4">
                        We are thrilled to have you here, ready to embark on a journey of convenience and style. 
                        Whether you're planning a weekend getaway, a business trip, 
                        or just need a reliable set of wheels for everyday adventures, we've got you covered.
                    </p>
                </div>
                <img src={car} alt="Car" className="w-1/2 mx-auto my-4" />
            </section>
        </main>
    </div>
  );
}

export default LandingPage;
