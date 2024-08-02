'use client';
import React from 'react';
import { Card, Button } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { contactInfo } from '@/test/data';

const ContactoInfo = () => (
  <Card 
    title={<span className="text-2xl font-bold text-gray-800 text-center block" style={{ color: 'var(--azul)' }}>Información de Contacto</span>} className="bg-white p-4 rounded-lg shadow-md">

    <p className="text-gray-800 flex items-center mb-2"><UserOutlined style={{ marginRight: 8 }} />{contactInfo.name}</p>

    <p className="text-gray-800 flex items-center mb-2"><PhoneOutlined style={{ marginRight: 8 }} />{contactInfo.phone}</p>
    
    <Button type="primary" icon={<MailOutlined />} href={`mailto:${contactInfo.email}`} className="w-full mb-2">Consultar vía E-mail</Button>

    <Button type="primary" icon={<WhatsAppOutlined />} href={contactInfo.whatsapp} className="w-full">Consultar vía WhatsApp</Button>
  </Card>
);

export default ContactoInfo;
