import React from 'react';
import { Carousel as AntdCarousel } from 'antd';

const Carousel = ({ alojamiento }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <AntdCarousel arrows infinite={false}>
      {alojamiento.images.map((image) => (
        <div key={image.id} className="relative w-full h-full">
          <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
        </div>
      ))}
    </AntdCarousel>
  </div>
);

export default Carousel;
