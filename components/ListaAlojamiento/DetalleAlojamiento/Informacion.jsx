import React from 'react';
import { Card } from 'antd';

const Informacion = ({ alojamiento }) => (
  <Card
    style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '4px',
      border: '2px solid #ddd',
    }}
    bodyStyle={{ padding: '16px' }}
  >
    <div
      style={{
        backgroundColor: 'var(--verde-oscuro)',
        color: 'var(--blanco)',
        padding: '16px',
        margin: '-16px -16px 16px -16px',
        borderRadius: '8px 8px 0 0',
        width: 'calc(100% + 32px)' 
      }}
    >
      <div className="text-2xl font-bold text-center">
        {alojamiento.titulo}
      </div>
    </div>

    <div className="p-7">
      <p className="text-gray-800 mb-2">{alojamiento.ubicacion}</p>
      <p className="text-gray-800 mb-2">Hasta {alojamiento.capacidad} personas</p>
    </div>
  </Card>
);

export default Informacion;
