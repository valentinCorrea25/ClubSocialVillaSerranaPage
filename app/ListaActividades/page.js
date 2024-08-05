'use client';

import React from 'react';
import ActividadesList from '@/components/ListaActividades/ActividadesList';
import Banner from '@/components/ListaActividades/Banner';

const ActividadPage = () => {
  const appStyle = { padding: '40px', margin: '0 auto', maxWidth: '1200px',};
  const headerStyle = { textAlign: 'center',marginBottom: '40px', color: '#333', };

  return (
    <div style={appStyle}>
      <Banner title="Actividades" subtitle="Descubre nuestras actividades más recientes" backgroundImage="https://picsum.photos/1200/400"/>
      <ActividadesList />
    </div>
  );
};

export default ActividadPage;
