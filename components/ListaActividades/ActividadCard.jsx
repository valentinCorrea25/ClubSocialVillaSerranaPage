"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { Card, Tag, Button } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TagOutlined,
} from "@ant-design/icons";

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
            src={fotos[0]}
            style={{
              width: "100%",
              height: "100%",
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
              <TagOutlined style={{ marginLeft: "8px" }} /> {categoria}
              <EnvironmentOutlined style={{ marginLeft: "8px" }} /> {ubicacion}
            </div>
            <div style={{ marginTop: "8px" }}>
              {dia_Semana.map((dia, index) => (
                <Tag key={index} style={{ marginRight: "4px" }}>
                  {dia}
                </Tag>
              ))}
              <span>{horario}</span>
            </div>
            <p
              style={{
                marginTop: "16px",
                height: "auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: contenido.substring(0, 500) }} />....
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
