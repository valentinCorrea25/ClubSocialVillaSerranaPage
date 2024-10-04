import React from 'react';
import { Card } from 'antd';
import { EnvironmentOutlined, FileTextOutlined, TagOutlined } from '@ant-design/icons';

const Informacion = ({ restaurante }) => (
  <Card
    title={
      <div style={{ backgroundColor: 'var(--verde-oscuro)', color: 'var(--blanco)', padding: '16px', borderRadius: '4px', width: '100%' }}>
        <div className="text-2xl font-bold text-center">{restaurante?.titulo || 'Título no disponible'}</div>
      </div>
    }
    style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', border: '2px solid #ddd' }}
    headStyle={{ padding: 0 }}
  >
    <p className="text-gray-800 mb-2">
      <EnvironmentOutlined style={{ marginRight: 8 }} />
      {restaurante?.ubicacion || 'Ubicación no disponible'}
    </p>
    <p className="text-gray-800 mb-2">
      <FileTextOutlined style={{ marginRight: 8 }} />
      {restaurante?.descripcion || 'Categoría no disponible'}
    </p>
  </Card>
);

export default Informacion;
