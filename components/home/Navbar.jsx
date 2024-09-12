'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '@/public/images/logo.png';
import { useRouter } from 'next/navigation';
import { IoMenuSharp } from "react-icons/io5";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para manejar la visibilidad del menú
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false); // Estado para hover en el Dropdown o su contenido
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const [dropdownTrigger, setDropdownTrigger] = useState(['hover']);
  useEffect(() => {
    const updateTrigger = () => {
      if (window.innerWidth <= 768) {
        setDropdownTrigger(['click']);
      } else {
        setDropdownTrigger(['hover']); 
      }
    };
    updateTrigger();
    window.addEventListener("resize", updateTrigger);
    return () => window.removeEventListener("resize", updateTrigger);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
   const items = [
      {
        label: (
          <a className="relative block w-full min-w-full py-2 px-4 hover:text-gray-900 hover:bg-green-300 hover:rounded-md hover:border-r-4 hover:border-[--verde] transition-all m-0"
          onClick={() => router.push('/ListaRestaurantes')} target="_blank" >
            Restaurantes
          </a>
        ),
      },
      {
        label: (
          <a className="relative block w-full min-w-full py-2 px-4 hover:text-gray-900 hover:bg-green-300 hover:rounded-md hover:border-r-4 hover:border-[--verde] transition-all m-0"
          onClick={() => router.push('/ListaAlojamiento')} target="_blank">
            Alojamientos
          </a>
        ),
      },
      { 
        label: (
          <a className="relative block w-full min-w-full py-2 px-4  hover:text-gray-900 hover:bg-green-300 hover:rounded-md hover:border-r-4 hover:border-[--verde] transition-all m-0"
          onClick={() => router.push('/ListaActividades')} target="_blank" >
            Actividades
          </a>
        ),
      },{
        label: (
          <a className="relative block w-full min-w-full py-2 px-4  hover:text-gray-900 hover:bg-green-300 hover:rounded-md hover:border-r-4 hover:border-[--verde] transition-all m-0"
          onClick={() => router.push('/ListaEventosNoticias')} target="_blank">
            Eventos e Noticias
          </a>
        ),
      },
    ]

  return (
    <nav className="bg-[--blanco] border-b-4 pt-10 border-[--verder-super-oscuro] montserrat z-[5000]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto">
        <a href="/">
          <Image src={logo} width={0} height={0} className="w-1/4 max-w-96 py-1" alt="Logo Villa Serrana Club Social y Deportivo" />
        </a>
        <button 
          onClick={toggleMenu} 
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[--verde-menu] rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
          aria-controls="navbar-default" 
          aria-expanded={isOpen}
        >
          <IoMenuSharp size={'large'}/>
          <span className="sr-only">Open main menu</span>
          {/* Aquí puedes agregar un ícono como un menú hamburguesa o una "X" para cerrar */}
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} my-5 bg-[--verde-menu-claro] lg:bg-[--blanco] w-full lg:block lg:w-auto`} id="navbar-default">
          <ul className="font-bold flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0">
            <li onClick={() => router.push('/')} className="block py-2 px-3 text-[--azul] rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-[--verde] transition-all lg:border-0">
              Home
            </li>
            <li>
<<<<<<< HEAD
              {/* <a href="/QueEncuentras" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-[--verde] transition-all lg:border-0">Que encuentras</a> */}
                <Dropdown
                  overlay={
                    <div 
                      className="bg-white border border-gray-200 rounded-lg"
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
                  trigger={dropdownTrigger} // Cambia entre 'click' y 'hover'
                  onVisibleChange={(visible) => setIsHovered(visible)} // También cambia el estado cuando el menú está visible
                >
                  <div
                    className="block"
                    onMouseEnter={handleMouseEnter}  // Activa hover cuando el mouse entra al Dropdown
                    onMouseLeave={handleMouseLeave}  // Desactiva hover cuando el mouse sale del Dropdown
                  >
                    <a
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-[--verde] transition-all lg:border-0"
                    >
                      <Space className="flex items-center">
                        <span className={`${isHovered ? 'text-[--verde]' : ''} transition-all`}>
                          Que encuentras
                        </span>
                        <DownOutlined
                          className={`transform transition-transform duration-300  ${isHovered ? 'rotate-0 text-[--verde]' : 'rotate-90 '}`}
                        />
                      </Space>
                    </a>
                  </div>
                </Dropdown>
=======
              <a href="/queencuentras" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-[--verde] transition-all lg:border-0">Que encuentras</a>
>>>>>>> a8b86e20cde3420259a669655683ef777646912c
            </li>
            <li>
              <a href="/sobrenosotros" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-[--verde] transition-all lg:border-0">Sobre Nosotros</a>
            </li>
            <li>
              <a href="/contacto" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent hover:text-[--verde] transition-all lg:border-0">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
