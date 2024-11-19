import React from 'react';

const Banner = ({ title, subtitle, backgroundImage }) => (
  <div className="relative max-w-screen-xl mx-auto">
    <div
      className="bg-cover bg-center h-64 rounded-lg overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})`, filter: 'brightness(70%)' }}
    />
    <div className="absolute inset-0 flex items-center justify-center bg-green-800 bg-opacity-50 rounded-lg">
      <div className="text-center py-4">
        <h1 className="text-white text-4xl font-bold brightness-100">{title}</h1>
        <p className="text-white text-xl">{subtitle}</p>
      </div>
    </div>
  </div>
);

export default Banner;