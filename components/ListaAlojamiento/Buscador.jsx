'use client';

import React, { useState } from 'react';
import { InputNumber, Button, Space } from 'antd';

const Buscador = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(40000); 
  const [capacity, setCapacity] = useState(0);

  const handleFilterChange = () => {
    onFilterChange({
      priceRange: [minPrice, maxPrice],
      capacity,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', padding: '16px', 
      backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
      flexWrap: 'wrap', }}>
      
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
        <label style={{ fontWeight: 'bold' }}>Rango de Precio:</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <InputNumber 
            min={0} 
            max={40000} 
            value={minPrice} 
            onChange={(value) => setMinPrice(value)} 
            placeholder="Precio mínimo" 
            style={{ width: '120px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }} 
          />
          <span style={{ fontSize: '18px' }}> - </span>
          <InputNumber 
            min={0} 
            max={40000} 
            value={maxPrice} 
            onChange={(value) => setMaxPrice(value)} 
            placeholder="Precio máximo" 
            style={{ width: '120px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
        <label style={{ fontWeight: 'bold' }}>Capacidad:</label>
        <InputNumber 
          min={0} 
          value={capacity} 
          onChange={(value) => setCapacity(value)} 
          placeholder="Capacidad máxima" 
          style={{ width: '120px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }} 
        />
      </div>

      <Button 
        type="primary" 
        onClick={handleFilterChange} 
        style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }}>
        Aplicar Filtros
      </Button>

      <style jsx>{`
        @media (max-width: 768px) {
          div {
            flex-direction: column;
            align-items: stretch;
          }
          button {
            align-self: stretch; 
          }
        }
      `}</style>
    </div>
  );
};

export default Buscador;
