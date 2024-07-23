import React from 'react'
import Image from 'next/image'
import { FaWhatsapp } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";


export default function Item({informacion, type}) {
  return (
    <div className='flex flex-col items-start justify-center'>
        {type != 5 ? (
          <div className='mb-4 w-[230px] h-[110px]'>
            <img src={informacion.foto} className='w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] cursor-pointer'/>
          </div>
        ) : null}

        {type == 1 ? (
          <>
            <h1 className='font-extrabold text-xl cursor-pointer'> {informacion.categoria}</h1>
            <h2 className='font-normal flex items-center gap-0.5'><FaMapMarkerAlt size={10}/>{informacion.ubicacion}</h2>
            <h3>Hasta <span className='font-extrabold'> {informacion.cantidad_personas}</span> personas</h3>
          </>) : 

          type == 2 ? (
            <>
              <h1 className='font-extrabold text-lg cursor-pointer'> {informacion.titulo.length > 24 ? informacion.titulo.substring(0,24)+"..." : informacion.titulo}</h1>
              <h2 className='font-normal flex items-center gap-0.5'>{informacion.horarios}</h2>
              <h2 className='font-normal flex items-center gap-0.5'>{informacion.horariofinde}</h2>
            </>) :
          
          type == 3 ? (
          <>
            <h1 className='font-extrabold text-lg cursor-pointer'> {informacion.titulo.length > 26 ? informacion.titulo.substring(0,24)+"..." : informacion.titulo}</h1>
            <p className='font-normal leading-5 text-justify w-[220px]'>{informacion.contenido.length > 120 ? informacion.contenido.substring(0,110)+"... " : informacion.contenido}
              <a className='text-[--verde] font-semibold'>Ver mas</a>
            </p>
            <h3 className='font-semibold text-xs text-[--verde-oscuro]'>{informacion.fecha}</h3>
          </>) :
          
          type == 4 ? (
            <>
              <h1 className='font-extrabold text-lg cursor-pointer'> {informacion.titulo.length > 24 ? informacion.titulo.substring(0,24)+"..." : informacion.titulo}</h1>
              <h2 className='font-normal flex items-center gap-0.5'>{informacion.horario}</h2>
              <h2 className='font-normal flex items-center gap-0.5'><FaMapMarkerAlt size={10}/>{informacion.ubicacion}</h2>
            </>) :
          
          type == 5 ? (
            <>
              <h1 className='font-extrabold text-lg cursor-pointer mt-2'> {informacion.titulo}</h1>
              <h2 className='font-normal flex items-center gap-0.5'><FaWhatsapp/> Contacto: {informacion.tel}</h2>
              <h3 className='font-semibold text-xs text-[--verde-oscuro]'>{informacion.nombre_titular}</h3>
              
            </>) :
    
          null}
    </div>
  )
}
