'use client';
import React from 'react';
import Image from 'next/image';
import logo from '@/public/images/logo.png';

export default function Navbar() {
  return (
    <nav className="bg-[--blanco] border-b-4 border-[--verder-super-oscuro] montserrat">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-20 relative">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse absolute top-[30%]">
            <Image src={logo} width={0} height={0} className="w-[25%]" alt="Logo Villa Serrana Club Social y Deportivo"  />
        </a>
        <div className='h-8'/>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            {/* <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg> */}
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-bold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a href="/" className="block py-2 px-3 text-[--azul] rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[--verde] transition-all md:border-0" aria-current="page">Home</a>
            </li>
            <li className="relative group">
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[--verde] transition-all md:border-0">Que encuentras</a>
              <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <li>
                  <a href="/Alojamientos" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 transition-all">Alojamientos</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[--verde] transition-all md:border-0">Sobre Nosotros</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[--verde] transition-all md:border-0">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
