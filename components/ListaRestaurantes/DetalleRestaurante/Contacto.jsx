import React from 'react';
import { Card, Button } from 'antd';
import { PhoneOutlined, MailOutlined, UserOutlined, WhatsAppOutlined } from '@ant-design/icons';

const Contacto = ({ restaurante }) => {
  const { nombre_titular, celular, mail } = restaurante;

  return (
    <Card
      title={
        <div className="text-2xl font-bold text-center" style={{ backgroundColor: 'var(--azul)', color: 'var(--blanco)', padding: '16px', borderRadius: '8px' }}>
          Contacto
        </div>
      }
      style={{ backgroundColor: '#FFFFFF', borderRadius: '23px', border: '2px solid #ddd', height: '100%', overflow: 'hidden' }}
      headStyle={{ padding: 0 }}
    >
      <p><UserOutlined style={{ marginRight: '8px' }} /> <strong>Nombre:</strong> {nombre_titular || 'No disponible'}</p>
      <p><PhoneOutlined style={{ marginRight: '8px' }} /> <strong>Teléfono:</strong> {celular || 'No disponible'}</p>
      <Button 
        type="primary" 
        icon={<MailOutlined />} 
        href={`mailto:${mail}`} 
        className="w-full mb-2"
      >
        Consultar vía E-mail
      </Button>
      <Button 
        type="primary" 
        icon={<WhatsAppOutlined />} 
        href={`https://wa.me/${celular}`} 
        className="w-full"
      >
        Consultar vía WhatsApp
      </Button>
    </Card>
  );
};

export default Contacto;
