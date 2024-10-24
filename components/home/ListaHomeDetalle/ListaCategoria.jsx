'use client';

import React from 'react';
import { Card } from 'antd';
import { MdOutlineFoodBank } from "react-icons/md";
import { HomeOutlined, CalendarOutlined, FileTextOutlined, SettingOutlined, ShopOutlined, SunOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";

const fields = [
    { title: 'Alojamientos', icon: <HomeOutlined />, path: '/ListaAlojamiento' },
    { title: 'Restaurantes', icon: <ShopOutlined />, path: '/ListaRestaurantes' },
    { title: 'Actividades', icon: <SunOutlined />, path: '/ListaActividades' },
    { title: 'Eventos', icon: <CalendarOutlined c />, path: '/ListaEventosNoticias' },
    { title: 'Noticias', icon: <FileTextOutlined c />, path: '/ListaEventosNoticias' },
    { title: 'Servicios', icon: <SettingOutlined c />, path: '/ListaServicios' },
];

const TourismComponent = () => {
    const router = useRouter();

    return (
        <div className="p-4 text-center flex flex-col items-center pt-10">
            <div className="bg-[--verde] p-2 mb-4 w-full max-w-4xl rounded-lg">
                <h1 className="text-3xl font-bold text-white ">Turismo en Villa Serrana</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-4xl">
                {fields.map((field, index) => (
                    <Card
                        key={index}
                        hoverable
                        className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 hover:-translate-y-1"
                        cover={<div className="text-4xl text-[--verde-oscuro] ">{field.icon}</div>}
                        onClick={() => router.push(field.path)}
                    >
                        <Card.Meta title={field.title} />
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TourismComponent;
