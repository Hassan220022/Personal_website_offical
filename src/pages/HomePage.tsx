import React from 'react';
import Hero from '../components/home/Hero';
import JourneySection from '../components/home/JourneySection';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <JourneySection />
      </div>
    </div>
  );
};

export default HomePage;