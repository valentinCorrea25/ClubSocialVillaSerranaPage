'use client'
import React from 'react';
import { Tabs } from 'antd';
import { FaHouse } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { FaRegFutbol } from "react-icons/fa";
import { FaPeopleCarry } from "react-icons/fa";
import ListaItems from './ListaItems';



const items = [
    {
      key: '1',
      label:(<div className='flex items-center gap-2 font-extrabold'><FaHouse/> Alojamientos</div>),
      children: (<ListaItems/>),
    },
    {
      key: '2',
      label:(<div className='flex items-center gap-2 font-extrabold'><FaRegNewspaper/> Noticias y Eventos </div>),
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label:(<div className='flex items-center gap-2 font-extrabold'><FaRegFutbol/> Actividades</div>),
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label:(<div className='flex items-center gap-2 font-extrabold'><FaPeopleCarry/> Servicios</div>),
      children: 'Content of Tab Pane 3',
    },
  ];

export default function ListaCatHome() {
  return (
    <div>
        <h1 className='text-[--azul] font-bold text-center'>Información Turistica Villa Serrana</h1>
        <h2 className='text-[--verde-oscuro] font-bold text-center text-xl'>Encuentra las mejores opciones para disfrutar en Villa Serrana.</h2>
        <div className=''>
            <Tabs centered defaultActiveKey="1" items={items} itemselectedcolor='#09A603' />
        </div>
    </div>
  )
}





