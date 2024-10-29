
import React from 'react';
import { Card, Button, Tag } from 'antd';
import { EnvironmentOutlined, FileTextOutlined, CalendarOutlined } from '@ant-design/icons';

export function Actividad({ actividad }) {
  return (
    <Card
      bordered={false}
      style={{ width: '100%', backgroundColor: '#FFFFFF', padding: '24px' }}
    >
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">{actividad?.titulo || 'Título no disponible'}</h2>

      {/* Location, Category, and Date */}
      <div className="flex flex-col mb-4 text-gray-600">
        <p className="mb-1">
          <CalendarOutlined style={{ marginRight: 8 }} />
          <span className="text-blue-600 ">
            Fecha de publicacion {new Date(actividad?.fecha_publicacion).toLocaleDateString('es-ES') || 'Fecha no disponible'}
          </span>
        </p>
        <p className="mb-1">
          <CalendarOutlined style={{ marginRight: 8 }} />
          {actividad.dia_Semana.map((dia, index) => (
            <Tag key={index} className="text-blue-600" style={{ marginRight: "4px" }}>
              {dia}
            </Tag>
          )) || 'Categoría no disponible'} {actividad?.horario || 'Categoría no disponible'}
        </p>

        <p className="mb-1">
          <EnvironmentOutlined className="text-blue-600" style={{ marginRight: 8, }} />
          <span className="text-blue-600">
            {actividad?.ubicacion || 'Ubicación no disponible'}
          </span>
        </p>
      </div>

      {/* Description */}
      <div className="text-gray-800">
        <p dangerouslySetInnerHTML={{ __html: actividad?.contenido || 'Descripción no disponible' }} />
      </div>
    </Card>
  );
}

export default Actividad;

export function Características({ actividad }) {
  return (

    <Card
      title={
        <div style={{ backgroundColor: 'var(--verde-oscuro)', color: 'var(--blanco)', padding: '16px', borderRadius: '4px', width: '100%' }}>
          <div className="text-2xl font-bold text-center">Contenido</div>
        </div>
      }
      style={{ backgroundColor: '#FFFFFF', borderRadius: '4px', border: '2px solid #ddd' }}
      headStyle={{ padding: 0 }}
    >
      <p className="text-gray-800 mb-2">
        <FileTextOutlined style={{ marginRight: 8 }} />
        {actividad?.contenido || 'Ubicación no disponible'}
      </p>
    </Card>
  );
}
export function UbicacionMap({ ubicacion }) {
  return (<Card
    title={
      <div
        className="text-2xl font-bold text-center"
        style={{
          backgroundColor: "var(--verde-oscuro)",
          color: "var(--blanco)",
          padding: "16px",
          borderRadius: "4px",
        }}
      >
        Ubicación
      </div>
    }
    style={{
      backgroundColor: "#FFFFFF",
      borderRadius: "4px",
      border: "2px solid #ddd",
      height: "auto",
      overflow: "hidden",
    }}
    headStyle={{ padding: 0 }}
  >
    <div className="relative w-full h-74 overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d411.90252397605764!2d-54.988653092532836!3d-34.31941135762975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x950ac5ca3874096d%3A0x16635488f0b1fd1a!2sAutoservice%20MILI!5e0!3m2!1ses-419!2suy!4v1725657243813!5m2!1ses-419!2suy"
        width="400"
        height="300"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div className="flex justify-center mt-4">
      <Button type="primary">Ver Ubicación</Button>
    </div>
  </Card>

  )
}
