'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/public/images/logo.png';
import { useRouter } from 'next/navigation';
import { IoMenuSharp } from "react-icons/io5";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para manejar la visibilidad del menú
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[--blanco] border-b-4 border-[--verder-super-oscuro] montserrat z-[5000]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-20 relative">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse absolute top-[0%]">
          <Image src={logo} width={0} height={0} className="md:w-[6vw] w-[15vw]" alt="Logo Villa Serrana Club Social y Deportivo" />
        </a>
        <div className='h-8'/>
        <button 
          onClick={toggleMenu} 
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[--verde-menu] rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
          aria-controls="navbar-default" 
          aria-expanded={isOpen}
        >
          <IoMenuSharp size={'large'}/>
          <span className="sr-only">Open main menu</span>
          {/* Aquí puedes agregar un ícono como un menú hamburguesa o una "X" para cerrar */}
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} my-5 bg-[--verde-menu-claro] md:bg-[--blanco] w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-bold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li onClick={() => router.push('/')} className="block py-2 px-3 text-[--azul] rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[--verde] transition-all md:border-0">
              Home
            </li>
            <li>
              <a href="/QueEncuentras" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[--verde] transition-all md:border-0">Que encuentras</a>
            </li>
            <li>
              <a href="/sobrenosotros" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[--verde] transition-all md:border-0">Sobre Nosotros</a>
            </li>
            <li>
              <a href="/contacto" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[--verde] transition-all md:border-0">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
