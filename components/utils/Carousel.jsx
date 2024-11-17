import React, { useRef } from "react";
import { Carousel as AntdCarousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Carousel = ({ record }) => {
  const carouselRef = useRef(null);

  const goToNext = () => {
    carouselRef.current.next();
  };

  const goToPrevious = () => {
    carouselRef.current.prev();
  };

  // Validación para retornar null si no hay fotos
  if (!record?.fotos || record.fotos.length === 0) {
    return null;
  }

  return (
    <div className="p-2 rounded-lg shadow-lg relative">
      <AntdCarousel ref={carouselRef} infinite autoplay draggable dots={true}>
        {record.fotos.map((foto, index) => (
          <div key={index} className="relative aspect-[16/9] w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={foto}
                alt={`${record.titulo} - ${index + 1}`}
                className="max-h-[500px] w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </AntdCarousel>

      <div
        onClick={goToPrevious}
        className="absolute top-0 left-2 sm:left-5 h-full w-[50px] flex items-center justify-center transition-all hover:sm:left-6 hover:left-3 cursor-pointer hover:bg-[#0000002f]"
        style={{ zIndex: 1 }}
      >
        <LeftOutlined style={{ fontSize: "24px", color: 'white' }} />
      </div>

      <div
        onClick={goToNext}
        className="absolute top-0 right-2 sm:right-5 h-full w-[50px] flex items-center justify-center transition-all hover:sm:right-6 hover:right-3 cursor-pointer hover:bg-[#0000002f]"
        style={{ zIndex: 1 }}
      >
        <RightOutlined style={{ fontSize: "24px", color: "white" }} />
      </div>
    </div>
  );
};

export default Carousel;