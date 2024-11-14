import React from "react";
import { Card, Tag } from "antd";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

export function Actividad({ actividad }) {
  const hasContent = (value) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value && value !== "" && value !== "undefined";
  };

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString("es-ES");
    } catch (error) {
      return null;
    }
  };

  return (
    <Card
      bordered={false}
      style={{ width: "100%", backgroundColor: "#FFFFFF", padding: "24px" }}
    >
      {hasContent(actividad?.titulo) && (
        <h2 className="text-2xl font-bold mb-2">{actividad.titulo}</h2>
      )}

      <div className="flex flex-col mb-4 text-blue-600">
        {hasContent(actividad?.fecha_publicacion) && (
          <p className="mb-1">
            <InfoCircleOutlined style={{ marginRight: 8 }} />
            <span>
              Fecha de publicación {formatDate(actividad.fecha_publicacion)}
            </span>
          </p>
        )}

        {hasContent(actividad?.dia_Semana) && (
          <p className="mb-1">
            <CalendarOutlined style={{ marginRight: 8 }} />
            {actividad.dia_Semana.map((dia, index) => (
              <Tag key={index} style={{ marginRight: "4px" }}>
                {dia}
              </Tag>
            ))}
          </p>
        )}

        {hasContent(actividad?.horario) && (
          <p className="mb-1">
            <ClockCircleOutlined style={{ marginRight: 8 }} />
            {actividad.horario}
          </p>
        )}

        {hasContent(actividad?.ubicacion) && (
          <p className="mb-1">
            <EnvironmentOutlined style={{ marginRight: 8 }} />
            <span>{actividad.ubicacion}</span>
          </p>
        )}
      </div>

      {hasContent(actividad?.contenido) && (
        <div className="text-gray-800">
          <p
            dangerouslySetInnerHTML={{
              __html: actividad.contenido,
            }}
          />
        </div>
      )}
    </Card>
  );
}

export default Actividad;