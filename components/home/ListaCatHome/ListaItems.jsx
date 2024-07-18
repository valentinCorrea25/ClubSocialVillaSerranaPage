import React from 'react'
import Item from './Item'

export default function ListaItems() {

  const ItemsDeBD = [
    {
      categoria: 'Alquiler',
      ubicacion: 'Villa Serrana',
      cantidad_personas: 3,
      foto:'https://picsum.photos/id/239/220/110'
    },
    {
      categoria: 'Alquiler',
      ubicacion: 'Montevideo Centro',
      cantidad_personas: 2,
      foto:'https://picsum.photos/id/232/220/110'
    },
    {
      categoria: 'Alquiler',
      ubicacion: 'Punta del Este',
      cantidad_personas: 5,
      foto:'https://picsum.photos/id/231/220/110'
    },
    {
      categoria: 'Alquiler',
      ubicacion: 'Colonia del Sacramento',
      cantidad_personas: 4,
      foto:'https://picsum.photos/id/236/220/110'
    },
    {
      categoria: 'Alquiler',
      ubicacion: 'Piriápolis',
      cantidad_personas: 6,
      foto:'https://picsum.photos/id/223/220/110'
    },
    {
      categoria: 'Alquiler',
      ubicacion: 'La Paloma',
      cantidad_personas: 3,
      foto:'https://picsum.photos/id/123/220/110'
    },
    {
      categoria: 'Alquiler',
      ubicacion: 'Cabo Polonio',
      cantidad_personas: 1,
      foto:'https://picsum.photos/id/124/220/110'
    },
    {
      categoria: 'Alquiler',
      ubicacion: 'Maldonado',
      cantidad_personas: 2,
      foto:'https://picsum.photos/id/162/220/110'
    },
    {
      categoria: 'Alquiler',
      ubicacion: 'Atlantida',
      cantidad_personas: 4,
      foto:'https://picsum.photos/id/126/220/110'
    },
  ]


  return (
    <div className='flex justify-center items-center'>
      <div className='grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-4'>
        {ItemsDeBD.map((item, index) => (
          <Item key={index} informacion={item} />
        ))}
      </div>
    </div>
  )
}
