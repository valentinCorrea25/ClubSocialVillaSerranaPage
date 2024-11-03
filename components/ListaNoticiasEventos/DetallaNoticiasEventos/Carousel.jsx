import React from 'react';
import { Carousel as AntdCarousel } from 'antd';

const Carousel = ({ eventosnoticias }) => {
  const fotos = eventosnoticias?.fotos;
  
  if (!fotos?.length) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <AntdCarousel
        arrows
        infinite={false}
        className="max-w-full"
      >
        {fotos.map((foto, index) => (
          <div 
            key={index} 
            className="relative aspect-[16/9] w-full"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={foto}
                alt={`${eventosnoticias.titulo} - ${index + 1}`}
                className="max-h-[500px] w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </AntdCarousel>
    </div>
  );
};

export default Carousel;