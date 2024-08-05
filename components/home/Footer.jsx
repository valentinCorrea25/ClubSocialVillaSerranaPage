'use client';
import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

// Redes Sociales
const EnlacesRedesSociales = () => (
  <div className="flex items-center justify-center md:justify-end space-x-3 mt-4 md:mt-0 ml-7 pt-2">
    <a href="https://www.instagram.com/club_villa_serrana/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 transform hover:scale-110 hover:text-pink-600"> <FaInstagram size="2em" /></a>
    <a href="https://www.facebook.com/ClubVillaSerrana/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 transform hover:scale-110 hover:text-blue-600"> <FaFacebook size="2em" /></a>
  </div>
);

// Enlaces Destacados
const EnlacesDestacados = () => (
  <div className="mt-8 md:mt-0 text-center md:text-left pt-14">
    <h2 className="text-2xl font-bold mb-4"><span>DESTACADOS</span></h2>
    <ul className="mt-2 space-y-2">
      <li><a href="/guia-visual" className="hover:underline transition-colors duration-300 hover:text-blue-300">GUÍA VISUAL DE VILLA SERRANA</a></li>
      <li><a href="/ListaAlojamiento" className="hover:underline transition-colors duration-300 hover:text-blue-300">ALOJAMIENTOS</a></li>
      <li><a href="/noticias-eventos" className="hover:underline transition-colors duration-300 hover:text-blue-300">NOTICIAS Y EVENTOS</a></li>
      <li><a href="/actividades" className="hover:underline transition-colors duration-300 hover:text-blue-300">ACTIVIDADES</a></li>
      <li><a href="/servicios" className="hover:underline transition-colors duration-300 hover:text-blue-300">SERVICIOS</a></li>
    </ul>
  </div>
);

// Información
const Informacion = () => (
  <div className="flex flex-col items-center md:items-start w-full md:w-auto mb-8 md:mb-0 pt-14">
    <div className="flex flex-col items-center md:flex-row md:items-start mb-4 md:mb-6">
      <img src="/images/logo.png" alt="Club Social y Deportivo Villa Serrana" className="w-32 mb-4 md:mb-0 md:mr-4" />
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold mb-4"><span>TU DESTINO PERFECTO</span></h2>
        <p className="mb-2">VILLA SERRANA ES TU DESTINO IDEAL PARA UNAS VACACIONES INOLVIDABLES.</p>
        <p className="mb-2">DISFRUTA DE LA NATURALEZA, ACTIVIDADES AL AIRE LIBRE, Y LA MEJOR GASTRONOMÍA LOCAL.</p>
      </div>
    </div>
    <EnlacesRedesSociales />
  </div>
);

// Componente Principal del Footer
export default function PieDePagina() {
  return (
    <div>
      <footer className="relative text-blanco py-5">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/footer.jpg')", backgroundSize: 'cover' }}></div>
        <div className="relative container mx-auto flex flex-col md:flex-row md:justify-between md:items-start space-y-7 md:space-y-0 px-7 md:py-6">
          <Informacion />
          <EnlacesDestacados />
        </div>
      </footer>
    </div>
  );
}
