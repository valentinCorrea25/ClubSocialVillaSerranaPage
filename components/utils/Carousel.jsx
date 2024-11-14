import React, { useRef } from 'react';
import { Carousel as AntdCarousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Carousel = ({ record }) => {
  const carouselRef = useRef(null);

  const goToNext = () => {
    carouselRef.current.next();
  };

  const goToPrevious = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative">
      <AntdCarousel
        ref={carouselRef}
        infinite
        autoplay
        draggable
        dots={true}
      >
        {record.fotos.map((image, index) => (
          <div key={index} className="flex justify-center items-center h-[200px] sm:h-[450px] w-full">
            <img 
              src={image} 
              alt={record.titulo} 
              className="object-contain h-full w-full" 
            />
          </div>
        ))}
      </AntdCarousel>

      <div
        onClick={goToPrevious}
        className="absolute top-0 left-2 sm:left-5 h-full w-[50px] flex items-center justify-center transition-all hover:sm:left-6 hover:left-3 cursor-pointer"
        style={{ zIndex: 1 }}
      >
        <LeftOutlined style={{ fontSize: '24px', color: 'white' }} />
      </div>

      <div
        onClick={goToNext}
        className="absolute top-0 right-2 sm:right-5 h-full w-[50px] flex items-center justify-center transition-all hover:sm:right-6 hover:right-3 cursor-pointer"
        style={{ zIndex: 1 }}
      >
        <RightOutlined style={{ fontSize: '24px', color: 'white' }} />
      </div>
    </div>
  );
};

export default Carousel;
