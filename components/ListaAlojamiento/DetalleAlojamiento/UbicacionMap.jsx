'use client';
import React from 'react';
import { Card, Button } from 'antd';

const UbicacionMap = ({ ubicacion }) => (
  <Card 
    title={
      <div 
        className="text-2xl font-bold text-center" 
        style={{
          backgroundColor: 'var(--verde-oscuro)',
          color: 'var(--blanco)',
          padding: '16px',
          borderRadius: '4px',
          width: '100%',
          margin: 0, 
        }}
      >
        Ubicación
      </div>
    } 
    style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '4px',
      border: '2px solid #ddd',
      height: 'auto',
      overflow: 'hidden',
      padding: 0, 
    }} 
    headStyle={{ padding: 0 }} 
  >
    <div className="relative w-full h-72 overflow-hidden"> 
      <img 
        src="/images/mapa.jpg" 
        alt="Mapa de ubicación" 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex justify-center mt-4">
      <Button type="primary" style={{ borderRadius: '12px' }}>Ver Ubicación</Button>
    </div>
  </Card>
);

export default UbicacionMap;
