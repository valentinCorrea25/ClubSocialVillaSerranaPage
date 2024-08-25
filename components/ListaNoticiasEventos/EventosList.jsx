'use client';

import React from 'react';
import EventoCard from './EventoCard';
import { ListaEventos } from '@/test/data'; 

const EventosList = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {ListaEventos.map((evento) => (
          <EventoCard key={evento.id_Publicacion} evento={evento} />
        ))}
      </div>
    </div>
  );
};

export default EventosList;
