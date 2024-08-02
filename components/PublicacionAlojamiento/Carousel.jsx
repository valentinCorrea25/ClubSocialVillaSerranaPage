'use client';
import React from 'react';
import { Carousel as AntdCarousel } from 'antd';
import { CarouselImages } from '@/test/data';

const Carousel = () => (
  <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
    <AntdCarousel arrows infinite={false}>
      {CarouselImages.map(image => (
        <div key={image.id} className="relative w-full h-full">
          <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
        </div>
      ))}
    </AntdCarousel>
  </div>
);

export default Carousel;
