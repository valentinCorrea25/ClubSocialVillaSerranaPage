import React from 'react';
import { Card } from 'antd';
import {TeamOutlined, EnvironmentOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons"

const Informacion = ({ alojamiento }) => (
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
      <div className="text-2xl font-bold text-center">
      {alojamiento.titulo}
      </div>
    </div>

    <div className="p-1">
    <p className="text-gray-800 mb-2 text-[15px]"> <UserOutlined   className='mr-2'/>{alojamiento.nombre_titular  }</p>
    <p className="text-gray-800 mb-2 text-[15px]"> <PhoneOutlined   className='mr-2'/>{alojamiento.celular}</p> 
      <p className="text-gray-800 mb-2 text-[15px]"> <EnvironmentOutlined  className='mr-2'/>{alojamiento.ubicacion_calles}</p>
      <p className="text-gray-800 mb-2 text-[15px]"> <TeamOutlined className='mr-2'/> Hasta {alojamiento.capacidad} personas</p>
      <p className="text-gray-800 mb-2 text-[15px]"> 
      {alojamiento.precio ? <div>
        <TeamOutlined className='mr-2'/>Precio:
                      {alojamiento.precio !== undefined
                        ? `$${alojamiento.precio}`
                        : "No especificado"}
                    </div> : null}
      </p>
    </div>
  </Card>
);

export default Informacion;
