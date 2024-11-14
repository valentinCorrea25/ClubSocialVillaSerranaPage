import React, { useState } from "react";
import { Button, Card, Modal } from "antd";
import ServicioContent from "./ServicioContent";
import { formatearTelefonoAUruguayo } from "../utils/ControlPublicaciones";
import { FaWhatsapp } from "react-icons/fa";
import ModalServicio from "./ModalServicio";

const ServicioCard = ({ servicio }) => {
  const [visible, setVisible] = useState(false);

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
          height: "390px",
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
      <ModalServicio  isOpen={visible} handleCancel={handleCancel} servicio={servicio} />
    </>
  );
};

export default ServicioCard;