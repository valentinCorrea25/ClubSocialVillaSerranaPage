'use client';

import React from 'react';
import { Card, Tag } from 'antd';
import { CalendarOutlined, TagOutlined } from '@ant-design/icons';

const { Meta } = Card;

const EventoCard = ({ evento }) => {
  const { titulo, contenido, foto, fecha_publicacion, fecha_evento, categoria } = evento;

  return (
    <Card hoverable cover={
        <div style = {{ height: '400px', overflow: 'hidden', borderRadius: '12px', position: 'relative' }}
        >
          <img alt = {titulo} src={foto} style={{ width: '100%', height: '100%', objectFit: 'cover' ,borderRadius: '12px' }} />
        </div>
      }
      style = {{ width: '100%', maxWidth: '700px', margin: '0 auto', marginBottom: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px' }}
    >
      <Meta
        title={<div style={{ fontSize: '20px', fontWeight: 'bold' }}>{titulo}</div>}
        description={
          <>
            <div style={{ color: '#0367A6' }}>
              <CalendarOutlined /> {new Date(fecha_publicacion).toLocaleDateString()}
              <TagOutlined style={{ marginLeft: '8px' }} /> {categoria?.nombre_categoria || 'Categoría no disponible'}
              <div style={{ marginTop: '8px' }}>
                <span>Fecha del Evento: {new Date(fecha_evento).toLocaleDateString()}</span>
              </div>
            </div>
            <p style={{ marginTop: '16px', height: 'auto', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contenido}</p>
          </>
        }
      />
    </Card>
  );
};

export default EventoCard;
