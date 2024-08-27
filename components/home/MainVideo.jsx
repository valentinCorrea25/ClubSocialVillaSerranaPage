import React from "react";
import videoBG from "@/public/Villa.mp4";
export default function MainVideo() {
  return (
    <div className="w-full h-[100vh] relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.4)]"></div>
      <video
        src={videoBG}
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      />
      <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-white p-10">
        <h1 className="text-center text-5xl">Bienvenido a Villa Serrana</h1>
        <p className="max-w-[1000px] text-xl text-center">
          Villa Serrana es un oasis natural en Uruguay, con paisajes hermosos,
          arquitectura única, y una tranquilidad perfecta para desconectar y
          recargar energías. Un destino ideal para amantes de la naturaleza y la
          paz.
        </p>
      </div>
    </div>
  );
}
