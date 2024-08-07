import React from 'react';

const Banner = ({ title, subtitle, backgroundImage }) => (
  <div
    className="bg-cover bg-center h-64 rounded-2xl overflow-hidden relative mb-12" 
    style={{ backgroundImage: `url(${backgroundImage})`, filter: 'brightness(70%)',margin: '40px 20px', 
    }}>
    <div className="absolute inset-0 flex items-center justify-center bg-blue-800 bg-opacity-50 rounded-2xl">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-xl">{subtitle}</p>
      </div>
    </div>
  </div>
);

export default Banner;
