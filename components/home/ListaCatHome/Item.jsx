import React from 'react'
import Image from 'next/image'
import { FaMapMarkerAlt } from "react-icons/fa";


export default function Item({informacion}) {
  return (
    <div className='flex flex-col items-start justify-start'>
        <div className='mb-3 w-[220px] h-[100px]'>
          <img src={informacion.foto} className='w-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]'/>
        </div>
        <h1 className='font-extrabold text-xl'> {informacion.categoria}</h1>
        <h2 className='font-normal flex items-center gap-0.5'><FaMapMarkerAlt size={10}/>{informacion.ubicacion}</h2>
        <h3>Hasta <span className='font-extrabold'> {informacion.cantidad_personas}</span> personas</h3>
    </div>
  )
}
