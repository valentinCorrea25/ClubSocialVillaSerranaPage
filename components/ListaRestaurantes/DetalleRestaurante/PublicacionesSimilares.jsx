import React from 'react';
import { Card, List, Button } from 'antd';

import { ClockCircleOutlined, TagOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const PublicacionesSimilares = ({ restaurantes }) => {
  // { onSelect }) => {} previous before my update
  const router = useRouter();

  console.log(restaurantes);
  

  const handleViewDetails = (id) => { // Ver si esto hay forma de actualiar
    console.log(id + 'id');
    router.push(`/ListaRestaurantes/DetalleRestaurante?id=${id}`);
  };

  const handleViewMore = () => {
    router.push(`/ListaRestaurantes`);
  };

  return (
    <Card
      title={
        <div style={{ backgroundColor: 'var(--azul)', color: 'var(--blanco)', padding: '16px', borderRadius: '4px', width: '100%' }}>
          <div className="text-2xl font-bold text-center">Publicaciones Similares</div>
        </div>
      }
      style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', border: '2px solid #ddd', height: '100%' }}
      headStyle={{ padding: 0 }}
    >
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '500px', padding: '16px' }}>
        <List
          itemLayout="vertical"
          dataSource={restaurantes} 
          // dataSource={restaurantes.filter(restaurante => restaurante.id_Restaurante !== onSelect.id_Restaurante)} 
          renderItem={item => (
            <List.Item
              key={item.id_Restaurante}
              style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
              // onClick={() => onSelect(item)} 
            >
              <div style={{ textAlign: 'center' }} onClick={() => {handleViewDetails(item.id_Restaurant)}}>
                <img
                  src={item.fotos[0]}
                  alt={item.titulo}
                  style={{ width: '100%', borderRadius: '12px', marginBottom: '8px' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    {item.titulo}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                    <TagOutlined style={{ marginRight: '8px' }} />
                    {item.descripcion || 'Categoría no disponible'}
                  </div>
                  <p style={{ marginTop: '4px', color: '#666' }}>
                  <ClockCircleOutlined /> Horarios: {item.horario_semanal || 'No disponible'}
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
