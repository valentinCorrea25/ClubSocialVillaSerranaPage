'use client';

import React from 'react';
import { Card, List, Button, Alert } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined, InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons';
import { ClockCircleOutlined, EnvironmentOutlined, InfoCircleOutlined, PhoneOutlined } from '@ant-design/icons';

const { Meta } = Card;

const truncateText = (text, maxLength) => {
  if (text && text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

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
            className='flex justify-center sm:justify-start flex-col items-center md:flex-row md:flex-nowrap'
            style={{
              width: '100%',
              padding: '12px',
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
            <div className='flex flex-wrap sm:max-w-56 md:max-w-72 lg:max-w-[40em] mb-6'>
              <Meta
                title={restaurante.titulo || 'Título no disponible'}
                description={
                  <>
                    <div><EnvironmentOutlined /> {restaurante.ubicacion || 'Ubicación no disponible'}</div>
                    <div className='relative flex flex-wrap'><InfoCircleOutlined /> Descripción: {truncateText(restaurante.descripcion || 'No disponible', 80)}</div>
                    <div><ClockCircleOutlined /> Horarios: {restaurante.horario_semanal || 'No disponible'}</div>
                    <div><PhoneOutlined /> Contacto: {restaurante.celular || 'No disponible'}</div>
                    <div><PhoneOutlined /> Contacto: {restaurante.celular || 'No disponible'}</div>
                  </>
                }
              />
            </div>
            <div
              className='flex sm:justify-start justify-center mt-auto'
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

export default ListaRestaurantes;
