'use client';
import React from 'react';
import { Card, Button } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, WhatsAppOutlined } from '@ant-design/icons';

const ContactoInfo = ({ contacto }) => (
  <Card 
    title={
      <div style={{ backgroundColor: 'var(--azul)', color: 'var(--blanco)', padding: '16px', borderRadius: '4px', width: '100%' }}>
        <div className="text-2xl font-bold text-center">Información de Contacto</div>
      </div>
    } 
    style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', border: '2px solid #ddd', height: '100%', overflow: 'hidden' }}
    styles={{ header: { padding: 0 } }}
  >
    <p className="text-gray-800 flex items-center mb-2"><UserOutlined style={{ marginRight: 8 }} />{contacto.name}</p>
    <p className="text-gray-800 flex items-center mb-2"><PhoneOutlined style={{ marginRight: 8 }} />{contacto.phone}</p>
    <Button type="primary" icon={<MailOutlined />} href={`mailto:${contacto.email}`} className="w-full mb-2">Consultar vía E-mail</Button>
    <Button type="primary" icon={<WhatsAppOutlined />} href={contacto.whatsapp} className="w-full">Consultar vía WhatsApp</Button>
  </Card>
);

export default ContactoInfo;
