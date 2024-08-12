'use client';

import React from 'react';
import EventosList from '@/components/ListaNoticiasEventos/EventosList';
import Banner from '@/components/ListaNoticiasEventos/Banner';

const EventosPage = () => {
  const appStyle = { padding: '40px', margin: '0 auto', maxWidth: '1200px' };
  const headerStyle = { textAlign: 'center', marginBottom: '40px', color: '#333' };

  return (
    <div style={appStyle}>
      <Banner
        title="Eventos y Noticias"
        subtitle="Descubre nuestros últimos eventos y noticias"
        backgroundImage="/images/eventos.jpg" 
      />
      <EventosList />
    </div>
  );
};

export default EventosPage;
