'use client';

import React from 'react';
import { Card, Tag } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, TagOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ActividadCard = ({ actividad }) => {
  const {titulo, contenido,foto,fechaPublicacion,categoria,ubicacion,horario,diaSemana,} = actividad;

  return (
    <Card hoverable cover={<img alt={titulo} src={foto} style={{ height: '200px', objectFit: 'cover' }} />}
      style={{ width: '100%', maxWidth: '700px', margin: '0 auto', marginBottom: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px', }}>
      
      <Meta title={<div style={{ fontSize: '20px', fontWeight: 'bold' }}>{titulo}</div>}
        description={
          <><div style={{ color: '#0367A6' }}> 
              <CalendarOutlined /> {new Date(fechaPublicacion).toLocaleDateString()}
              <TagOutlined style={{ marginLeft: '8px' }} /> {categoria}
              <EnvironmentOutlined style={{ marginLeft: '8px' }} /> {ubicacion}
            </div>
            <div style={{ marginTop: '8px' }}>
              {diaSemana.map((dia, index) => (
              <Tag key={index} style={{ marginRight: '4px' }}>{dia}</Tag> ))}
              <span>{horario}</span>
            </div>
            <p style={{ marginTop: '16px', height: 'auto', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contenido}</p>
          </>
        }
      />
    </Card>
  );
};

export default ActividadCard;
