'use client';
import Image from 'next/image';
import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

// Redes Sociales
const EnlacesRedesSociales = () => (
  <div className="flex items-center justify-center md:justify-end space-x-3 md:ml-7  mt-4 md:mt-0 pt-2">
    <a href="https://www.instagram.com/club_villa_serrana/" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 transform hover:scale-110 hover:text-pink-600"> <FaInstagram size="2.5em" /></a>
    <a href="https://www.facebook.com/ClubVillaSerrana/" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 transform hover:scale-110 hover:text-blue-600"> <FaFacebook size="2.5em" /></a>
  </div>
);

// Enlaces Destacados
const EnlacesDestacados = () => (
  <div className="mt-8 md:mt-0 text-center md:text-left pt-14">
    <h2 className="text-2xl font-bold mb-4"><span>DESTACADOS</span></h2>
    <ul className="mt-2 space-y-2">
      <li><a href="/ListaAlojamiento" className="hover:underline transition-colors duration-300 hover:text-blue-300">ALOJAMIENTOS</a></li>
      <li><a href="/ListaEventosNoticias" className="hover:underline transition-colors duration-300 hover:text-blue-300">NOTICIAS Y EVENTOS</a></li>
      <li><a href="/ListaActividades" className="hover:underline transition-colors duration-300 hover:text-blue-300">ACTIVIDADES</a></li>
      <li><a href="/ListaRestaurantes" className="hover:underline transition-colors duration-300 hover:text-blue-300">RESTAURANTES</a></li>
      <li><a href="/ListaServicios" className="hover:underline transition-colors duration-300 hover:text-blue-300">SERVICIOS</a></li>
    </ul>
  </div>
);

// Información
const Informacion = () => (
  <div className="flex flex-col items-center md:items-start w-full md:w-auto mb-8 md:mb-0 pt-14">
    <div className="flex flex-col items-center md:flex-row md:items-start mb-4 md:mb-6">
      <img src="/images/logo.png" alt="Club Social y Deportivo Villa Serrana" className="w-32 mb-4 md:mb-0 md:mr-4" />
      <div className="text-center md:text-left max-w-[300px]">
        <h2 className="text-2xl font-bold mb-4"><span>TU DESTINO PERFECTO</span></h2>
        <p className="mb-2">VILLA SERRANA ES TU DESTINO IDEAL PARA UNAS VACACIONES INOLVIDABLES.</p>
        <p className="mb-2">DISFRUTA DE LA NATURALEZA, ACTIVIDADES AL AIRE LIBRE, Y LA MEJOR GASTRONOMÍA LOCAL.</p>
      </div>
    </div>
    <EnlacesRedesSociales />
  </div>
);

const BackgroundImage = ({ src, alt, className }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        quality={100}
        priority
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
};

// Componente Principal del Footer
export default function PieDePagina() {
  return (
    <div className='text-[--blanco] w-full mt-2'>
      <footer className="relative text-blanco py-20">
        <BackgroundImage
          src="https://res.cloudinary.com/dvzf7szuo/image/upload/v1731370862/WhatsApp_Image_2024-11-11_at_5.52.22_PM_1_nltp4q_1_grnkwg.png"
          alt="Footer background"
        />
        <div className="relative z-10 max-w-screen-xl container mx-auto flex flex-col md:flex-row md:justify-around md:items-start space-y-7 md:space-y-0 px-7 md:py-6">
          <Informacion />
          <EnlacesDestacados />
        </div>
      </footer>
    </div>
  );
}
