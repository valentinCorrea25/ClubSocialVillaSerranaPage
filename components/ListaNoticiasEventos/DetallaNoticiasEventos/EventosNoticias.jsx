import { Card } from "antd";
import {
  EnvironmentOutlined,
  FileTextOutlined,
  CalendarOutlined,
  TagOutlined,
  ClockCircleFilled,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Tag, Button } from "antd";
import { dateFormat } from "@/components/utils/ControlPublicaciones";
import dayjs from "dayjs";

export function Eventosnoticias({ eventosnoticias }) {
  const { fecha_publicacion, fecha_evento } = eventosnoticias;
  const fechaEventoDate = fecha_evento;
  const fechaCorte = new Date("12/31/1969");

  // Lógica para mostrar "Noticias" o "Eventos"
  const categoriaLabel = fechaEventoDate > fechaCorte ? "Noticias" : "Eventos";
  const fechaevento =
    fechaEventoDate > fechaCorte
      ? ""
      : "Fecha del Evento: " + dayjs(fecha_evento).format(dateFormat);
  return (
    <Card
      bordered={false}
      style={{ width: "100%", backgroundColor: "#FFFFFF", padding: "24px" }}
    >
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">
        {eventosnoticias?.titulo || "Título no disponible"}
      </h2>

      <div className="flex flex-col mb-4 text-blue-600">
        <p className="mb-1">
          <TagOutlined style={{ marginRight: 8 }} />
          {categoriaLabel}
        </p>
        
        {fechaevento ? (
          <p className="mb-1">
            <ClockCircleOutlined style={{ marginRight: 8 }} />
            <span>{fechaevento}</span>
          </p>
        ) : null}

        <p className="mb-1">
          <CalendarOutlined style={{ marginRight: 8 }} />
          <span>
            Fecha de publicacion{" "}
            {new Date(eventosnoticias?.fecha_publicacion).toLocaleDateString(
              "es-ES"
            ) || "Fecha no disponible"}
          </span>
        </p>

        {eventosnoticias?.ubicacion ? (
          <p className="mb-1">
            <EnvironmentOutlined className="" style={{ marginRight: 8 }} />
            <span>{eventosnoticias?.ubicacion}</span>
          </p>
        ) : null}

        {/* Description */}
        <div className="text-gray-800">
          <p
            dangerouslySetInnerHTML={{
              __html: eventosnoticias?.contenido || "Descripción no disponible",
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export function UbicacionMap({ ubicacion }) {
  // Condición para aplicar el estilo de "display: none"
  const shouldHide = ubicacion?.fecha_evento > new Date("12/31/1969");

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
          Ubicación
        </div>
      }
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "4px",
        border: "2px solid #ddd",
        height: "auto",
        overflow: "hidden",
        display: shouldHide ? "none" : "block", // Si la condición se cumple, no se muestra
      }}
      headStyle={{ padding: 0 }}
    >
      <div className="relative w-full h-74 overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d411.90252397605764!2d-54.988653092532836!3d-34.31941135762975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x950ac5ca3874096d%3A0x16635488f0b1fd1a!2sAutoservice%20MILI!5e0!3m2!1ses-419!2suy!4v1725657243813!5m2!1ses-419!2suy"
          width="400"
          height="300"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="flex justify-center mt-4">
        <Button type="primary">Ver Ubicación</Button>
      </div>
    </Card>
  );
}
