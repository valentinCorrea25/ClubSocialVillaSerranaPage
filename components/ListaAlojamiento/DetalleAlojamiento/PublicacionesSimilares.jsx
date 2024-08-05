'use client';
import React from 'react';
import { Card, List, Button } from 'antd';
import { alojamientos } from '@/test/data'; 
import { EnvironmentOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const PublicacionesSimilares = ({ onSelect }) => {
  const router = useRouter();

  const handleViewMore = () => {
    router.push('/ListaAlojamiento');
  };

  return (
    <Card
      title={ <div style={{ backgroundColor: 'var(--azul)', color: 'var(--blanco)', padding: '16px', borderRadius: '8px', width: '100%' }}>
      <div className="text-2xl font-bold text-center">Publicaciones Similares</div> </div> }

      style={{ backgroundColor: '#FFFFFF', borderRadius: '23px', border: '2px solid #ddd', height: '100%' }}
      headStyle={{ padding: 0 }} >

      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '500px', padding: '16px' }}>
        <List itemLayout="vertical" dataSource={alojamientos} renderItem={item => (
            <List.Item key={item.id} style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }} onClick={() => onSelect(item)} >

      <div style={{ textAlign: 'center' }}>
          <img src={item.images[0].url} alt={item.images[0].alt} style={{ width: '100%', borderRadius: '12px', marginBottom: '8px' }} />

      <div style={{ textAlign: 'left' }}>
         <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{item.categoria}</div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <EnvironmentOutlined style={{ marginRight: '8px' }} /> {item.location}</div>
                <div>Hasta {item.capacity} personas</div>
              </div>
            </div>
     </List.Item>
          )} />
      </div>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Button type="primary" onClick={handleViewMore} style={{ borderRadius: '12px' }}>Ver Más</Button>
        </div>
    </Card>
  );
};

export default PublicacionesSimilares;
