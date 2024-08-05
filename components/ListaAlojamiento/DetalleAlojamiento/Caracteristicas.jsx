'use client';
import React from 'react';
import { Card, Col, Row } from 'antd';

const CaracteristicasAlojamiento = ({ caracteristicas = {} }) => {
  const {
    comodidades = [],
    serviciosBasicos = [],
    adicionales = [],
    equipamiento = [],
    entretenimiento = [],
    exterior = []
  } = caracteristicas;

  return (
    <Card
      title={
        <div style={{ backgroundColor: 'var(--azul)', color: 'var(--blanco)', padding: '16px', borderRadius: '8px', width: '100%' }}>
          <div className="text-2xl font-bold text-center">Características</div>
        </div>
      }
      style={{ backgroundColor: '#FFFFFF', borderRadius: '23px', border: '2px solid #ddd', height: '100%', overflow: 'hidden' }}
      headStyle={{ padding: 0 }} // Aseguramos que no haya padding en el encabezado
    >
      <Row gutter={[16, 16]} wrap={true}>
        <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Comodidades</h4>
          <ul>
            {comodidades.length > 0 ? comodidades.map((item, index) => (
              <li key={index}>{item}</li>
            )) : <li>No disponible</li>}
          </ul>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Servicios Básicos</h4>
          <ul>
            {serviciosBasicos.length > 0 ? serviciosBasicos.map((item, index) => (
              <li key={index}>{item}</li>
            )) : <li>No disponible</li>}
          </ul>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Adicionales</h4>
          <ul>
            {adicionales.length > 0 ? adicionales.map((item, index) => (
              <li key={index}>{item}</li>
            )) : <li>No disponible</li>}
          </ul>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Equipamiento</h4>
          <ul>
            {equipamiento.length > 0 ? equipamiento.map((item, index) => (
              <li key={index}>{item}</li>
            )) : <li>No disponible</li>}
          </ul>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Entretenimiento</h4>
          <ul>
            {entretenimiento.length > 0 ? entretenimiento.map((item, index) => (
              <li key={index}>{item}</li>
            )) : <li>No disponible</li>}
          </ul>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Exterior</h4>
          <ul>
            {exterior.length > 0 ? exterior.map((item, index) => (
              <li key={index}>{item}</li>
            )) : <li>No disponible</li>}
          </ul>
        </Col>
      </Row>
    </Card>
  );
};

export default CaracteristicasAlojamiento;
