'use client';
import React from 'react';
import { Card, List, Button } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const PublicacionesSimilares = ({ similares }) => {
  const router = useRouter();

  const handleViewMore = () => {
    router.push('/ListaAlojamiento');
  };

  const handleViewDetails = (id) => {
    router.push(`/ListaAlojamiento/DetalleAlojamiento?id=${id}`);
  };

  return (
    <Card
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '4px',
        border: '2px solid #ddd',
        height: '100%',
      }}
      bodyStyle={{ padding: '16px' }}
    >
      <div
        style={{
          backgroundColor: 'var(--verde-oscuro)',
          color: 'var(--blanco)',
          padding: '16px',
          margin: '-16px -16px 16px -16px', 
          borderRadius: '8px 8px 0 0', 
          width: 'calc(100% + 32px)' 
        }}
      >
        <div className="text-2xl font-bold text-center">Publicaciones Similares</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '500px', padding: '16px' }}>
        <List
          itemLayout="vertical"
          dataSource={similares}
          renderItem={item => (
            <List.Item
              key={item.id_Alquiler}
              style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
              onClick={() => handleViewDetails(item.id_Alquiler)}
            >
              <div style={{ textAlign: 'center' }}>
                <img
                  src={item.fotos[0]}
                  alt={item.fotos[0].titulo}
                  style={{ width: '100%', borderRadius: '12px', marginBottom: '8px' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                    <EnvironmentOutlined style={{ marginRight: '8px' }} />
                    {item.ubicacion}
                  </div>
                  <div>Hasta {item.capacidad} personas</div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Button type="primary" onClick={handleViewMore} style={{ borderRadius: '12px' }}>
          Ver Más
        </Button>
      </div>
    </Card>
  );
};

export default PublicacionesSimilares;
