'use client';
import React from 'react';
import { InfoAloj } from '@/test/data';

const InfoAlojamiento = () => (
  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
    <h1 style={{ color: 'black', fontWeight: 'bold', fontSize: '24px' }}>{InfoAloj.title}</h1>
    <p style={{ color: 'black', fontWeight: 'bold', margin: '10px 0' }}>{InfoAloj.location}</p>
    <p style={{ color: 'black', margin: '10px 0' }}>Hasta {InfoAloj.capacity} personas</p>  
  </div>
);

export default InfoAlojamiento;
