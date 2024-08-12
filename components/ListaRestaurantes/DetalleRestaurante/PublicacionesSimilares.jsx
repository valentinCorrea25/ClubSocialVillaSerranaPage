import React from 'react';
import { Card, List, Button } from 'antd';
import { restaurantesData } from '@/test/data'; 
import { TagOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const PublicacionesSimilares = ({ onSelect }) => {
  const router = useRouter();

  const handleViewMore = () => {
    router.push('/ListaRestaurantes');
  };

  return (
    <Card
      title={
        <div style={{ backgroundColor: 'var(--azul)', color: 'var(--blanco)', padding: '16px', borderRadius: '8px', width: '100%' }}>
          <div className="text-2xl font-bold text-center">Publicaciones Similares</div>
        </div>
      }
      style={{ backgroundColor: '#FFFFFF', borderRadius: '23px', border: '2px solid #ddd', height: '100%' }}
      headStyle={{ padding: 0 }}
    >
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '500px', padding: '16px' }}>
        <List
          itemLayout="vertical"
          dataSource={restaurantesData.filter(restaurante => restaurante.id_Restaurante !== onSelect.id_Restaurante)} 
          renderItem={item => (
            <List.Item
              key={item.id_Restaurante}
              style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
              onClick={() => onSelect(item)} 
            >
              <div style={{ textAlign: 'center' }}>
                <img
                  src={item.foto}
                  alt={item.Titulo}
                  style={{ width: '100%', borderRadius: '12px', marginBottom: '8px' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {item.Titulo}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                    <TagOutlined style={{ marginRight: '8px' }} />
                    {item.categoria?.nombre_categoria || 'Categoría no disponible'}
                  </div>
                  <p style={{ marginTop: '4px', color: '#666' }}>
                    {item.descripcion || 'Descripción no disponible'}
                  </p>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Button type="primary" onClick={handleViewMore} style={{ borderRadius: '12px' }}>Ver Más</Button>
      </div>
    </Card>
  );
};

export default PublicacionesSimilares;
