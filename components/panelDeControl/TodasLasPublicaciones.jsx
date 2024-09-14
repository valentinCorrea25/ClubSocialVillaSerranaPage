import React, { useState } from "react";
import { Table, Dropdown, Space } from "antd";
import useSWR, { mutate } from "swr";
import { MenuOutlined } from "@ant-design/icons";
import EditarPublicacionModal from "./modals/EditarPublicacionModal";
import { useRouter } from "next/navigation";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const router = useRouter();

  const showModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // Key for SWR
  const key = `/api/listapublicaciones?page=${page}`;
  const { data, error, isLoading } = useSWR(key, fetcher);

  // Function to handle mutate
  const updateData = async (updatedItem) => {
    // Call your API to update the item
    await fetch(`/api/updatePublicacion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });

    // Update local cache with new data
    mutate(key);
  };

  const columns = [
    {
      title: "Portada",
      dataIndex: "fotos", // Elige el campo principal que probablemente contenga los datos
      key: "portada",
      render: (text, record) => {
        const fotos = record.fotos || record.foto; // Verifica si existe 'fotos' o 'foto'
        const fotoSrc = Array.isArray(fotos) ? fotos[0] : fotos; // Si es array, usa la primera imagen
        return fotoSrc ? (
          <img src={fotoSrc} alt="Portada" style={{ width: "100px" }} />
        ) : null;
      },
    },
    {
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
      fixed: "left",
      elipsis: true,
      render: (text) => (
        <div
          style={{
            maxWidth: "200px", // Tamaño máximo ajustable
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={text} // Esto mostrará el título completo al pasar el ratón
        >
          {text}
        </div>
      ),
    },

    {
      title: "Tipo de Publicación",
      key: "tipoPublicacion",
      render: (text, record) => {
        // Busca el campo que empieza por "id_"
        const tipoPublicacion = Object.keys(record).find((key) =>
          key.startsWith("id_")
        );

        // Si se encuentra un campo, recorta el prefijo "id_" para mostrar el tipo de publicación
        return tipoPublicacion
          ? tipoPublicacion.replace("id_", "")
          : "Desconocido";
      },
    },
    {
      title: "Ubicación",
      dataIndex: "location",
      key: "location",
      render: (location) => (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${location}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver en Google Maps  

        </a>
      ),
    },
    {
      title: "Fecha de publicacion",
      dataIndex: "fecha_publicacion",
      key: "fecha_publicacion",
      render: (fechaPublicacion) => {
        const opciones = {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        return new Date(fechaPublicacion).toLocaleDateString("es-UY", opciones);
      },
    },
    {
      title: "Opciones",
      key: "options",
      render: (text, record) => {
        const items = [
          {
            label: <div onClick={() => router.push('#')}>Ver Publicacion</div>,
            key: "0",
          },
          {
            label: (
              <div onClick={() => showModal(record)}>
                Editar Publicacion
              </div>
            ),
            key: "1",
          },
          {
            type: "divider",
          },
          {
            label: "3rd menu item",
            key: "3",
          },
        ];

        return (
          <div className="flex justify-center">
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space align="center">
                  <MenuOutlined size="lg" />
                </Space>
              </a>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <>
    <div className="App">
      <Table
        style={{ padding: "20px" }}
        dataSource={data ? data.publicaciones : []}
        columns={columns}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          total: data ? data.count : 0, // Asegúrate de que totalCount es el total de registros (160)
          pageSize: 30, // Establece el tamaño de página actual
          onChange: (newPage) => {
            setPage(newPage); // Cambiar la página actual
          },
        }}
      />
    </div>
    <EditarPublicacionModal updateData={updateData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedItem={selectedItem}/>
    </>
  );
}
