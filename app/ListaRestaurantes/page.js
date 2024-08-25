'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import Buscador from '@/components/ListaRestaurantes/Buscador';
import ListaRestaurantes from '@/components/ListaRestaurantes/ListaRestaurantes';
import Banner from '@/components/ListaRestaurantes/Banner'; 
import { restaurantesData as data } from '@/test/data';
import { Layout, Alert } from 'antd';

const { Content } = Layout;

const ListaRestaurantesPage = () => {
  const [filteredRestaurantes, setFilteredRestaurantes] = useState(data);
  const [allRestaurantes] = useState(data); 
  const [noResults, setNoResults] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(allRestaurantes.map(restaurante => restaurante.categoria.nombre_categoria)));
    setCategories(uniqueCategories);
  }, [allRestaurantes]);

  const handleFilterChange = (category) => {
    const filtered = category
      ? allRestaurantes.filter(restaurante => restaurante.categoria.nombre_categoria === category)
      : allRestaurantes;

    if (filtered.length === 0 && category) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

    setFilteredRestaurantes(filtered);
  };

  const handleViewDetails = (id) => {
    router.push(`/ListaRestaurantes/DetalleRestaurante?id=${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F6EE] px-8 sm:px-12 lg:px-20 py-24">
      <div className="mb-10">
        <Banner 
          title="Restaurantes" 
          subtitle="Descubre nuestras opciones" 
          backgroundImage="/images/restaurantes.jpg" 
        />
      </div>
      <Content style={{ 
        padding: '32px 64px', 
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '32px' 
        }}>
          <Buscador 
            categories={categories}
            onFilterChange={handleFilterChange} 
          />
        </div>
        <div style={{ 
          width: '100%',
          maxWidth: '1200px', 
          margin: '0 auto', 
          backgroundColor: 'transparent' 
        }}>
          {noResults ? (
            <div style={{ 
              padding: '24px', 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <Alert
                message="No se encontraron resultados"
                description="No hay restaurantes que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda."
                type="warning"
                showIcon
              />
            </div>
          ) : (
            <ListaRestaurantes restaurantes={filteredRestaurantes} onViewDetails={handleViewDetails} />
          )}
        </div>
      </Content>
    </div>
  );
};

export default ListaRestaurantesPage;
