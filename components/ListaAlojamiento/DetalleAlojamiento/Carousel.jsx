import React from 'react';
import { Carousel as AntdCarousel } from 'antd';

const Carousel = ({ alojamiento }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <AntdCarousel arrows infinite={false}>
      {alojamiento.fotos.map((image, index) => (
        <div key={index} className="flex justify-center items-center h-[500px] w-full">
          <img 
            src={image} 
            alt={alojamiento.titulo} 
            className="h-full w-full object-cover" 
          />
        </div>
      ))}
    </AntdCarousel>
  </div>
);

export default Carousel;
