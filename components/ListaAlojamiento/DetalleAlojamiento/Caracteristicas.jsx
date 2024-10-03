"use client";
import React from "react";
import { Card, Col, Row, Tag } from "antd";

const CaracteristicasAlojamiento = ({ alojamiento }) => {

  return (
    <Card
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "4px",
        border: "2px solid #ddd",
        height: "100%",
        overflow: "hidden",
      }}
      bodyStyle={{ padding: "16px" }}
    >
      <div
        style={{
          backgroundColor: "var(--verde-oscuro)'",
          color: "var(--blanco)",
          padding: "16px",
          margin: "-16px -16px 16px -16px",
          borderRadius: "8px 8px 0 0",
          width: "calc(100% + 32px)",
        }}
      >
        <div className="text-2xl font-bold text-center">Características</div>
      </div>

      <Row gutter={[16, 16]} wrap={true}>
        <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Comodidades</h4>
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
                    <Tag key={index}>{comodidad}</Tag>
                  ))
                : "No hay comodidades disponibles";
            })()}
          </ul>
        </Col>
        {/* <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Comodidades</h4>
          <ul>
            {comodidades.length > 0 ? comodidades.map((item, index) => (<li key={index}>{item}</li>)) : <li>No disponible</li>}
          </ul>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Servicios Básicos</h4>
          <ul>
            {serviciosBasicos.length > 0 ? serviciosBasicos.map((item, index) => (<li key={index}>{item}</li>)) : <li>No disponible</li>}
          </ul>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Adicionales</h4>
          <ul>
            {adicionales.length > 0 ? adicionales.map((item, index) => (<li key={index}>{item}</li>)) : <li>No disponible</li>}
          </ul>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Equipamiento</h4>
          <ul>
            {equipamiento.length > 0 ? equipamiento.map((item, index) => (<li key={index}>{item}</li>)) : <li>No disponible</li>}
          </ul>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Entretenimiento</h4>
          <ul>
            {entretenimiento.length > 0 ? entretenimiento.map((item, index) => (<li key={index}>{item}</li>)) : <li>No disponible</li>}
          </ul>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <h4 className="font-bold">Exterior</h4>
          <ul>
            {exterior.length > 0 ? exterior.map((item, index) => (<li key={index}>{item}</li>)) : <li>No disponible</li>}
          </ul>
        </Col> */}
      </Row>
    </Card>
  );
};

export default CaracteristicasAlojamiento;
