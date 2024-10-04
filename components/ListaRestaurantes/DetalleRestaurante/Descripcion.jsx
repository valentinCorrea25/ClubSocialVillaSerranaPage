import React from 'react';
import { Card } from 'antd';

const Descripcion = ({ restaurante }) => (
  <Card
    title={
      <div style={{ backgroundColor: 'var(--verde-oscuro)', color: 'var(--blanco)', padding: '16px', borderRadius: '4px', width: '100%' }}>
        <div className="text-2xl font-bold text-center">Descripción</div>
      </div>
    }
    style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', border: '2px solid #ddd' }}
    headStyle={{ padding: 0 }}
  >
    <p className="text-gray-600">{restaurante.descripcion || 'Descripción no disponible'}</p>
  </Card>
);

export default Descripcion;
