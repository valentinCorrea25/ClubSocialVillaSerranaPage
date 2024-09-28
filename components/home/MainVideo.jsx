import React from "react";
import BotonQueEncuentras from "./BotonQueEncuentras";
export default function MainVideo() {
  const video =
    "https://mvulbmjlvpjujjfvffph.supabase.co/storage/v1/object/public/video/Villa.mp4?t=2024-08-30T20%3A59%3A06.243Z";

  return (
    <div className="w-full h-[100vh] relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.4)]"></div>
      <video
        src={video}
        autoPlay
        muted
        loop
        type="video/mp4"
        className="w-full h-full object-cover"
      />
      <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-white p-7 md:p-10">
        <h1 className="text-center text-4xl md:text-5xl">
          Bienvenido a Villa Serrana
        </h1>
        <p className="max-w-[1000px] text-md md:text-xl text-center mt-4 mb-10">
          Villa Serrana es un oasis natural en Uruguay, con paisajes hermosos,
          arquitectura única, y una tranquilidad perfecta para desconectar y
          recargar energías. Un destino ideal para amantes de la naturaleza y la
          paz.
        </p>
        <BotonQueEncuentras/>
      </div>
    </div>
  );
}
