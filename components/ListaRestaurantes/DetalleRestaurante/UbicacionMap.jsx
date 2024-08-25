import React from 'react';
import { Card, Button } from 'antd';

const UbicacionMap = ({ ubicacion }) => (
  <Card 
    title={
      <div className="text-2xl font-bold text-center" style={{ backgroundColor: 'var(--azul)', color: 'var(--blanco)', padding: '16px', borderRadius: '8px' }}>
        Ubicación
      </div>
    } 
    style={{ backgroundColor: '#FFFFFF', borderRadius: '23px', border: '2px solid #ddd', height: 'auto', overflow: 'hidden' }} 
    headStyle={{ padding: 0 }}
  >
    <div className="relative w-full h-74 overflow-hidden">
      <img 
        src="/images/mapa.jpg" 
        alt="Mapa de ubicación" 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex justify-center mt-4">
      <Button type="primary">Ver Ubicación</Button>
    </div>
  </Card>
);

export default UbicacionMap;
