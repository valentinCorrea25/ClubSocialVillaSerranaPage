import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import { MailOutlined, PhoneOutlined, ClockCircleOutlined, CalendarOutlined, TagOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';

const ServicioCard = ({ servicio }) => {
  const { nombre_titular, titulo, descripcion, mail, celular, horario, dia_Semana, titulo_Servicio } = servicio;
  
  // Estado para controlar el modal
  const [visible, setVisible] = useState(false);

  // Funciones para abrir y cerrar el modal
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Card
        hoverable
        className='sm:h-[420px] sm:p-5 md:max-w-[500px] max-w-80'
        style={{
          height: '420px',
          margin: '0 auto',
          marginBottom: '24px',
          borderRadius: '8px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.2)', 
          backgroundColor: '#FFFFFF',
          border: '2px solid #09A603'
        }}
        onClick={showModal} // Abre el modal al hacer clic en la tarjeta
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
            <ClockCircleOutlined style={{ marginRight: '8px', color: '#fa8c16' }} />
            {nombre_titular}
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
          <p style={{ marginTop: '0px' }}>
            <FileOutlined style={{ marginRight: '8px', color: 'red' }} />
            Descripcion: {descripcion}
          </p>
        </div>
      </Card>

      <Modal 
          title={<h2 style={{ fontSize: '26px', marginLeft:"20px"}}>{titulo}</h2>}  
          visible={visible}
          onCancel={handleCancel}
          footer={null}
          width={600}  
          bodyStyle={{ fontSize: '20px', padding: '24px', }}  
        >
          <p style={{ fontSize: '15px', marginBottom: '16px' }}>
            <TagOutlined style={{ marginRight: '12px', fontSize: '20px', color: '#09A603' }} />
            {titulo_Servicio}
          </p>
          <p style={{ fontSize: '15px', marginBottom: '16px' }}>
            <MailOutlined style={{ marginRight: '12px', fontSize: '20px', color: '#1890ff' }} />
            {mail}
          </p>
          <p style={{ fontSize: '15px', marginBottom: '16px' }}>
            <UserOutlined style={{ marginRight: '12px', fontSize: '20px', color: '#fa8c16' }} />
            {nombre_titular}
          </p>
          <p style={{ fontSize: '15px', marginBottom: '16px' }}>
            <PhoneOutlined style={{ marginRight: '12px', fontSize: '20px', color: '#52c41a' }} />
            {celular}
          </p>
          <p style={{ fontSize: '15px', marginBottom: '16px' }}>
            <ClockCircleOutlined style={{ marginRight: '12px', fontSize: '20px', color: '#fa8c16' }} />
            {horario}
          </p>
          <p style={{ fontSize: '15px', marginBottom: '16px' }}>
            <CalendarOutlined style={{ marginRight: '12px', fontSize: '20px', color: '#eb2f96' }} />
            {dia_Semana.join(', ')}
          </p>
          <p style={{ fontSize: '15px', marginTop: '0px' }}>
            <FileOutlined style={{ marginRight: '12px', fontSize: '20px', color: 'red' }} />
            Descripcion: {descripcion}
          </p>
</Modal>
    </>
  );
};

export default ServicioCard;