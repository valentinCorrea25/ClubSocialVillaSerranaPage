'use client';
import React from 'react';
import { Card, Button } from 'antd';

const UbicacionMap = () => (
  <Card 
    title={
      <div style={{ backgroundColor: 'var(--azul)', color: 'var(--blanco)', padding: '16px', borderRadius: '8px', width: '100%' }}> <div className="text-2xl font-bold text-center">Ubicación</div> </div>
    } 
    style={{ backgroundColor: '#FFFFFF', borderRadius: '23px', border: '2px solid #ddd', height: 'auto', overflow: 'hidden' }} headStyle={{ padding: 0 }} >
      
    <img src="/images/mapa.jpg" alt="Mapa de ubicación" className="w-full h-72 object-cover rounded-lg" />
    <div className="flex justify-center mt-4"> <Button type="primary">Ver Ubicación</Button></div>
  </Card>
);

export default UbicacionMap;
