"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { useRouter } from "next/navigation";
import { IoMenuSharp } from "react-icons/io5";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para manejar la visibilidad del menú
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false); // Estado para hover en el Dropdown o su contenido
  const handleMouseEnter = () => {setIsHovered(true); setDropdownVisible(true)}
  const handleMouseLeave = () => {setIsHovered(false); setDropdownVisible(false)}
  const [dropdownTrigger, setDropdownTrigger] = useState(["hover"]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const updateTrigger = () => {
      if (window.innerWidth <= 768) {
        setDropdownTrigger(["click"]);
      } else {
        setDropdownTrigger(["hover"]);
      }
    };
    updateTrigger();
    window.addEventListener("resize", updateTrigger);
    return () => window.removeEventListener("resize", updateTrigger);
  }, []);

  const handleOptionClick = (path) => {
    router.push(path);
    toggleMenu();
    setDropdownVisible(false);
    setIsHovered(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const items = [
    {
      label: (
        <a
          className="relative block w-full min-w-full py-2 px-4 hover:text-gray-900 hover:bg-[--blanco] hover:rounded-md hover:border-r-4 hover:border-[--verde] transition-all m-0"
          onClick={() => handleOptionClick("/ListaAlojamiento")}
          target="_blank"
        >
          Alojamientos
        </a>
      ),
    },
    {
      label: (
        <a
          className="relative block w-full min-w-full py-2 px-4 hover:text-gray-900 hover:bg-[--blanco] hover:rounded-md hover:border-r-4 hover:border-[--verde] transition-all m-0"
          onClick={() => handleOptionClick("/ListaRestaurantes")}
          target="_blank"
        >
          Restaurantes
        </a>
      ),
    },
    {
      label: (
        <a
          className="relative block w-full min-w-full py-2 px-4 hover:text-gray-900 hover:bg-[--blanco] hover:rounded-md hover:border-r-4 hover:border-[--verde] transition-all m-0"
          onClick={() => handleOptionClick("/ListaActividades")}
          target="_blank"
        >
          Actividades
        </a>
      ),
    },
    {
      label: (
        <a
          className="relative block w-full min-w-full py-2 px-4 hover:text-gray-900 hover:bg-[--blanco] hover:rounded-md hover:border-r-4 hover:border-[--verde] transition-all m-0"
          onClick={() => handleOptionClick("/ListaEventosNoticias")}
          target="_blank"
        >
          Eventos e Noticias
        </a>
      ),
    },
    ,
    {
      label: (
        <a
          className="relative block w-full min-w-full py-2 px-4 hover:text-gray-900 hover:bg-[--blanco] hover:rounded-md hover:border-r-4 hover:border-[--verde] transition-all m-0"
          onClick={() => handleOptionClick("/ListaServicios")}
          target="_blank"
        >
          Servicios
        </a>
      ),
    },
  ];

  return (
    <nav className="bg-white border-b-4 border-[--verder-super-oscuro] montserrat z-[5000]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <a href="/">
          <Image
            src={logo}
            width={0}
            height={0}
            className="w-16 md:w-20"
            alt="Logo Villa Serrana Club Social y Deportivo"
          />
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[--verde-menu] rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <IoMenuSharp size={"large"} />
          <span className="sr-only">Open main menu</span>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full lg:block lg:w-auto`}
          id="navbar-default"
        >
          <ul className="font-bold flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-white lg:bg-white lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0">
            <li
              onClick={() => router.push("/")}
              className="cursor-pointer block py-2 px-3 text-[--azul] rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-[--verde] transition-all lg:border-0"
            >
              Inicio
            </li>
            <li>
              <Dropdown
                overlay={
                  <div
                    className="bg-white border border-gray-200 rounded-lg relative top-[-10px]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {items.map((item, index) => (
                      <div key={index} className="">
                        {item.label}
                      </div>
                    ))}
                  </div>
                }
                trigger={dropdownTrigger}
                onVisibleChange={(visible) => setIsHovered(visible)}
                visible={dropdownVisible}
              >
                <div
                  className="block"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-[--verde] transition-all lg:border-0">
                    <Space className="flex items-center">
                      <span
                        className={`${
                          isHovered ? "text-[--verde]" : ""
                        } transition-all`}
                      >
                        Que encuentras
                      </span>
                      <DownOutlined
                        className={`transform transition-transform duration-300 ${
                          isHovered ? "rotate-0 text-[--verde]" : "rotate-90"
                        }`}
                      />
                    </Space>
                  </a>
                </div>
              </Dropdown>
            </li>
            <li>
              <a
                href="/sobrenosotros"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-[--verde] transition-all lg:border-0"
              >
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a
                href="/contacto"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-[--verde] transition-all lg:border-0"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
