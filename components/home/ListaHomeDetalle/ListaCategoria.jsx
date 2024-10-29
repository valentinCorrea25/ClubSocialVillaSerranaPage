"use client";

import React from "react";
import { Card } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SettingOutlined,
  ShopOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const fields = [
  {
    title: " Ver Alojamientos",
    icon: <HomeOutlined className="pt-4" />,
    path: "/ListaAlojamiento",
  },
  {
    title: "Ver Restaurantes",
    icon: <ShopOutlined className="pt-4" />,
    path: "/ListaRestaurantes",
  },
  {
    title: "Ver Actividades",
    icon: <SunOutlined className="pt-4" />,
    path: "/ListaActividades",
  },
  {
    title: "Ver Eventos",
    icon: <CalendarOutlined className="pt-4" />,
    path: "/ListaEventosNoticias",
  },
  {
    title: "Ver Noticias",
    icon: <FileTextOutlined className="pt-4" />,
    path: "/ListaEventosNoticias",
  },
  {
    title: "Ver Servicios",
    icon: <SettingOutlined className="pt-4" />,
    path: "/ListaServicios",
  },
];

const TourismComponent = () => {
  const router = useRouter();

  return (
    <div className="p-4 text-center flex flex-col items-center pt-10">
      <div className="bg-[--verde] p-2 mb-4 w-full max-w-4xl rounded-lg">
        <h1 className="text-3xl font-bold text-white ">
          Turismo en Villa Serrana
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-4xl">
        {fields.map((field, index) => (
          <Card
            key={index}
            hoverable
            className=" bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1"
            cover={<div className="text-4xl text-[--verde] items-center">{field.icon}</div>}
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
