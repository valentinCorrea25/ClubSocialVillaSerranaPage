'use client';

import React from 'react';
import ActividadesList from '@/components/ListaActividades/ActividadesList';
import Banner from '@/components/ListaActividades/Banner';

const ActividadPage = () => {
  const appStyle = { padding: '40px', margin: '0 auto', width: '100%',};

  return (
    <div style={appStyle} className='flex flex-col justify-center'>
      <Banner title="Actividades" subtitle="Descubre nuestras actividades más recientes" backgroundImage="/images/actividad.jpg"/>
      <ActividadesList />
    </div>
  );
};

export default ActividadPage;