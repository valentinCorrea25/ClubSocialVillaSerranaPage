/* 'use client';

import React from 'react';
import { Card, List, Button, Alert } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined, InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ListaRestaurantes = ({ restaurantes, onViewDetails }) => {
  if (restaurantes.length === 0) {
    return (
      <div style={{ padding: '24px' }}>
        <Alert
          message="No se encontraron resultados"
          description="No hay restaurantes que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda."
          type="warning"
          showIcon
        />
      </div>
    );
  }
  console.log(restaurantes[0].fotos[0]);


  return (
    <List
      itemLayout="horizontal"
      dataSource={restaurantes}
      renderItem={(restaurante) => (
        <List.Item>
          <Card
            onClick={() => onViewDetails(restaurante.id_Restaurant)}
            hoverable
            className='flex justify-center sm:justify-start flex-col items-center md:flex-row md:flex-nowrap'
            style={{
              width: '100%',
              padding: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '4px',
              backgroundColor: '#fff',
              position: 'relative',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              flexWrap: 'wrap',
            }}
            cover={
              restaurante.fotos ? (
                <img
                  alt={restaurante.titulo || 'Imagen del restaurante'}
                  src={restaurante.fotos[0]}
                  style={{
                    width: '100%',
                    maxWidth: 300,
                    height: 200,
                    objectFit: 'cover',
                    marginRight: '16px',
                    marginBottom: '16px',
                    flexShrink: 0,
                  }}
                />
              ) : null
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ flex: 1, marginBottom: '16px' }}>
              <Meta
                title={restaurante.titulo || 'Título no disponible'}
                description={
                  <>
                    <div><EnvironmentOutlined /> {restaurante.ubicacion_calles || 'Ubicación no disponible'}</div>
                    <div><InfoCircleOutlined /> Descripción: {restaurante.descripcion || 'No disponible'}</div>
                    <div><ClockCircleOutlined /> Horarios: {restaurante.horario_semanal || 'No disponible'}</div>
                    <div><PhoneOutlined /> Contacto: {restaurante.celular || 'No disponible'}</div>
                  </>
                }
              />
            </div>
            <div
              className='flex sm:justify-start justify-center mt-auto'
            >
              <Button type="primary" onClick={() => onViewDetails(restaurante.id_Restaurant)}>
                Ver Detalles
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ListaRestaurantes; */


'use client';

import React from 'react';
import RestauranteCard from './RestauranteCard';
import { Alert, Pagination, Button } from 'antd';

const ListaRestaurante = ({ restaurantes, onViewDetails }) => {
  if (!restaurantes || restaurantes.length === 0) {
    return (
      <div className="p-6">
        <Alert
          message="No se encontraron resultados"
          description="No hay alojamientos que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda."
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-1 sm:p-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {restaurantes.map((restaurante, index) => (
          <RestauranteCard key={index} restaurante={restaurante} />

        ))}
      </div>
    </div>
  );
};

export default ListaRestaurante;

