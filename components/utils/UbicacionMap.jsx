import React from "react";
import { Card, Button } from "antd";
import dynamic from "next/dynamic";
import { FaGoogle } from "react-icons/fa6";

const UbicacionMap = ({ ubicacion }) => {
  const Mapa = dynamic(() => import('@/components/panelDeControl/leafletjs/Mapa'), { ssr: false });

  const handleOpenLocation = () => {
    window.open(ubicacion, '_blank');
  };

  return (
    <>
      {ubicacion && (
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
            <Mapa urlGoogle={ubicacion} />
          </div>
          <div className="flex justify-center mt-4">
            <Button type="primary" onClick={handleOpenLocation}>
              Ver Ubicación en Google Maps <FaGoogle />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default UbicacionMap;