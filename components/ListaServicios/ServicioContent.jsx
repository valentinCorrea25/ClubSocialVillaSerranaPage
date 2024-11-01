import React from "react";
import {
    MailOutlined,
    PhoneOutlined,
    ClockCircleOutlined,
    CalendarOutlined,
    TagOutlined,
    FileOutlined,
    UserOutlined,
  } from "@ant-design/icons";   

export default function ServicioContent({ servicio }) {
  const {
    nombre_titular,
    titulo,
    descripcion,
    mail,
    celular,
    horario,
    dia_Semana,
    titulo_Servicio,
  } = servicio;

  return (
    <>
      <div style={{ paddingBottom: "12px", borderBottom: "1px solid #f0f0f0" }}>
        <h3 style={{ fontSize: "22px", fontWeight: "bold", margin: "0" }}>
          {titulo}
        </h3>
      </div>
      <div
        className="flex flex-col justify-center"
        style={{ marginTop: "12px", color: "#595959" }}
      >
        {titulo_Servicio ? (
          <p style={{ marginBottom: "8px" }} className="flex items-center">
            <TagOutlined style={{ marginRight: "8px", color: "#09A603" }} />
            {titulo_Servicio}
          </p>
        ) : null}

        {mail ? (
          <p style={{ marginBottom: "8px" }}>
            <MailOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
            {mail}
          </p>
        ) : null}

        <p style={{ marginBottom: "8px" }}>
          <UserOutlined
            style={{ marginRight: "8px", color: "#0367A6"  }}
          />
          {nombre_titular}
        </p>
        <p style={{ marginBottom: "8px" }}>
          <PhoneOutlined style={{ marginRight: "8px", color: "#52c41a" }} />
          {celular}
        </p>


        {horario ? (
          <p style={{ marginBottom: "8px" }}>
            <ClockCircleOutlined
              style={{ marginRight: "8px", color: "#fa8c16" }}
            />
            {horario}
          </p>
        ) : null}

        {dia_Semana.length >= 1  ? (
          <p style={{ marginBottom: "8px" }}>
            <CalendarOutlined
              style={{ marginRight: "8px", color: "#eb2f96" }}
            />
            {dia_Semana.join(", ")}
          </p>
        ) : null}

        {descripcion ? (
          <p style={{ marginTop: "0px" }}>
            <FileOutlined style={{ marginRight: "8px", color: "red" }} />
            Descripcion: {descripcion}
          </p>
        ) : null}
      </div>
    </>
  );
}
