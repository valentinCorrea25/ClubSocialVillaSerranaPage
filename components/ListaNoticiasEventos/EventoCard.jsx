"use client";

import React from "react";
import { Card, Tag, Button } from "antd";
import { CalendarOutlined, TagOutlined } from "@ant-design/icons";
import { useRouter } from 'next/navigation';

const { Meta } = Card;

const EventoCard = ({ evento }) => {
  const {
    titulo,
    contenido,
    fotos,
    fecha_publicacion,
    fecha_evento,
  } = evento;

  // Convertimos la fecha del evento a un objeto Date para compararla
  const fechaEventoDate = fecha_evento;
  const fechaCorte = new Date("12/31/1969");

  // Lógica para mostrar "Noticias" o "Eventos"
  const categoriaLabel = fechaEventoDate > fechaCorte ? "Noticias" : "Eventos";
  const fechaevento = fechaEventoDate > fechaCorte ? '' : "Fecha del Evento: " + new Date(fecha_evento).toLocaleDateString();
  const router = useRouter();
  const handleViewDetails = (id) => {
    router.push(`/ListaEventosNoticias/DetalleEventosNoticias?id=${id}`);
  };

  return (
    <Card onClick={() => handleViewDetails(evento.id_EventoNoticia)}
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
            src={fotos}
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
              <TagOutlined style={{ marginLeft: "8px" }} />{" "}
              {categoriaLabel}
              {/* Mostrar Fecha del Evento solo si es mayor a 12/31/1969 */}

              <div style={{ marginTop: "8px" }}>
                <span>
                  {fechaevento}

                </span>
              </div>

            </div>
            <p
              style={{
                marginTop: "16px",
                height: "auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: contenido.substring(0, 150) }} />
              {contenido.length > 150 && "...."}

            </p>
            <Button
              type="primary"
              onClick={() => handleViewDetails(evento.id_EventoNoticia)}
              className="mt-7 m-auto sm:ml-0"
            >
              Ver Detalles
            </Button>
          </>
        }
      />
    </Card>
  );
};

export default EventoCard;
