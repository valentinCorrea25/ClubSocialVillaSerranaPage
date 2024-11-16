'use client';

import React from 'react';
import AlojamientoCard from './AlojamientoCard';
import { Alert, Pagination, Button } from 'antd';

const ListaAlojamientos = ({ alojamientos, onViewDetails  }) => {
  if (!alojamientos || alojamientos.length === 0) {
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
        {alojamientos.map((alojamiento, index) => (
          <AlojamientoCard key={index} alojamiento={alojamiento} />
          
        ))}
      </div>
    </div>
  );
};

export default ListaAlojamientos;

