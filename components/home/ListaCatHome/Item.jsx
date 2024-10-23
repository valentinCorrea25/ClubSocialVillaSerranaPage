import React from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { ClockCircleOutlined, HomeOutlined, SunOutlined, EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function Item({ informacion, type }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center montserrat max-w-72">
      {type == 1 ? (
        <>
          <div className="p-4 shadow-md border w-full max-w-sm md:max-w-md lg:max-w-lg"
            onClick={()=>router.push(`/ListaAlojamiento/DetalleAlojamiento?id=${informacion.id_Alquiler}`)}
          >
            <div className="mb-4 w-full h-[180px] max-h-[250px]">
              <img
                src={informacion?.fotos?.[0]}
                className="w-full h-full object-cover shadow-lg cursor-pointer"
                alt={informacion?.titulo}
              />
            </div>
            <div className="ml-2">
              <h1 className="hover:text-[--verde] transition-all font-extrabold text-lg md:text-lg cursor-pointer text-left">
                {informacion?.titulo?.length > 20
                  ? informacion.titulo.substring(0, 20) + "..."
                  : informacion?.titulo}
              </h1>
              <h2 className="text-left font-normal flex items-center md:justify-start gap-1 text-sm">
                <EnvironmentOutlined size={12} />
                {informacion?.ubicacion_calles}
              </h2>
              <h2 className="font-normal flex items-center md:justify-start gap-1 text-sm">
                <PhoneOutlined size={12} />
                {informacion?.celular?.substring(0, 12)}
              </h2>
              <h3 className="font-normal flex items-center md:justify-start gap-1 text-sm">
                <HomeOutlined size={12} /> Hasta
                <span className="font-extrabold">{informacion.capacidad}</span>
                personas
              </h3>
            </div>
          </div>
        </>
      ) : type == 2 ? (
        <>
          <div className="p-4 shadow-md border w-full max-w-sm md:max-w-md lg:max-w-lg" 
          onClick={()=>router.push(`/ListaRestaurantes/DetalleRestaurante?id=${informacion.id_Restaurant}`)}>
            
            <div className="mb-4 w-full max-h-[250px]">
              <img
                src={informacion?.fotos?.[0]}
                className="w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] cursor-pointer"
                alt={informacion?.titulo}
              />
            </div>
            <div className="ml-2 mt-4 text-sm">
              <h1 className="hover:text-[--verde] transition-all font-extrabold text-lg md:text-lg cursor-pointer text-left">
                {informacion?.titulo?.length > 24
                  ? informacion.titulo.substring(0, 24) + "..."
                  : informacion?.titulo}
              </h1>
              <h2 className="font-normal flex items-center justify-start text-left gap-0.5">
                <EnvironmentOutlined size={10} />
                {informacion?.ubicacion_calles}
              </h2>
              <h2 className="font-normal flex items-center gap-0.5 text-left">
                <ClockCircleOutlined size={10} />
                Lunes a Viernes: {informacion?.horario_semanal}
              </h2>
              <h2 className="font-normal flex items-center gap-0.5 text-left">
                <SunOutlined size={10} />
                Sábados: {informacion?.horario_finde}
              </h2>
            </div>
          </div>
        </>
      ) : type == 3 ? (
        <>
          <div className="p-4 shadow-md border w-full max-w-sm md:max-w-md lg:max-w-lg">
            <div className="mb-4 w-full h-[180px] max-h-[250px]">
              <img
                src={informacion?.foto}
                className="w-full h-full object-cover shadow-lg cursor-pointer"
                alt={informacion?.titulo}
              />
            </div>
            
            <h1 className="hover:text-[--verde] transition-all font-extrabold text-lg md:text-lg cursor-pointer text-left">
              {informacion?.titulo?.length > 40
                ? informacion.titulo.substring(0, 40) + "..."
                : informacion?.titulo}
            </h1>
            <p className="font-normal leading-5 text-sm text-justify w-full max-w-[320px] md:max-w-none">
              {informacion?.contenido?.length > 120
                ? informacion.contenido.substring(0, 110) + "... "
                : informacion?.contenido}
              <a className="text-[--verde] font-semibold cursor-pointer">
                Ver más
              </a>
            </p>
            <h3 className="font-semibold text-xs md:text-sm text-[--verde-oscuro] mt-2">
              {informacion?.fecha}
            </h3>
          </div>
        </>
      ) : type == 4 ? (
        <>
          <div className="p-4 shadow-md border w-full max-w-sm md:max-w-md lg:max-w-lg">
            <div className=" mb-4 w-full h-[180px] max-h-[250px]">
              <img
                src={informacion?.fotos?.[0]}
                className="w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] cursor-pointer"
                alt={informacion?.titulo}
              />
            </div>
            <div className="ml-2 text-sm">
              <h1 className="hover:text-[--verde] transition-all font-extrabold text-lg md:text-lg cursor-pointer text-left">
                {informacion?.titulo?.length > 24
                  ? informacion.titulo.substring(0, 24) + "..."
                  : informacion?.titulo}
              </h1>
              <h2 className="font-normal flex items-center gap-0.5">
                <ClockCircleOutlined size={10} />
                Horario {informacion?.horario}
              </h2>
              <h2 className="font-normal flex items-center gap-0.5">
                <EnvironmentOutlined size={10} />
                {informacion?.titulo?.substring(4)}
              </h2>
            </div>
          </div>
        </>
      ) : type == 5 ? (
        <>
          <div className="w-full text-center max-w-56">
            <h1 className="hover:text-[--verde] transition-all font-extrabold text-lg cursor-pointer mt-2 text-center">
              {informacion?.titulo}
            </h1>
            <h2 className="font-normal justify-center flex items-center gap-0.5">
              <FaWhatsapp /> Contacto: {informacion?.celular?.substring(0, 12)}
            </h2>
            <h3 className="font-semibold text-xs text-[--verde-oscuro]">
              {informacion?.nombre_titular}
            </h3>
          </div>
        </>
      ) : null}
    </div>
  );
}
