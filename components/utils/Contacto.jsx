import React from "react";
import { Card, Button, Divider } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { formatearTelefonoAUruguayo } from "@/components/utils/ControlPublicaciones";

const Contacto = ({ nombre_titular, celular, mail }) => {
  return (
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
          Contacto
        </div>
      }
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "4px",
        border: "2px solid #ddd",
        height: "100%",
        overflow: "hidden",
      }}
      headStyle={{ padding: 0 }}
    >
      <p>
        <UserOutlined style={{ marginRight: "8px" }} /> <strong>Nombre:</strong>{" "}
        {nombre_titular || "No disponible"}
      </p>
      <p>
        <PhoneOutlined style={{ marginRight: "8px" }} />{" "}
        <strong>Teléfono:</strong> {celular || "No disponible"}
      </p>
      <Divider />
      <Button
        type="primary"
        icon={<MailOutlined />}
        href={`mailto:${mail}`}
        className="w-full mb-2"
        disabled={mail ? false : true}
      >
        {mail ? "Consultar vía E-mail" : "Sin Email Disponible"}
      </Button>
      <Button
        type="primary"
        icon={<WhatsAppOutlined />}
        href={`https://wa.me/${formatearTelefonoAUruguayo(celular)}`}
        className="w-full"
        disabled={celular ? false : true}
      >
        {celular ? "Consultar vía WhatsApp" : "Sin Whatsapp Disponible"}
      </Button>
    </Card>
  );
};

export default Contacto;
