import React from 'react';
import { Carousel as AntdCarousel } from 'antd';

const Carousel = ({ eventosnoticias }) => {
  const fotos = eventosnoticias.fotos;
  console.log(fotos + 'fotos');
  if (!fotos) {
    return null;
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <AntdCarousel arrows infinite={false}>
        {fotos.map((foto, index) => (
          <div key={index} className="flex justify-center items-center h-[500px] w-full">
            <img src={foto} alt={`${eventosnoticias.titulo} - ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
          </div>
        ))}
      </AntdCarousel>
    </div>
  );
};

export default Carousel;