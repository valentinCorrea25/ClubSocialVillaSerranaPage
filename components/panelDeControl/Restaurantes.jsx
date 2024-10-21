import React, { useMemo, useState } from "react";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import TablaGenerica from "../utils/TablaGenerica";

export default function Restaurantes({
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
  setModalIsOpenForButtonFloat,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();


  // Definir las columnas
  // const columns = useMemo(() => [
  //   {
  //     title: "Portada",
  //     dataIndex: "fotos",
  //     key: "portada",
  //     mobileVisible: true,
  //     render: (text, record) => {
  //       const fotos = record.fotos || record.foto;
  //       const fotoSrc = Array.isArray(fotos) ? fotos[0] : fotos;
  //       return fotoSrc ? (
  //         <img
  //           src={fotoSrc}
  //           alt="Portada"
  //           style={{ width: "60px", height: "60px", objectFit: "cover" }}
  //         />
  //       ) : null;
  //     },
  //     onCellClick: (record) => {
  //       const tipoPublicacion = Object.keys(record).find((key) =>
  //         key.startsWith("id_")
  //       );
  //       const tipoSinPrefijo = tipoPublicacion
  //         ? tipoPublicacion.replace("id_", "")
  //         : "desconocido";
  //       const id = record[tipoPublicacion];
  //       router.push(obtenerDireccionDePublicacion(tipoSinPrefijo, id));
  //     },
  //   },
  //   {
  //     title: "Información",
  //     dataIndex: "titulo",
  //     key: "titulo",
  //     mobileVisible: true,
  //     ellipsis: true,
  //     render: (titulo, record) => {
  //       const maxLength = 30;
  //       const truncatedTitle =
  //         titulo.length > maxLength
  //           ? `${titulo.substring(0, maxLength)}...`
  //           : titulo;

  //       let tipoPublicacion = Object.keys(record).find((key) =>
  //         key.startsWith("id_")
  //       );
  //       tipoPublicacion = tipoPublicacion
  //         ? tipoPublicacion.replace("id_", "")
  //         : "Desconocido";

  //       return (
  //         <div className="flex flex-col max-w-24">
  //           <div>{truncatedTitle}</div>
  //           <div className="font-bold">{tipoPublicacion}</div>
  //         </div>
  //       );
  //     },
  //     onCellClick: (record, { showModal }) => showModal("EditarPublicacionModal", record),
  //   },
  //   {
  //     title: "Ubicación",
  //     dataIndex: "location",
  //     key: "location",
  //     ellipsis: true,
  //     render: (location) => (
  //       <a
  //         href={`https://www.google.com/maps/search/?api=1&query=${location}`}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Ver mapa
  //       </a>
  //     ),
  //   },
  //   {
  //     title: "Fecha",
  //     dataIndex: "fecha_publicacion",
  //     key: "fecha_publicacion",
  //     ellipsis: true,
  //     render: (fechaPublicacion) => {
  //       const opciones = {
  //         year: "numeric",
  //         month: "short",
  //         day: "numeric",
  //       };
  //       return new Date(fechaPublicacion).toLocaleDateString("es-UY", opciones);
  //     },
  //   },
  // ], [router]);

  return (
    <div>
      <div className="flex space-x-2 my-2">
        <Input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm mb-2"
        />
      </div>

      <TablaGenerica
        apiEndpoint="/api/restaurantes/lista"
        // columns={columns}
        // menuItems={getMenuItems}
        searchQuery={searchQuery}
        mostrarCargarToast={mostrarCargarToast}
        mostrarExitoToast={mostrarExitoToast}
        mostrarFalloToast={mostrarFalloToast}
        setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
        getRowKey={(record) => {
          const tipoPublicacion = Object.keys(record).find((key) =>
            key.startsWith("id_")
          );
          return `${record[tipoPublicacion]}_${tipoPublicacion}`;
        }}
      />
    </div>
  );
}