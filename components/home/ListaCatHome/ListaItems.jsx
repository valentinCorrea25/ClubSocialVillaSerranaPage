import React from 'react'
import Item from './Item'
import {ItemsDeBD} from '@/test/data';

export default function ListaItems() {

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
