'use client';

import React, { useState } from 'react';
import { Layout } from 'antd';
import ServiciosList from '@/components/ListaServicios/ServiciosList';
import Buscador from '@/components/ListaServicios/Buscador';
import Banner from '@/components/ListaServicios/Banner'; 
import { serviciosData } from '@/test/data';

const { Content } = Layout;

const ServiciosPage = () => {
  const [filteredServicios, setFilteredServicios] = useState(serviciosData);

  const handleFilterChange = (selectedCategory) => {
    if (selectedCategory === '') {
      // Mostrar todos los servicios
      setFilteredServicios(serviciosData);
    } else {
      // Filtrar por categoría
      const filtered = serviciosData.filter(servicio => servicio.titulo_Servicio === selectedCategory);
      setFilteredServicios(filtered);
    }
  };

  // Extraer categorías únicas para el selector
  const categories = Array.from(new Set(serviciosData.map(s => s.titulo_Servicio)));

  return (
    <Layout>
      <Content style={{ padding: '40px 24px' }}> 
        <Banner 
          title="¡Bienvenido a Nuestros Servicios!" 
          subtitle="Descubre nuestras ofertas y encuentra lo que necesitas." 
          backgroundImage="/images/servicios.jpg"    
        />
        <div style={{ padding: '24px' }}> 
          <Buscador 
            categories={categories} 
            onFilterChange={handleFilterChange} 
          />
        </div>
        <div style={{ padding: '24px' }}> 
          <ServiciosList servicios={filteredServicios} />
        </div>
      </Content>
    </Layout>
  );
};

export default ServiciosPage;
