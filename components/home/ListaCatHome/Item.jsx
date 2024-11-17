import React, { useState } from "react";
import {
  ClockCircleOutlined,
  HomeOutlined,
  SunOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { FaWhatsapp } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import ModalServicio from "@/components/ListaServicios/ModalServicio";

const processContent = (content) => {
  if (!content) return "";
  const stripped = content.replace(/<[^>]+>/g, "");
  return stripped.length > 110 ? stripped.substring(0, 120) + "... " : stripped;
};

const processTitle = (title, maxLength) => {
  if (!title) return "";
  return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
};

export default function Item({ informacion = {}, type }) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  
  const handleCancel = () => setVisible(false);
  const showModal = () => setVisible(true);

  const renderContent = () => {
    const processedContent = processContent(informacion?.contenido);
    return (
      <p className="font-normal leading-5 text-sm text-justify w-full max-w-[320px] md:max-w-none">
        {processedContent}
        {processedContent && (
          <a className="text-[--verde] font-semibold cursor-pointer"> Ver más</a>
        )}
      </p>
    );
  };

  const getCardContent = () => {
    switch (type) {
      case 1:
        return (
          <div
            className="p-4 shadow-md border max-w-sm md:max-w-md lg:max-w-lg sm:w-[280px] w-[260px] cursor-pointer h-[320px]"
            onClick={() => router.push(`/ListaAlojamiento/DetalleAlojamiento?id=${informacion.id_Alquiler}`)}
          >
            <div className="w-full h-[169px] max-h-[250px]">
              <img
                src={informacion?.fotos?.[0]}
                className="w-full h-[160px] max-h-[250px] object-cover shadow-lg cursor-pointer"
                alt={informacion?.titulo || "Alojamiento"}
              />
            </div>
            <div className="ml-2">
              <h1 className="hover:text-[--verde] transition-all font-extrabold text-lg md:text-lg cursor-pointer text-left">
                {processTitle(informacion?.titulo, 20)}
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
                <span className="font-extrabold">{informacion?.capacidad}</span>
                personas
              </h3>
            </div>
          </div>
        );

      case 2:
        return (
          <div
            className="p-4 shadow-md border max-w-sm md:max-w-md lg:max-w-lg sm:w-[280px] w-[260px] cursor-pointer h-[365px]"
            onClick={() => router.push(`/ListaRestaurantes/DetalleRestaurante?id=${informacion.id_Restaurant}`)}
          >
            <div className="w-full h-[169px] max-h-[250px]">
              <img
                src={informacion?.fotos?.[0]}
                className="w-full h-[169px] max-h-[250px] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] cursor-pointer"
                alt={informacion?.titulo || "Restaurante"}
              />
            </div>
            <div className="ml-2 mt-4 text-sm">
              <h1 className="hover:text-[--verde] transition-all font-extrabold text-lg md:text-lg cursor-pointer text-left">
                {processTitle(informacion?.titulo, 24)}
              </h1>
              <h2 className="font-normal flex items-center justify-start text-left gap-0.5">
                <EnvironmentOutlined size={10} />
                {informacion?.ubicacion_calles}
              </h2>
              <h2 className="font-normal flex items-center gap-0.5 text-left">
                <ClockCircleOutlined size={10} />
                Horario semana: {informacion?.horario_semanal}
              </h2>
              <h2 className="font-normal flex items-center gap-0.5 text-left">
                <SunOutlined size={10} />
                Fin de semana: {informacion?.horario_finde}
              </h2>
            </div>
          </div>
        );

      case 3:
        return (
          <div
            className="p-4 shadow-md border max-w-sm md:max-w-md lg:max-w-lg sm:w-[280px] w-[260px] h-[340px]"
            onClick={() => router.push(`/ListaEventosNoticias/DetalleEventosNoticias?id=${informacion.id_EventoNoticia}`)}
          >
            <div className="w-full h-[169px] max-h-[250px]">
              <img
                src={informacion?.fotos?.[0]}
                className="w-full h-[160px] max-h-[250px] object-cover shadow-lg cursor-pointer"
                alt={informacion?.titulo || "Evento/Noticia"}
              />
            </div>
            <h1 className="hover:text-[--verde] transition-all font-extrabold text-lg md:text-lg cursor-pointer text-left">
              {processTitle(informacion?.titulo, 35)}
            </h1>
            {renderContent()}
            <h3 className="font-semibold text-xs md:text-sm text-[--verde-oscuro] mt-2">
              {informacion?.fecha}
            </h3>
          </div>
        );

      case 4:
        return (
          <div
            className="p-4 shadow-md border max-w-sm md:max-w-md lg:max-w-lg sm:w-[280px] w-[260px] cursor-pointer h-[350px]"
            onClick={() => router.push(`/ListaActividades/DetalleActividades?id=${informacion.id_Actividad}`)}
          >
            <div className="w-full h-[169px] max-h-[250px]">
              <img
                src={informacion?.fotos?.[0]}
                className="w-full h-[160px] max-h-[250px] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] cursor-pointer"
                alt={informacion?.titulo || "Actividad"}
              />
            </div>
            <div className="ml-2 text-sm">
              <h1 className="hover:text-[--verde] transition-all font-extrabold text-lg md:text-lg cursor-pointer text-left">
                {processTitle(informacion?.titulo, 24)}
              </h1>
              <h2 className="font-normal flex items-center gap-0.5">
                <ClockCircleOutlined size={10} />
                Horario {informacion?.horario}
              </h2>
              <h2 className="font-normal flex items-center gap-0.5">
                <EnvironmentOutlined size={10} />
                {informacion?.titulo?.substring(4)}
              </h2>
              {renderContent()}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="w-full text-center h-36 px-2" onClick={showModal}>
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
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center montserrat max-w-72  cursor-pointer">
        {getCardContent()}
      </div>
      <ModalServicio isOpen={visible} handleCancel={handleCancel} servicio={informacion} />
    </>
  );
}