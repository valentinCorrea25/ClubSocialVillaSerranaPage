import React from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { Button } from "antd";

export default function PanelDeControl() {
  return (
    <div className="flex">
      <div className=" h-full min-h-[100vh] bg-[--verde-menu] border-x-4 border-[--verde-oscuro-alternativo] flex flex-col justify-between">
        
        <div>
          <div className="w-2/3 m-auto my-16">
            <Image
              src={logo}
              width={0}
              height={0}
              className="w-[100%]"
              alt="Logo Villa Serrana Club Social y Deportivo"
            />
          </div>
          
          <h1 className="text-center font-bold text-3xl my-5">Menu</h1>
          <ul className="m-auto container flex flex-col gap-5 text-center w-full">
            <li className="menuControlPanelOpcion">
              Todas las publicaciones
            </li>
            <li className="menuControlPanelOpcion">
              Noticias, Activiadades y Eventos
            </li>
            <li className="menuControlPanelOpcion">
              Alquileres
            </li>
            <li className="menuControlPanelOpcion">
              Restaurantes
            </li>
            <li className="menuControlPanelOpcion">
              Servicsios
            </li>
            <li className="menuControlPanelOpcion">
              Crear nuevo usuario
            </li>
          </ul>
        </div>

        <div className="flex justify-center flex-col">
          <div className="text-center py-4">Usuario: {'Martin'}</div>
          <Button size="large" className="w-full mb-4 py-2 bg-[--verde-menu-claro] border-0" >Salir</Button>
        </div>

      </div>

      <div className="w-full">
        <div className="bg-blue-400 w-full p-10 text-3xl">
          Todas las Publicaciones
        </div>
      </div>

    </div>
  );
}
