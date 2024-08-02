'use client';
import React from 'react';
import { Card, Button } from 'antd';

const UbicacionMap = () => (
  <Card 
    title={<span className="text-2xl font-bold text-gray-800 text-center block" style={{ color: 'var(--azul)' }}>Ubicación</span>} className="bg-white p-4 rounded-lg shadow-md mt-5">
    
    <img src="/images/mapa.jpg" alt="Mapa de ubicación" className="w-full h-auto rounded-lg"/>
    <div className="flex justify-center mt-4">
      <Button type="primary">Ver Ubicación</Button>
    </div>
  </Card>
);

export default UbicacionMap;
