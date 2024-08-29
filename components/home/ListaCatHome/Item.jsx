import React from 'react'
import Image from 'next/image'
import { FaWhatsapp } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";


export default function Item({informacion, type}) {
  return (
    <div className='flex flex-col items-center justify-center montserrat'>
        {/* {type != 5 ? (
          <div className='mb-4 w-full max-w-[250px] h-[110px]'>
            <img src={informacion.foto} className='w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] cursor-pointer'/>
          </div>
        ) : null} */}

        {type == 1 ? (
          <>
            <div className='p-2 shadow-md border w-full'>
              <div className='mb-4 w-full max-w-[250px] h-[110px]'>
                <img src={informacion.foto} className='w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] cursor-pointer'/>
              </div>
              <h1 className='font-extrabold text-xs cursor-pointer'> {informacion.categoria}</h1>
              <h1 className='hover:text-[--verde] transition-all font-extrabold text-xl cursor-pointer'> Titulo casa</h1>
              <h2 className='font-normal flex items-center gap-0.5'><FaMapMarkerAlt size={10}/>{informacion.ubicacion}</h2>
              <h3>Hasta <span className='font-extrabold'> {informacion.cantidad_personas}</span> personas</h3>          
            </div>
          </>) : 

          type == 2 ? (
            <>
             <div className='p-2 shadow-md border w-full'>
                <div className='mb-4 w-full max-w-[250px] h-[110px]'>
                  <img src={informacion.foto} className='w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] cursor-pointer'/>
                </div>
                <h1 className='font-extrabold text-lg cursor-pointer'> {informacion.titulo.length > 24 ? informacion.titulo.substring(0,24)+"..." : informacion.titulo}</h1>
                <h2 className='font-normal flex items-center gap-0.5'>{informacion.horarios}</h2>
                <h2 className='font-normal flex items-center gap-0.5'>{informacion.horariofinde}</h2>
              </div>
            </>) :
          
          type == 3 ? (
          <>
            <div className='p-2 shadow-md border w-full'>
                <div className='mb-4 w-full max-w-[250px] h-[110px]'>
                  <img src={informacion.foto} className='w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] cursor-pointer'/>
                </div>  
              <h1 className='font-extrabold text-lg cursor-pointer'> {informacion.titulo.length > 26 ? informacion.titulo.substring(0,24)+"..." : informacion.titulo}</h1>
              <p className='font-normal leading-5 text-justify w-[220px]'>{informacion.contenido.length > 120 ? informacion.contenido.substring(0,110)+"... " : informacion.contenido}
                <a className='text-[--verde] font-semibold'>Ver más</a>
              </p>
              <h3 className='font-semibold text-xs text-[--verde-oscuro]'>{informacion.fecha}</h3>
              </div>
          </>) :
          
          type == 4 ? (
            <>
              <div className='p-2 shadow-md border w-full'>
                <div className='mb-4 w-full max-w-[250px] h-[110px]'>
                  <img src={informacion.foto} className='w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] cursor-pointer'/>
                </div>
                <h1 className='font-extrabold text-lg cursor-pointer'> {informacion.titulo.length > 24 ? informacion.titulo.substring(0,24)+"..." : informacion.titulo}</h1>
                <h2 className='font-normal flex items-center gap-0.5'>{informacion.horario}</h2>
                <h2 className='font-normal flex items-center gap-0.5'><FaMapMarkerAlt size={10}/>{informacion.ubicacion}</h2>
              </div>
            </>) :
          
          type == 5 ? (
            <>
              <h1 className='hover:text-[--verde] transition-all font-extrabold text-lg cursor-pointer mt-2'> {informacion.titulo}</h1>
              <h2 className='font-normal flex items-center gap-0.5'><FaWhatsapp/> Contacto: {informacion.tel}</h2>
              <h3 className='font-semibold text-xs text-[--verde-oscuro]'>{informacion.nombre_titular}</h3>
              
            </>) :
    
          null}
    </div>
  )
}
