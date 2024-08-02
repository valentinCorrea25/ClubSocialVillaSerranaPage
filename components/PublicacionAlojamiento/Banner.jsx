'use client';
import React from 'react';

const Banner = ({ title, subtitle, backgroundImage, textColor }) => (
  <div 
    className="relative text-center py-16 px-8 sm:px-10 lg:px-15"
    style={{backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    backgroundSize: 'cover',backgroundPosition: 'center',color: textColor || '#FFFFFF', borderRadius: '23px', overflow: 'hidden',}}>
    
    <div className="absolute inset-0 z-0"style={{ background: 'linear-gradient(135deg, rgba(3, 103, 166, 0.5) 0%, rgba(30, 58, 138, 0.5) 100%)', borderRadius: '23px',}}/>
    
    <div className="relative z-10">
      <h1 className="text-4xl font-bold">{title}</h1>
      {subtitle && <h2 className="text-xl mt-2">{subtitle}</h2>}
    </div>
  </div>
);

export default Banner;
