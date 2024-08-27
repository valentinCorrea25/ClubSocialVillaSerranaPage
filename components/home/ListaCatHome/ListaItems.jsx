import React from 'react'
import Item from './Item'
import { Button } from 'antd';
import { Alquileres, NoticiasYEventos, Restaurantes, Actividades, Servicios } from '@/test/data';

export default function ListaItems({ type }) {

  function seleccionarTipo(type) {
    switch (type) {
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
    <div className='flex flex-col gap-8 justify-center items-center'>
      <div className='w-full flex gap-y-4 flex-col md:grid md:grid-cols-3 md:grid-rows-3 md:gap-x-8 md:gap-y-4'>
        {seleccionarTipo(type).map((item, index) => (
          <Item key={index} type={type} informacion={item} />
        ))}
      </div>
      <Button type="primary" >
        Ver más
        {type == 1 ? ' Alquileres' : type == 2 ? ' Restaurantes' : type == 3 ? ' Noticias y Eventos' : type == 4 ? " Actividades" : type == 5 ? ' Servicios' : null}
      </Button>
    </div>
  )
}
