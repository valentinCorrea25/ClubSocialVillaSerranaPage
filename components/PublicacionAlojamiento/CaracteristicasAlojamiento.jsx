'use client';
import React from 'react';
import { Card, Col, Row } from 'antd';
import { CaracteristicasAloj } from '@/test/data'; 

const CaracteristicasAlojamiento = () => (
  <Card 
    title={<div className="text-2xl font-bold text-gray-800" style={{ color: 'var(--azul)' }}>Características</div>} 
    style={{ backgroundColor: '#FFFFFF', borderRadius: '23px', border: '2px solid #ddd', height: '100%', overflow: 'hidden', }}>

    <Row gutter={[16, 16]} wrap={true}>
      <Col xs={24} sm={12} md={8}>
        <h4 className="font-bold">Comodidades</h4>
        <ul>{CaracteristicasAloj.comodidades.map((item, index) => (
            <li key={index}>{item}</li>))}
        </ul>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <h4 className="font-bold">Servicios Básicos</h4>
        <ul>{CaracteristicasAloj.serviciosBasicos.map((item, index) => ( <li key={index}>{item}</li>))}
        </ul>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <h4 className="font-bold">Adicionales</h4>
        <ul>{CaracteristicasAloj.adicionales.map((item, index) => (<li key={index}>{item}</li>))}
        </ul>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <h4 className="font-bold">Equipamiento</h4>
        <ul>{CaracteristicasAloj.equipamiento.map((item, index) => ( <li key={index}>{item}</li>))}
        </ul>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <h4 className="font-bold">Entretenimiento</h4>
        <ul>{CaracteristicasAloj.entretenimiento.map((item, index) => ( <li key={index}>{item}</li> ))}
        </ul>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <h4 className="font-bold">Exterior</h4>
        <ul>{CaracteristicasAloj.exterior.map((item, index) => ( <li key={index}>{item}</li>))}
        </ul>
      </Col>
    </Row>
  </Card>
);

export default CaracteristicasAlojamiento;
