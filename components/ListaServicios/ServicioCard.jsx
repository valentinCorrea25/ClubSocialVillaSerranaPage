import React, { useState } from "react";
import { Button, Card, Modal } from "antd";
import ServicioContent from "./ServicioContent";

const ServicioCard = ({ servicio }) => {
  // Estado para controlar el modal
  const [visible, setVisible] = useState(false);

  // Funciones para abrir y cerrar el modal
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Card
        hoverable
        className="sm:h-[420px] sm:p-5 md:max-w-[500px] max-w-80"
        style={{
          height: "420px",
          margin: "0 auto",
          marginBottom: "24px",
          borderRadius: "8px",
          boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
          backgroundColor: "#FFFFFF",
          border: "2px solid #09A603",
        }}
        onClick={showModal}
      >
        <ServicioContent servicio={servicio} />
      </Card>

      <Modal
        // title={
        //   <h2 style={{ fontSize: "26px", marginLeft: "20px" }}>{servicio.titulo}</h2>
        // }
        visible={visible}
        onCancel={handleCancel}
        footer={
          <a href="tel:555-555-5555" className="flex justify-center">
            <Button size="large" className="bg-[--verde] text-white">Llamar</Button>
          </a>
        }
        width={600}
        bodyStyle={{ fontSize: "20px", padding: "24px" }}
      >
        <ServicioContent servicio={servicio} />
      </Modal>
    </>
  );
};

export default ServicioCard;
