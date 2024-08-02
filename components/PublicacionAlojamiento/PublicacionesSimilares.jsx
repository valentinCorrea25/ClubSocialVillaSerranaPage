'use client';
import React from 'react';
import { Card, List } from 'antd';
import { PubSimimilares } from '@/test/data'; 
import { EnvironmentOutlined } from '@ant-design/icons'; 

const PublicacionesSimilares = () => (
  <Card 
    title={<div className="text-2xl font-bold text-gray-800 text-center" style={{ color: 'var(--azul)' }}>Publicaciones Similares</div>} 

    style={{ backgroundColor: '#FFFFFF', borderRadius: '23px', border: '2px solid #ddd', height: '100%', }}>

    <div style={{ flex: 1, overflowY: 'auto', maxHeight: '400px', padding: '16px', }}><List itemLayout="vertical"dataSource={PubSimimilares}
        renderItem={item => (
          <List.Item style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            <div style={{ textAlign: 'center' }}>
              <img src={item.foto} alt={item.ubicacion} style={{ width: '100%', borderRadius: '12px', marginBottom: '8px' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{item.categoria}</div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <EnvironmentOutlined style={{ marginRight: '8px' }} />
                  {item.ubicacion}
                </div>
                <div>Hasta {item.cantidad_personas} personas</div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  </Card>
);

export default PublicacionesSimilares;
