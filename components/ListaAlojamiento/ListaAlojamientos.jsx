"use client";

import React from "react";
import { Card, List, Tag, Button, Alert } from "antd";
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";


const { Meta } = Card;

const ListaAlojamientos = ({ alojamientos, onViewDetails }) => {
  if (!alojamientos) {
    return (
      <div style={{ padding: "24px" }}>
        <Alert
          message="No se encontraron resultados"
          description="No hay alojamientos que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda."
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={alojamientos}
      renderItem={(alojamiento) => (
        <List.Item>
          <Card
            onClick={() => onViewDetails(alojamiento.id_Alquiler)}
            hoverable
            style={{
              width: "100%",
              padding: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "#ffffff",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            cover={
              alojamiento.fotos && alojamiento.fotos.length > 0 ? (
                <img
                  alt={alojamiento.title || "Imagen del alojamiento"}
                  src={
                    alojamiento.fotos[0] ||
                    "https://via.placeholder.com/600x400"
                  }
                  style={{
                    width: 300,
                    height: 200,
                    objectFit: "cover",
                    marginRight: 16,
                  }}
                />
              ) : null
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div style={{ flex: 1 }}>
              <Meta
                title={alojamiento.titulo || "Título no disponible"}
                description={
                  <>
                    <div>
                      <EnvironmentOutlined />{" "}
                      {alojamiento.ubicacion || "Ubicación no disponible"}
                    </div>
                    <div>
                      <UserOutlined /> Capacidad:{" "}
                      {alojamiento.capacidad || "No especificado"}
                    </div>
                    <div>
                      Precio:{" "}
                      {alojamiento.precio !== undefined
                        ? `$${alojamiento.precio}`
                        : "No especificado"}
                    </div>
                    <div>
                      Descripción: {alojamiento.descripcion || "No disponible"}
                    </div>
                    <div>
                      {(() => {
                        const comodidades = [];

                        // Iteramos sobre todas las propiedades del objeto 'caracteristicas'
                        for (const key in alojamiento) {
                          if (comodidades.length >= 10) break; // Limitar a 10 características

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
                              <Tag key={index}>{comodidad}</Tag>
                            ))
                          : "No hay comodidades disponibles";
                      })()}
                    </div>
                  </>
                }
              />
            </div>
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Button
                type="primary"
                onClick={() => onViewDetails(alojamiento.id_Alquiler)}
                style={{ marginTop: "16px" }}
              >
                Ver Detalles
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ListaAlojamientos;
