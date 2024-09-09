'use client';

import React from 'react';
import ActividadCard from './ActividadCard';
import { ListaActividades } from '@/test/data';
import { Pagination } from 'antd';

const ActividadesList = ({ actividades }) => {
  if (!actividades) {
    return (
      <div style={{ padding: "24px" }}>
        <Alert
          message="No se encontraron resultados"
          description="No hay alojamientos que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda."
          type="warning"
          showIcon
        />
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        
        {actividades.map((actividad, index) => (
          <ActividadCard key={index} actividad={actividad} />
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
};

export default ActividadesList;
