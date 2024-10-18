'use client';

import React from 'react';
import ActividadCard from './ActividadCard';
import { Alert, Pagination, Button } from 'antd';

const ActividadesList = ({ actividades, onViewDetails  }) => {
  if (!actividades || actividades.length === 0) {
    return (
      <div className="p-6">
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
    <div className="max-w-7xl mx-auto p-1 sm:p-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {actividades.map((actividad, index) => (
          <ActividadCard key={index} actividad={actividad} />
          
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Pagination defaultCurrent={1} total={10} />
      </div>
    </div>
  );
};

export default ActividadesList;
