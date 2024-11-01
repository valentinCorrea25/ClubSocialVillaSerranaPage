"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { Card, Tag, Button } from "antd";
import {
  EnvironmentOutlined,
  UsergroupDeleteOutlined,
  PhoneOutlined
} from "@ant-design/icons";
import { alojamientos } from "@/test/data";

const { Meta } = Card;


const AlojamientoCard = ({ alojamiento }) => {
  const {
    titulo,
    descripcion,
    fotos,
    ubicacion_calles,
    capacidad,
    comodidades,
    celular
  } = alojamiento;

  const router = useRouter();
  const handleViewDetails = (id) => {
    router.push(`/ListaAlojamiento/DetalleAlojamiento?id=${id}`);
  };

  return (
    <Card onClick={() => handleViewDetails(alojamiento.id_Alquiler)}
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
              height: "100%",
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
              <EnvironmentOutlined style={{ marginLeft: "8px" }} /> Ubicación: {ubicacion_calles}
            </div>
            <div style={{ color: "#0367A6" }}>
              <UsergroupDeleteOutlined style={{ marginLeft: "8px" }} /> Capacidad: {capacidad}
            </div>
            <div style={{ color: "#0367A6" }}>
              <PhoneOutlined style={{ marginLeft: "8px" }} /> Telefono: {celular}
            </div>
            <div style={{ marginTop: "8px" }}>
              {(() => {
                const comodidades = [];

                // Iteramos sobre todas las propiedades del objeto 'alojamiento'
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
                  ? (
                    <>
                      {comodidades.slice(0, 4).map((comodidad, index) => (
                        <Tag key={index}>{comodidad}</Tag>
                      ))}
                      {comodidades.length > 4}
                    </>
                  )
                  : "No hay comodidades disponibles";
              })()}
            </div>
            <p
              style={{
                marginTop: "16px",
                height: "auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: descripcion.substring(0, 150) }} />
              {descripcion.length > 150 && "...."}
            </p>
            <Button
              type="primary"
              onClick={() => handleViewDetails(alojamiento.id_Actividad)}
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

export default AlojamientoCard;
