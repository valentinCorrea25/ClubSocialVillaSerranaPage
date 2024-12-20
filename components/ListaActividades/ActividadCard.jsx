"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { Card, Tag, Button } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { cleanContent } from "../utils/ControlPublicaciones";

const { Meta } = Card;


const ActividadCard = ({ actividad }) => {
  const {
    titulo,
    contenido,
    fotos,
    fecha_publicacion,
    categoria,
    ubicacion,
    horario,
    dia_Semana,
  } = actividad;

  const router = useRouter();
  const handleViewDetails = (id) => {
    router.push(`/ListaActividades/DetalleActividades?id=${id}`);
  };

  return (
    <Card onClick={() => handleViewDetails(actividad.id_Actividad)}
      hoverable
      cover={
        <div
          className="m-auto"
          style={{
            overflow: "hidden",
            borderRadius: "12px",
            position: "relative",
          }}
        >
          <img
            alt={titulo}
            src={fotos[0] ? fotos[0] : 'https://res.cloudinary.com/dvzf7szuo/image/upload/v1730236113/not-found_td14yf.png'}
            style={{
              width: "100%",
              height: "250px",
              maxHeight: "250px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      }
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        marginBottom: "24px",
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        padding: "12px",
      }}
    >
      <Meta
        title={
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>{titulo}</div>
        }
        description={
          <>
            <div style={{ color: "#0367A6" }}>
              <CalendarOutlined />{" "}
              {new Date(fecha_publicacion).toLocaleDateString()}
              <TagOutlined style={{ marginLeft: "8px" }} /> Actividad
              <EnvironmentOutlined style={{ marginLeft: "8px" }} /> {ubicacion}
            </div>
            <div style={{ marginTop: "8px" }}>
              {dia_Semana.map((dia, index) => (
                <Tag key={index} style={{ marginRight: "4px" }}>
                  {dia}
                </Tag>
              ))}
            </div>
            <div className="mt-2 text-[--azul]" >
              <span><ClockCircleOutlined style={{ marginRight: "4px" }} /> {horario}</span>
            </div>
            <p
              style={{
                marginTop: "5px",
                height: "auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                lineHeight: "1.5"
              }}
            >
              {cleanContent(contenido).substring(0, 150)}
              {contenido.length > 150 && "..."}
            </p>
            <Button
              type="primary"
              onClick={() => handleViewDetails(actividad.id_Actividad)}
              className="mt-7  "
            >
              Ver Detalles
            </Button>
          </>
        }


      />

    </Card>
  );
};

export default ActividadCard;
