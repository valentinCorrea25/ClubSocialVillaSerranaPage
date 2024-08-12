"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { Menu, Switch } from 'antd';
import { FaHouse } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";
import { FaPeopleCarry } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";
import Alquileres from "@/components/panelDeControl/Alquileres";
import CrearNuevoUsuario from "@/components/panelDeControl/CrearNuevoUsuario";
import NoticiasEA from "@/components/panelDeControl/NoticiasEA";
import TodasLasPublicaciones from "@/components/panelDeControl/TodasLasPublicaciones";
import Servicios from "@/components/panelDeControl/Servicios";
import Restaurantes from "@/components/panelDeControl/Restaurantes";

export default function PanelDeControl() {
  const [currentComponent, setCurrentComponent] = useState(
    "TodasLasPublicaciones"
  );
  const [currentTitle, setCurrentTitle] = useState("Todas las Publicaciones");
  const router = useRouter();
  const [current, setCurrent] = useState('1');

  const items = [
    {
      label: "Todas las Publicaciones",
      icon: <AiOutlineRead />,
    },
    {
      label: "Alquileres",
      icon: <FaHouse />,
    },
    {
      label: "Restaurantes",
      icon: <GiKnifeFork />,
    },
    {
      label: "Noticias, Actividades y Eventos",
      icon: <FaRegNewspaper />,
    },
    {
      label: "Servicios",
      icon: <FaPeopleCarry />,
    },
    {
      label: "Crear Nuevo Usuario",
      icon: <FaUserEdit />,
    },
  ];

  function setComponent(component) {
    switch (component) {
      case 'tmp-0':
        setCurrentComponent("TodasLasPublicaciones");
        setCurrentTitle("Todas las publicaciones");
        break;
      case 'tmp-1':
        setCurrentComponent("Alquileres");
        setCurrentTitle("Alquileres");
        break;
      case 'tmp-2':
        setCurrentComponent("Restaurantes");
        setCurrentTitle("Restaurantes");
        break;
      case 'tmp-3':
        setCurrentComponent("NoticiasEA");
        setCurrentTitle("Noticias, Activiadades y Eventos");
        break;
      case 'tmp-4':
        setCurrentComponent("Servicios");
        setCurrentTitle("Servicios");
        break;
      case 'tmp-5':
        setCurrentComponent("CrearNuevoUsuario");
        setCurrentTitle("Crear nuevo usuario");
        break;
    }
  }

  const renderComponent = () => {
    switch (currentComponent) {
      case "TodasLasPublicaciones":
        return <TodasLasPublicaciones />;
      case "Alquileres":
        return <Alquileres />;
      case "Restaurantes":
        return <Restaurantes />;
      case "NoticiasEA":
        return <NoticiasEA />;
      case "Servicios":
        return <Servicios />;
      case "CrearNuevoUsuario":
        return <CrearNuevoUsuario />;
      default:
        return <TodasLasPublicaciones />;
    }
  };

  const onClick = (e) => {
    console.log("click ", e);
    setComponent(e.key);
  };

  return (
    <div className="flex md:flex-row flex-col">
      {/* Menú lateral en pantallas grandes y navbar en pantallas pequeñas */}
      <div className="md:h-full md:min-h-[100vh] md:w-[25%] w-full bg-[--verde-menu] border-x-4 border-[--verde-oscuro-alternativo] flex flex-col justify-between">
        <div>
          <div className="md:w-1/3 h-1/6 m-auto md:my-16 my-5">
            <Image
              src={logo}
              width={0}
              height={0}
              className="md:w-[100%] w-1/2"
              alt="Logo Villa Serrana Club Social y Deportivo"
            />
          </div>
          <h1 className="text-center font-bold text-3xl my-5">Menu</h1>
          <>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="vertical"
              items={items}
            />
          </>
        </div>

        <div className="flex justify-center flex-col">
          <div className="text-center py-4">Usuario: {"Martin"}</div>
          <Button
            size="large"
            className="w-full mb-4 py-2 bg-[--verde-menu-claro] border-0"
            onClick={() => router.push("/admin")}
          >
            Salir
          </Button>
        </div>
      </div>

      {/* Parte del sector seleccionado que es renderizada */}
      <div className="w-full">
        <div className="bg-blue-400 w-full p-10 text-3xl">{currentTitle}</div>

        {/* Página que se está renderizando */}
        {renderComponent()}
      </div>
    </div>
  );
}
