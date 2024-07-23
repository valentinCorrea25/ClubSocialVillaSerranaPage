import React from 'react'
import Item from './Item'
import {Alquileres, NoticiasYEventos, Restaurantes, Actividades, Servicios} from '@/test/data';

export default function ListaItems({type}) {

  function seleccionarTipo(type){
    switch(type){
      case 1:
        return Alquileres;
      case 2:
        return Restaurantes;
      case 3:
        return NoticiasYEventos;
      case 4:
        return Actividades;
      case 5:
        return Servicios
    }
  }


  return (
    <div className='flex justify-center items-center'>
      <div className='grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-4'>
        {seleccionarTipo(type).map((item, index) => (
          <Item key={index} type={type} informacion={item} />
        ))}
      </div>
    </div>
  )
}
