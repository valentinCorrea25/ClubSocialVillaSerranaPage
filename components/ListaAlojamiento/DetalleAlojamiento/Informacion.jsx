import React from 'react';
import { Card } from 'antd';

const Informacion = ({ alojamiento }) => (
  <Card
    title={
      <div style={{ backgroundColor: 'var(--azul)', color: 'var(--blanco)', padding: '16px', borderRadius: '8px', width: '100%' }}>
        <div className="text-2xl font-bold text-center"> {alojamiento.title} </div>
      </div>
    }
    style={{ backgroundColor: '#FFFFFF', borderRadius: '23px', border: '2px solid #ddd' }}
    headStyle={{ padding: 0 }}>

      <p className="text-gray-800 mb-2">{alojamiento.location}</p>
      <p className="text-gray-800 mb-2">Hasta {alojamiento.capacity} personas</p>
  </Card>
);

export default Informacion;
