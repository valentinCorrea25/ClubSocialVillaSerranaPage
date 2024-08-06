import React from 'react'
import Image from 'next/image'
import logo from '@/public/images/logo.png'

export default function Navbar() {
  return (
    <nav className="bg-[--blanco] border-b-4 border-[--verder-super-oscuro] montserrat">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-20 relative">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse absolute top-[30%]">
            <Image src={logo} width={0} height={0} className="w-[25%]" alt="Logo Villa Serrana Club Social y Deportivo"  />
        </a>
        <div className='h-8'/>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
    
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-bold flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a href="/" className="block py-2 px-3 text-[--azul] rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[--verde] transition-all md:border-0" >Home</a>
            </li>
            <li>
              <a href="/queencuentras" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-[--verde] transition-all md:border-0">Que encuentras</a>
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
  )
}
