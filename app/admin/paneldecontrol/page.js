'use client'
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import Alquileres from "@/components/panelDeControl/Alquileres";
import CrearNuevoUsuario from "@/components/panelDeControl/CrearNuevoUsuario";
import NoticiasEA from "@/components/panelDeControl/NoticiasEA";
import TodasLasPublicaciones from "@/components/panelDeControl/TodasLasPublicaciones";
import Servicios from "@/components/panelDeControl/Servicios";
import Restaurantes from "@/components/panelDeControl/Restaurantes";

export default function PanelDeControl() {
  const [currentComponent, setCurrentComponent] = useState('TodasLasPublicaciones');
  const [currentTitle, setCurrentTitle] = useState('Todas las Publicaciones');
  const router = useRouter();

  function setComponent(component) {
    switch (component) {
      case 1:
        setCurrentComponent('TodasLasPublicaciones');
        setCurrentTitle('Todas las publicaciones');
        break;
      case 2:
        setCurrentComponent('Alquileres');
        setCurrentTitle('Alquileres');
        break;
      case 3:
        setCurrentComponent('Restaurantes');
        setCurrentTitle('Restaurantes');
        break;
      case 4:
        setCurrentComponent('NoticiasEA');
        setCurrentTitle('Noticias, Activiadades y Eventos');
        break;
      case 5:
        setCurrentComponent('Servicios');
        setCurrentTitle('Servicios');
        break;
      case 6:
        setCurrentComponent('CrearNuevoUsuario');
        setCurrentTitle('Crear nuevo usuario');
        break;
    }
  }

  const renderComponent = () => {
    switch (currentComponent) {
      case 'TodasLasPublicaciones':
        return <TodasLasPublicaciones />;
      case 'Alquileres':
        return <Alquileres />;
      case 'Restaurantes':
        return <Restaurantes />;
      case 'NoticiasEA':
        return <NoticiasEA />;
      case 'Servicios':
        return <Servicios />;
      case 'CrearNuevoUsuario':
        return <CrearNuevoUsuario />;
      default:
        return <TodasLasPublicaciones />;
    }
  }

  return (
    <div className="flex">
      <div className="h-full min-h-[100vh] bg-[--verde-menu] border-x-4 border-[--verde-oscuro-alternativo] flex flex-col justify-between">
        
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
            <li className="menuControlPanelOpcion" onClick={() => setComponent(1)}>
              Todas las publicaciones
            </li>
            <li className="menuControlPanelOpcion" onClick={() => setComponent(2)}>
              Alquileres
            </li>
            <li className="menuControlPanelOpcion" onClick={() => setComponent(3)}>
              Restaurantes
            </li>
            <li className="menuControlPanelOpcion" onClick={() => setComponent(4)}>
              Noticias, Activiadades y Eventos
            </li>
            <li className="menuControlPanelOpcion" onClick={() => setComponent(5)}>
              Servicios
            </li>
            <li className="menuControlPanelOpcion" onClick={() => setComponent(6)}>
              Crear nuevo usuario
            </li>
          </ul>
        </div>

        <div className="flex justify-center flex-col">
          <div className="text-center py-4">Usuario: {'Martin'}</div>
          <Button size="large" className="w-full mb-4 py-2 bg-[--verde-menu-claro] border-0"
            onClick={() => router.push('/admin')}
          >
            Salir
          </Button>
        </div>

      </div>

      {/* Parte del sector seleccionado que es renderizada */}
      <div className="w-full">
        <div className="bg-blue-400 w-full p-10 text-3xl">
          {currentTitle}
        </div>

        {/* Página que se está renderizando */}
        {renderComponent()}

      </div>

    </div>
  );
}
