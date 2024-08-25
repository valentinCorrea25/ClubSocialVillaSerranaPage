import React from 'react';
import { Card } from 'antd';

const Descriptions = ({ alojamiento }) => (
  <Card
    style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '23px',
      border: '2px solid #ddd',
    }}
    bodyStyle={{ padding: '16px' }}
  >
    <div
      style={{
        backgroundColor: 'var(--azul)',
        color: 'var(--blanco)',
        padding: '16px',
        margin: '-16px -16px 16px -16px', 
        borderRadius: '8px 8px 0 0', 
        width: 'calc(100% + 32px)' 
      }}
    >
      <div className="text-2xl font-bold text-center">Descripción</div>
    </div>

    <div className="p-7">
      {alojamiento.price && (
        <div className="mb-2 text-gray-800">
          <strong>Precio:</strong> ${alojamiento.price}
        </div>
      )}
      {alojamiento.disponibilidad && (
        <div className="mb-2 text-gray-800">
          <strong>Disponibilidad:</strong> {alojamiento.disponibilidad}
        </div>
      )}
      <p className="text-gray-600">
        {alojamiento.description || 'Descripción no disponible'}
      </p>
    </div>
  </Card>
);

export default Descriptions;
