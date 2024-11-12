import React from 'react';

const Banner = ({ title, subtitle, backgroundImage }) => (
  <div
    className="bg-cover bg-center h-64 rounded-lg mx-3 overflow-hidden relative max-w-screen-xl"
    style={{ backgroundImage: `url(${backgroundImage})`, filter: 'brightness(70%)', padding: "40px 10px" }}
  >
    <div className="absolute inset-0 flex items-center justify-center bg-green-800 bg-opacity-50 rounded-lg">
      <div className="text-white text-center">
        <h1 className="text-white text-4xl font-bold">{title}</h1>
        <p className="text-xl text-white">{subtitle}</p>
      </div>
    </div>
  </div>
);

export default Banner;
