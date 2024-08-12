'use client';

import React from 'react';
import { Card, List, Tag, Button, Alert } from 'antd';
import { EnvironmentOutlined, UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ListaAlojamientos = ({ alojamientos, onViewDetails }) => {
  if (alojamientos.length === 0) {
    return (
      <div style={{ padding: '24px' }}>
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
    <List
      itemLayout="horizontal"
      dataSource={alojamientos}
      renderItem={(alojamiento) => (
        <List.Item>
          <Card
            hoverable
            style={{
              width: '100%',
              padding: '16px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              backgroundColor: '#ffffff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            cover={
              alojamiento.images && alojamiento.images.length > 0 ? (
                <img
                  alt={alojamiento.title || 'Imagen del alojamiento'}
                  src={alojamiento.images[0]?.url || 'https://via.placeholder.com/600x400'}
                  style={{
                    width: 300,
                    height: 200,
                    objectFit: 'cover',
                    marginRight: 16,
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
            <div style={{ flex: 1 }}>
              <Meta
                title={alojamiento.title || 'Título no disponible'}
                description={
                  <>
                    <div><EnvironmentOutlined /> {alojamiento.location || 'Ubicación no disponible'}</div>
                    <div><UserOutlined /> Capacidad: {alojamiento.capacity || 'No especificado'}</div>
                    <div>Disponibilidad: {alojamiento.disponibilidad || 'No especificada'}</div>
                    <div>Precio: {alojamiento.price !== undefined ? `$${alojamiento.price}` : 'No especificado'}</div>
                    <div>Descripción: {alojamiento.description || 'No disponible'}</div>
                    <div>
                      {alojamiento.caracteristicas?.comodidades?.length > 0 ? (
                        alojamiento.caracteristicas.comodidades.map((comodidad, index) => (
                          <Tag key={index}>{comodidad}</Tag>
                        ))
                      ) : (
                        'No hay comodidades disponibles'
                      )}
                    </div>
                  </>
                }
              />
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-start' }}>
              <Button type="primary" onClick={() => onViewDetails(alojamiento.id)} style={{ marginTop: '16px' }}>
                Ver Detalles
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ListaAlojamientos;
