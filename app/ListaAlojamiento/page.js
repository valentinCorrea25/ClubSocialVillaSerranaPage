'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Buscador from '@/components/ListaAlojamiento/Buscador';
import ListaAlojamientos from '@/components/ListaAlojamiento/ListaAlojamientos';
import { alojamientos as data } from '@/test/data';
import { Alert } from 'antd';

const ListaAlojamientosPage = () => {
  const [filteredAlojamientos, setFilteredAlojamientos] = useState(data);
  const [noResults, setNoResults] = useState(false);
  const router = useRouter();

  const handleFilterChange = (filters) => {
    const { priceRange, capacity } = filters;
    const filtered = data.filter(alojamiento =>
      alojamiento.price >= priceRange[0] &&
      alojamiento.price <= priceRange[1] &&
      alojamiento.capacity >= capacity
    );

    if (filtered.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

    setFilteredAlojamientos(filtered);
  };

  const handleViewDetails = (id) => {
    router.push(`/ListaAlojamiento/DetalleAlojamiento?id=${id}`);
  };

  return (
    <div style={{ padding: '100px 20px', backgroundColor: '#f9f6ee', minHeight: '100vh', maxWidth: '1200px', 
    margin: '0 auto',}}>
      <div style={{ padding: '40px', borderBottom: '1px solid #ddd', marginBottom: '64px', borderRadius: '4px', backgroundColor: '#fff', }}>
        <Buscador onFilterChange={handleFilterChange} /></div> {noResults ? (
        <div style={{ padding: '40px', borderRadius: '4px', backgroundColor: '#fff' }}>
          
        <Alert message="No se encontraron resultados" description="No hay alojamientos que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda." type="warning" showIcon />
        </div>
      ) : (
        <ListaAlojamientos alojamientos={filteredAlojamientos} onViewDetails={handleViewDetails} />
      )}
    </div>
  );
};

export default ListaAlojamientosPage;
