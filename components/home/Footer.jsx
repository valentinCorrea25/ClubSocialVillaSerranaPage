'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div>
      {/* Imagen superior del footer */}
      <img
        src="/images/footersuperior.png"
        className="w-full"
        style={{ marginBottom: '-8px' }} // Ajustar espacio extra
      />
      <footer className="relative text-white py-5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/footerinferior.png')",
            backgroundSize: "cover", 
            backgroundPosition: "center",
          }}
        ></div>
        <div className="relative container mx-auto flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0 px-4">
          <div className="flex flex-col items-center md:items-start relative w-full md:w-auto">
            <div className="flex flex-col items-center md:flex-row md:items-center mb-4">
              <img
                src="/images/logo.png"
                alt="Club Social y Deportivo Villa Serrana"
                className="w-32 mr-2 mb-4 md:mb-0"
              />
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">
                  <span className="underline-text">TU DESTINO PERFECTO</span>
                </h2>
                <p className="mb-2">
                  VILLA SERRANA ES TU DESTINO IDEAL PARA UNAS VACACIONES INOLVIDABLES.
                </p>
                <p className="mb-2">
                  DISFRUTA DE LA NATURALEZA, ACTIVIDADES AL AIRE LIBRE, Y LA MEJOR GASTRONOMÍA LOCAL.
                </p>
              </div>
            </div>
            {/* Redes Sociales */}
            <div className="flex items-center justify-center md:justify-start space-x-3 mt-4">
              <a href="https://www.instagram.com/club_villa_serrana/" target="_blank" rel="noopener noreferrer" className="ml-3 md:ml-6">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://www.facebook.com/ClubVillaSerrana/" target="_blank" rel="noopener noreferrer" className="ml-3 md:ml-6">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
            </div>
          </div>
          <div className="mt-8 md:mt-0 md:text-left md:ml-12 text-center md:text-left">
            <h2 className="text-2xl font-bold">
              <span className="underline-text">DESTACADOS</span>
            </h2>
            <ul className="mt-2 space-y-2">
              <li><a href="/guia-visual" className="hover:underline">GUÍA VISUAL DE VILLA SERRANA</a></li>
              <li><a href="/alojamientos" className="hover:underline">ALOJAMIENTOS</a></li>
              <li><a href="/noticias-eventos" className="hover:underline">NOTICIAS Y EVENTOS</a></li>
              <li><a href="/actividades" className="hover:underline">ACTIVIDADES</a></li>
              <li><a href="/servicios" className="hover:underline">SERVICIOS</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Estilo para el subrayado */}
      <style jsx>{`
        .underline-text {
          position: relative;
          display: inline-block;
          padding-bottom: 0.2em;
          border-bottom: 1px solid white;
          line-height: 1.5em;
        }
      `}</style>
    </div>
  );
};

export default Footer;
