import React from "react";
import { Card, Button } from "antd";

const UbicacionMap = ({ ubicacion }) => (
  /// LEAFLET MAP
  <Card
    title={
      <div
        className="text-2xl font-bold text-center"
        style={{
          backgroundColor: "var(--verde-oscuro)",
          color: "var(--blanco)",
          padding: "16px",
          borderRadius: "4px",
        }}
      >
        Ubicación
      </div>
    }
    style={{
      backgroundColor: "#FFFFFF",
      borderRadius: "4px",
      border: "2px solid #ddd",
      height: "auto",
      overflow: "hidden",
    }}
    headStyle={{ padding: 0 }}
  >
    <div className="relative w-full h-74 overflow-hidden">
      <iframe
        src={ubicacion}
        width="400"
        height="300"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div className="flex justify-center mt-4">
      <Button type="primary">Ver Ubicación</Button>
    </div>
  </Card>
);

export default UbicacionMap;
