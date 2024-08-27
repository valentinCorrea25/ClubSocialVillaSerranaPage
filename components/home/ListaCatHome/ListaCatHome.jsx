'use client'
import React from 'react';
import { Tabs } from 'antd';
import { FaHouse } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { FaRegFutbol } from "react-icons/fa";
import { FaPeopleCarry } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import ListaItems from './ListaItems';



const items = [
    {
      key: '1',
      label:(<div className='flex items-center gap-2 font-extrabold'><FaHouse/> Alojamientos</div>),
      children: (<ListaItems type={1}/>),
    },
    {
      key: '2',
      label:(<div className='flex items-center gap-2 font-extrabold'><GiKnifeFork/> Restaurantes </div>),
      children: (<ListaItems type={2}/>),
    },
    {
      key: '3',
      label:(<div className='flex items-center gap-2 font-extrabold'><FaRegNewspaper/> Noticias y Eventos </div>),
      children: (<ListaItems type={3}/>),
    },
    {
      key: '4',
      label:(<div className='flex items-center gap-2 font-extrabold'><FaRegFutbol/> Actividades</div>),
      children: (<ListaItems type={4}/>),
    },
    {
      key: '5',
      label:(<div className='flex items-center gap-2 font-extrabold'><FaPeopleCarry/> Servicios</div>),
      children: (<ListaItems type={5}/>),
    },
  ];

export default function ListaCatHome() {
  return (
    <div>
        <h1 className='text-[--azul] font-bold text-center md:text-5xl text-2xl'>Información Turistica Villa Serrana</h1>
        <h2 className='text-[--verde-oscuro] font-bold text-center md:text-xl text-sm'>Encuentra las mejores opciones para disfrutar en Villa Serrana.</h2>
        <div>
            
        </div>
        
    <Tabs defaultActiveKey="1" items={items} itemselectedcolor='#09A603' size='large'/>
    </div>
  )
}





