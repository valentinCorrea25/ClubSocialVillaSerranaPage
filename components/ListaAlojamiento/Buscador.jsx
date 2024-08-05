'use client';

import React, { useState } from 'react';
import { InputNumber, Button, Space } from 'antd';

const Buscador = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(12000); // Valor máximo ajustado según tus datos
  const [capacity, setCapacity] = useState(0);

  const handleFilterChange = () => {
    onFilterChange({
      priceRange: [minPrice, maxPrice],
      capacity,
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row', /* Mantiene los elementos en horizontal */
      alignItems: 'center', 
      gap: '16px', 
      padding: '16px', 
      backgroundColor: '#ffffff', 
      borderRadius: '12px', // Bordes redondeados del contenedor
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para efecto de profundidad
      flexWrap: 'wrap', /* Permite que los elementos se envuelvan si no caben en una sola línea */
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px', 
        flex: 1,
        minWidth: '200px', /* Asegura un ancho mínimo para los campos */
      }}>
        <label style={{ fontWeight: 'bold' }}>Rango de Precio:</label>
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          flexWrap: 'wrap', /* Permite que los campos se envuelvan en pantallas pequeñas */
        }}>
          <InputNumber
            min={0}
            max={12000} // Valor máximo ajustado según tus datos
            value={minPrice}
            onChange={(value) => setMinPrice(value)}
            placeholder="Precio mínimo"
            style={{ 
              width: '100%', 
              maxWidth: '120px', 
              borderRadius: '8px', // Bordes redondeados de los campos de entrada
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra ligera para los campos de entrada
            }}
          />
          <span style={{ fontSize: '18px' }}> - </span>
          <InputNumber
            min={0}
            max={12000} // Valor máximo ajustado según tus datos
            value={maxPrice}
            onChange={(value) => setMaxPrice(value)}
            placeholder="Precio máximo"
            style={{ 
              width: '100%', 
              maxWidth: '120px', 
              borderRadius: '8px', // Bordes redondeados de los campos de entrada
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra ligera para los campos de entrada
            }}
          />
        </div>
      </div>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px', 
        flex: 1,
        minWidth: '200px', /* Asegura un ancho mínimo para los campos */
      }}>
        <label style={{ fontWeight: 'bold' }}>Capacidad:</label>
        <InputNumber
          min={0}
          value={capacity}
          onChange={(value) => setCapacity(value)}
          placeholder="Capacidad máxima"
          style={{ 
            width: '100%', 
            maxWidth: '120px', 
            borderRadius: '8px', // Bordes redondeados del campo de entrada
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra ligera para el campo de entrada
          }}
        />
      </div>
      <Button 
        type="primary" 
        onClick={handleFilterChange} 
        style={{ 
          borderRadius: '8px', // Bordes redondeados del botón
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra ligera para el botón
        }}
      >
        Aplicar Filtros
      </Button>

      <style jsx>{`
        @media (max-width: 768px) {
          div {
            flex-direction: column;
            align-items: stretch;
          }

          button {
            align-self: stretch; /* El botón ocupa todo el ancho en pantallas pequeñas */
          }
        }
      `}</style>
    </div>
  );
};

export default Buscador;
