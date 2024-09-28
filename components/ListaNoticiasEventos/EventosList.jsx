'use client';

import React from 'react';
import EventoCard from './EventoCard';
import { ListaEventos } from '@/test/data'; 

const EventosList = ({noticiasEventos}) => {
  // if (!eventos) {
  //   return (
  //     <div style={{ padding: "24px" }}>
  //       <Alert
  //         message="No se encontraron resultados"
  //         description="No hay alojamientos que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda."
  //         type="warning"
  //         showIcon
  //       />
  //     </div>
  //   );
  // }
  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {noticiasEventos.map((evento, index) => (
          <EventoCard key={index} evento={evento} />
        ))}
      </div>
    </div>
  );
};

export default EventosList;


