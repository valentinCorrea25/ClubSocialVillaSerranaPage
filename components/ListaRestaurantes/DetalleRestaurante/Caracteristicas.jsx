import React from 'react';
import { Card } from 'antd';
import { DollarCircleOutlined, ClockCircleOutlined, CalendarOutlined, InstagramOutlined, FacebookOutlined, GlobalOutlined } from '@ant-design/icons';

const CaracteristicasAlojamiento = ({ restaurante }) => {
  const {
    tipo_pago = [],
    horario_semanal = '',
    horario_finde = '',
    domingo = false,
    instagram = '',
    facebook = '',
    web = ''
  } = restaurante;

  return (
    <Card
      title={
        <div className="text-2xl font-bold text-center" style={{ backgroundColor: 'var(--azul)', color: 'var(--blanco)', padding: '16px', borderRadius: '8px' }}>
          Características
        </div>
      }
      style={{ backgroundColor: '#FFFFFF', borderRadius: '23px', border: '2px solid #ddd', height: '100%', overflow: 'hidden' }}
      headStyle={{ padding: 0 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Columna 1: Horarios */}
        <div style={{ flex: 1, marginRight: '10px' }}>
          <h3 style={{ fontWeight: 'bold' }}>Horarios</h3>
          <p><ClockCircleOutlined style={{ marginRight: '8px' }} /> <strong>Semanal:</strong> {horario_semanal || 'No disponible'}</p>
          <p><CalendarOutlined style={{ marginRight: '8px' }} /> <strong>Fin de Semana:</strong> {horario_finde || 'No disponible'}</p>
          <p><CalendarOutlined style={{ marginRight: '8px' }} /> <strong>Domingos:</strong> {domingo ? 'Sí' : 'No'}</p>
        </div>

        {/* Columna 2: Redes Sociales */}
        <div style={{ flex: 1, marginRight: '10px' }}>
          <h3 style={{ fontWeight: 'bold' }}>Redes Sociales</h3>
          <p><InstagramOutlined style={{ marginRight: '8px' }} /> <strong>Instagram:</strong> {instagram ? <a href={instagram} target="_blank" rel="noopener noreferrer">{instagram}</a> : 'No disponible'}</p>
          <p><FacebookOutlined style={{ marginRight: '8px' }} /> <strong>Facebook:</strong> {facebook ? <a href={facebook} target="_blank" rel="noopener noreferrer">{facebook}</a> : 'No disponible'}</p>
          <p><GlobalOutlined style={{ marginRight: '8px' }} /> <strong>Web:</strong> {web ? <a href={web} target="_blank" rel="noopener noreferrer">{web}</a> : 'No disponible'}</p>
        </div>

        {/* Columna 3: Tipo de Pago */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontWeight: 'bold' }}>Tipo de Pago</h3>
          <p><DollarCircleOutlined style={{ marginRight: '8px' }} /> <strong>Formas de Pago:</strong> {tipo_pago.join(', ') || 'No disponible'}</p>
        </div>
      </div>
    </Card>
  );
};

export default CaracteristicasAlojamiento;