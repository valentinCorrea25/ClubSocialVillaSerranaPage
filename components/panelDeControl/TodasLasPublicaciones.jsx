import React, { useState } from "react";
import { Table, Dropdown, Space, Input, Button } from "antd";
import useSWR, { useSWRConfig } from "swr";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import EditarPublicacionModal from "./modals/EditarPublicacionModal";
import EliminarPublicacionModal from "./modals/EliminarPublicacionModal";
import { obtenerDireccionDePublicacion } from "../utils/ControlPublicaciones";
import Search from "antd/es/input/Search";
import GenerarQRModal from "./modals/GenerarQRModal";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEliminar, setIsModalOpenElimininar] = useState(false);
  const [isModalOpenQR, setIsModalOpenQR] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [searchQuery, setSearchQuery] = useState('');

  const showModalEditar = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const showModalQR = (item) => {
    setSelectedItem(item);
    setIsModalOpenQR(true);
  };

  const showModalEliminar = (item) => {
    setSelectedItem(item);
    setIsModalOpenElimininar(true);
  };

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const key = `/api/listapublicaciones?page=${page}${searchQuery?.trim() ? `&text=${searchQuery}` : ''}`;
  const { data, error, isLoading } = useSWR(key, fetcher);

  function updateData() {
    mutate(key, data);
  }


  const columns = [
    {
      title: "Portada",
      dataIndex: "fotos",
      key: "portada",
      render: (text, record) => {
        const fotos = record.fotos || record.foto;
        const fotoSrc = Array.isArray(fotos) ? fotos[0] : fotos;
        return fotoSrc ? (
          <img src={fotoSrc} alt="Portada" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
        ) : null;
      },
    },
    {
      title: "Titulo",
      dataIndex: "titulo",
      key: "titulo",
      ellipsis: true,
      render: (titulo) => {
        const maxLength = 30;
        const truncatedTitle = titulo.length > maxLength 
          ? `${titulo.substring(0, maxLength)}...`
          : titulo;
    
        return truncatedTitle;
      }
    },    
    {
      title: "Tipo",
      key: "tipoPublicacion",
      ellipsis: true,
      render: (text, record) => {
        const tipoPublicacion = Object.keys(record).find((key) =>
          key.startsWith("id_")
        );
        return tipoPublicacion
          ? tipoPublicacion.replace("id_", "")
          : "Desconocido";
      },
    },
    {
      title: "Ubicación",
      dataIndex: "location",
      key: "location",
      ellipsis: true,
      render: (location) => (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${location}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver mapa
        </a>
      ),
    },
    {
      title: "Fecha",
      dataIndex: "fecha_publicacion",
      key: "fecha_publicacion",
      ellipsis: true,
      render: (fechaPublicacion) => {
        const opciones = {
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
      width: '10%',
      render: (text, record) => {
        const tipoPublicacion = Object.keys(record).find((key) =>
          key.startsWith("id_")
        );
        const tipoSinPrefijo = tipoPublicacion
          ? tipoPublicacion.replace("id_", "")
          : "desconocido";
        const id = record[tipoPublicacion];
  
        const items = [
          {
            label: (
              <a href={obtenerDireccionDePublicacion(tipoSinPrefijo, id)} target="_blank">
                Ver Publicación
              </a>
            ),
            key: "0",
          },
          {
            label: <div className="w-full" onClick={() => showModalQR(record)}>Generar código QR</div>,
            key: "1",
          },
          {
            label: <div className="w-full" onClick={() => showModalEditar(record)}>Editar</div>,
            key: "2",
          },
          {
            label: <div className="w-full" onClick={() => showModalEliminar(record)}>Eliminar</div>,
            key: "3",
            danger: true,
          },
        ];
  
        return (
          <div className="flex justify-center">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MenuOutlined />
              </Space>
            </a>
          </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-2 my-2">
        <Input
          type="text"
          placeholder="Buscar publicaciones..."
          value={searchQuery}
          onChange={(e) => {setSearchQuery(e.target.value);setPage(1)}}
          className="max-w-sm mb-2"
        />
        {/* <Button > 
          <SearchOutlined/> Buscar
        </Button> */}
      </div>
      <Table
        dataSource={data ? data.publicaciones : []}
        columns={columns}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          total: data ? data.count : 0,
          pageSize: 25,
          onChange: (newPage) => setPage(newPage),
        }}
        size="small"
        scroll={{ x: true }}
      />
      <EditarPublicacionModal
        updateData={updateData}
        selectedItem={selectedItem}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <EliminarPublicacionModal
        updateData={updateData}
        selectedItem={selectedItem}
        isModalOpen={isModalOpenEliminar}
        setIsModalOpen={setIsModalOpenElimininar}
      />

      <GenerarQRModal
        selectedItem={selectedItem}
        isModalOpen={isModalOpenQR}
        setIsModalOpen={setIsModalOpenQR}
      />
    </div>
  );
}