import React from 'react';
import { Card } from 'antd';
import { MailOutlined, PhoneOutlined, ClockCircleOutlined, CalendarOutlined, TagOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ServicioCard = ({ servicio }) => {
  const { nombre_titular, titulo, descripcion, mail, celular, horario, dia_Semana, titulo_Servicio } = servicio;

  return (
    <Card
      hoverable
      style={{
        width: '100%',
        maxWidth: '500px',
        height:'420px',
        margin: '0 auto',
        marginBottom: '24px',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0,0,0,0.2)', 
        backgroundColor: '#FFFFFF',
        padding: '16px',
        border: '2px solid #09A603' 
      }}
    >
      <div style={{ paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' }}>
        <h3 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0' }}>{titulo}</h3>
      </div>
      <div className='flex flex-col justify-center' style={{ marginTop: '12px', color: '#595959' }}>
        <p style={{ marginBottom: '8px' }}>
          <TagOutlined style={{ marginRight: '8px', color: '#09A603' }} />
          {titulo_Servicio}
        </p>
        <p style={{ marginBottom: '8px' }}>
          <MailOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          {mail}
        </p>
        <p style={{ marginBottom: '8px' }}>
          <PhoneOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
          {celular}
        </p>
        <p style={{ marginBottom: '8px' }}>
          <ClockCircleOutlined style={{ marginRight: '8px', color: '#fa8c16' }} />
          {horario}
        </p>
        <p style={{ marginBottom: '8px' }}>
          <CalendarOutlined style={{ marginRight: '8px', color: '#eb2f96' }} />
          {dia_Semana.join(', ')}
        </p>
        <p style={{ marginTop: '16px' }}>
          {descripcion}
        </p>
      </div>
    </Card>
  );
};

export default ServicioCard;
