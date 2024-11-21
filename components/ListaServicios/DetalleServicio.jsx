'use client'
import React, { useEffect, useState, useContext } from 'react';
import { Card, Badge, Spin, Result, Typography } from 'antd';
import { 
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
  CalendarDaysOutlined
} from '@ant-design/icons';
import { ClientContext } from '@/context/clientContext';
import PublicacionNoEncontrada from '@/components/utils/PublicacionNoEncontrada';
import { useSearchParams } from 'next/navigation';
import { tituloCorrectoServicio } from '@/components/utils/ControlPublicaciones';

const { Title, Text } = Typography;

const ServicioDetalle = () => {
    const searchParams = useSearchParams();
    const servicioId = searchParams.get('id');
    
    const [servicio, setServicio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { buscarServicio } = useContext(ClientContext);
  
    useEffect(() => {
      const fetchServicio = async () => {
        if (!servicioId) {
          setError('ID de servicio no proporcionado');
          setLoading(false);
          return;
        }
  
        try {
          setLoading(true);
          const data = await buscarServicio(servicioId);
          setServicio(data.publicacion);
        } catch (err) {
          setError('No se pudo cargar el servicio');
          console.error('Error al cargar servicio:', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchServicio();
    }, [buscarServicio, servicioId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" tip="Cargando servicio..." />
      </div>
    );
  }

  if (error || !servicio) {
    return (
      <PublicacionNoEncontrada/>
    );
  }

  const {
    nombre_titular,
    titulo,
    descripcion,
    mail,
    celular,
    horario,
    dia_Semana,
    fecha_publicacion,
    titulo_Servicio,
    publicado
  } = servicio;

  const InfoItem = ({ icon, title, children, className = '' }) => (
    <div className={`flex items-start gap-3 ${className}`}>
      {icon}
      <div>
        <Text strong>{title}</Text>
        <div>{children}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">

      <Card className="shadow-md">
        {/* Encabezado */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <FileTextOutlined className="text-xl" />
            <Text type="secondary">{tituloCorrectoServicio(titulo_Servicio)}</Text>
          </div>
          <Title level={2} className="!mb-2">{titulo}</Title>
          {/* <div className="flex items-center gap-2 text-gray-500">
            <CalendarDaysOutlined />
            <Text type="secondary">
              {format(new Date(fecha_publicacion), "d 'de' MMMM, yyyy", { locale: es })}
            </Text>
          </div> */}
        </div>

        {/* Contenido */}
        <div className="space-y-6">
          <InfoItem 
            icon={<UserOutlined className="text-2xl text-[--verde]" />}
            title="Titular"
          >
            {nombre_titular}
          </InfoItem>

          {descripcion && (
            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50">
              <Text>{descripcion}</Text>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {mail && (
              <InfoItem 
                icon={<MailOutlined className="text-2xl text-[--verde]" />}
                title="Correo"
              >
                <a href={`mailto:${mail}`} className="text-[--verde] hover:underline">
                  {mail}
                </a>
              </InfoItem>
            )}

            <InfoItem 
              icon={<PhoneOutlined className="text-2xl text-[--verde]" />}
              title="Teléfono"
            >
              <a href={`tel:${celular}`} className="text-[--verde] hover:underline">
                {celular}
              </a>
            </InfoItem>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {horario && (
              <InfoItem 
                icon={<ClockCircleOutlined className="text-2xl text-[--verde]" />}
                title="Horario"
              >
                {horario}
              </InfoItem>
            )}

            {dia_Semana?.length > 0 && (
              <InfoItem 
                icon={<CalendarOutlined className="text-2xl text-[--verde]" />}
                title="Días de atención"
              >
                <div className="flex flex-wrap gap-2">
                  {dia_Semana.map((dia) => (
                    <Badge 
                      key={dia}
                      count={dia}
                     color='green'
                    />
                  ))}
                </div>
              </InfoItem>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ServicioDetalle;