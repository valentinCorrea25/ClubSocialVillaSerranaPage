import React from "react";
import Link from "next/link";

const BotonesNavegacion = () => {
  const botones = [
    {
      nombre: "Historia",
      descripcion: "Conoce nuestra trayectoria",
      href: "https://mvulbmjlvpjujjfvffph.supabase.co/storage/v1/object/public/pdfs/historia.pdf?t=2024-12-13T20%3A11%3A24.005Z",
    },
    {
      nombre: "Proyecto Sede",
      descripcion: "Descubre nuestro objetivo",
      href: "https://mvulbmjlvpjujjfvffph.supabase.co/storage/v1/object/public/pdfs/proyecto-csdvs.pdf?t=2024-12-13T20%3A11%3A30.915Z",
    },
    {
      nombre: "Estatutos",
      descripcion: "Revisa nuestras normas",
      href: "https://mvulbmjlvpjujjfvffph.supabase.co/storage/v1/object/public/pdfs/estatutos-digital.pdf?t=2024-12-13T20%3A11%3A04.598Z",
    },
    {
      nombre: "Guía de Servicios PDF",
      descripcion: "Explora lo que ofrecemos",
      href: "https://mvulbmjlvpjujjfvffph.supabase.co/storage/v1/object/public/pdfs/Guia%20de%20servicios-2024-1.pdf?t=2024-12-13T20%3A11%3A18.729Z",
    },
    {
      nombre: "Lista de Servicios web",
      descripcion: "Explora los servicios",
      href: "/ListaServicios",
    },
    {
      nombre: "Contacto",
      descripcion: "Comunícate con nosotros",
      href: "/contacto",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 max-w-screen-xl mx-auto px-4">
      {botones.map((boton) => (
        <Link
          key={boton.nombre}
          href={boton.href}
          className="group flex flex-col items-center justify-center lg:p-2 p-3 sm:p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[var(--verde)] hover:bg-[var(--verde)] hover:text-white text-center aspect-square"
        >
          <h3 className="lg:text-base text-lg sm:text-xl font-bold mb-1 sm:mb-2 group-hover:text-white text-[var(--verde)]">
            {boton.nombre}
          </h3>
          <p className="text-xs sm:text-sm mb-2 sm:mb-4 group-hover:text-white text-gray-600">
            {boton.descripcion}
          </p>
          <div className="flex items-center text-[var(--verde)] group-hover:text-white text-xs sm:text-sm">
            <span>Click aquí</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BotonesNavegacion;
