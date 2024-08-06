'use client';

import React from 'react';
import ActividadCard from './ActividadCard';
import { ListaActividades } from '@/test/data';

const ActividadesList = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}> 
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {ListaActividades.map((actividad) => (
        <ActividadCard key={actividad.id} actividad={actividad} /> ))}
      </div>
    </div>
  );
};

export default ActividadesList;
