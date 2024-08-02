'use client';
import React from 'react';
import { DescripcionAloj } from '@/test/data';

const Descripcion = () => (
    <div className="bg-white p-7 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800" style={{ color: 'var(--azul)' }}>Descripción</h2>
        <p className="mt-2 text-gray-600">{DescripcionAloj.text}</p>
    </div>
);

export default Descripcion;
