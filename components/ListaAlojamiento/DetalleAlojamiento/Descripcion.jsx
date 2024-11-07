import React from 'react';
import { Card, Row, Col, Tag } from 'antd';

const Descriptions = ({ alojamiento }) => (
  <Card
    style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '4px',
      border: '2px solid #ddd',
    }}
    bodyStyle={{ padding: '16px' }}
  >
    <div
      style={{
        backgroundColor: 'var(--verde-oscuro)',
        color: 'var(--blanco)',
        padding: '16px',
        margin: '-16px -16px 16px -16px',
        borderRadius: '8px 8px 0 0',
        width: 'calc(100% + 32px)'
      }}
    >
      <div className="text-2xl font-bold text-center">Descripción</div>
    </div>

    <div className="p-3">
      {/* {alojamiento.disponibilidad && (
        <div className="mb-2 text-gray-800">
          <strong>Disponibilidad:</strong> {alojamiento.disponibilidad}
        </div>
      )} */}
      <p className="text-gray-600">
        {alojamiento.descripcion || 'Descripción no disponible'}
      </p>
    </div>
    <div className='flex gap-2'>

      <h4 className="font-bold">Comodidades:</h4>
      <ul>
        {(() => {
          const comodidades = [];

          // Iteramos sobre todas las propiedades del objeto 'caracteristicas'
          for (const key in alojamiento) {
            if (alojamiento[key] === true) {
              // Convertir el nombre de la propiedad a algo más legible si es necesario
              let nombreComodidad = key
                .replace("_", " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());
              comodidades.push(nombreComodidad);
            }
          }

          return comodidades.length > 0
            ? comodidades.map((comodidad, index) => (
              <Tag key={index} >{comodidad}</Tag>
            ))
            : "No hay comodidades disponibles";
        })()}
      </ul>


    </div>
  </Card>
);

export default Descriptions;
