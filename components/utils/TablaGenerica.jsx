import React, { useState, useMemo, useContext } from "react";
import { Table, Dropdown, Space } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  ExportOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FormOutlined,
  MenuOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import useSWR from "swr";
import useWindowSize from "@/components/utils/useWindowSize";
import { mutate } from "swr";
import EditarPublicacionModal from "../panelDeControl/modals/EditarPublicacionModal";
import EliminarPublicacionModal from "../panelDeControl/modals/EliminarPublicacionModal";
import GenerarQRModal from "../panelDeControl/modals/GenerarQRModal";
import {
  iconosSegunTipoServicio,
  obtenerDireccionDePublicacion,
  obtenerIdPublicacion,
  obtenerTipoDePublicacion,
  tituloCorrectoServicio,
} from "./ControlPublicaciones";
import { CiMap } from "react-icons/ci";

import { AdminContext } from "@/context/adminContext";
import { useRouter } from "next/navigation";

export default function TablaGenerica({
  apiEndpoint,
  searchQuery = "",
  pageSize = 25,
  getRowKey,
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
  setModalIsOpenForButtonFloat,
  tipoDePublicacion,
}) {
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEliminar, setIsModalOpenElimininar] = useState(false);
  const [isModalOpenQR, setIsModalOpenQR] = useState(false);
  const windowSize = useWindowSize();
  const { modificarPublicaciones } = useContext(AdminContext);
  const router = useRouter();

  // Construir para las tablas URL con parámetros
  const buildUrl = () => {
    const params = new URLSearchParams({
      page: page.toString(),
      ...(searchQuery && { text: searchQuery }),
    });
    return `${apiEndpoint}?${params.toString()}`;
  };

  const key = buildUrl();

  // Fetch data
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(key, fetcher);

  function updateData() {
    mutate(key, data);
  }

  const showModalEditar = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setModalIsOpenForButtonFloat(true);
  };

  const showModalQR = (item) => {
    setSelectedItem(item);
    setIsModalOpenQR(true);
    setModalIsOpenForButtonFloat(true);
  };

  const showModalEliminar = (item) => {
    setSelectedItem(item);
    setIsModalOpenElimininar(true);
    setModalIsOpenForButtonFloat(true);
  };

  const handleDropdownClick = ({ key }, record) => {
    const tipoPublicacion = Object.keys(record).find((key) =>
      key.startsWith("id_")
    );
    const tipoSinPrefijo = tipoPublicacion
      ? tipoPublicacion.replace("id_", "")
      : "desconocido";
    const id = record[tipoPublicacion];

    switch (key) {
      case "0": // Ver Publicación
        window.open(
          obtenerDireccionDePublicacion(tipoSinPrefijo, id),
          "_blank"
        );
        break;
      case "1": // Generar QR
        showModalQR(record);
        break;
      case "2": // Editar
        showModalEditar(record);
        break;
      case "3": // Publicar/Despublicar
        handleCambiarEstado(
          record,
          obtenerTipoDePublicacion(tipoSinPrefijo),
          id
        );
        break;
      case "4": // Eliminar
        showModalEliminar(record);
        break;
      default:
        break;
    }
  };

  const getDropdownItems = (record) => [
    {
      key: "0",
      label: (
        <span className="w-full flex items-center gap-2">
          <ExportOutlined className="inline" /> Ver Publicación
        </span>
      ),
    },
    {
      key: "1",
      label: (
        <span className="w-full flex items-center gap-2">
          <QrcodeOutlined className="inline" /> Generar código QR
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span className="w-full flex items-center gap-2">
          <FormOutlined className="inline" /> Editar
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span className="w-full flex items-center gap-2">
          {record.publicado ? (
            <>
              <EyeInvisibleOutlined className="inline" /> Despublicar
            </>
          ) : (
            <>
              <EyeOutlined className="inline" /> Publicar
            </>
          )}
        </span>
      ),
    },
    {
      key: "4",
      danger: true,
      label: (
        <span className="w-full flex items-center gap-2">
          <DeleteOutlined className="inline" /> Eliminar
        </span>
      ),
    },
  ];

  const handleCambiarEstado = async (record, tipoDePublicacion, id) => {
    let resp;
    record.publicado = !record.publicado;
    mostrarCargarToast();
    try {
      resp = await modificarPublicaciones(id, record, tipoDePublicacion);
      mostrarExitoToast(
        `Publicación ${
          record.publicado ? "publicada" : "despublicada"
        } con éxito`
      );
    } catch (e) {
      console.log(e);
      mostrarFalloToast(
        "Error al modificar la publicación, contactar programador"
      );
    }
    updateData();
  };

  const columns = [
    {
      title: "Portada",
      dataIndex: "fotos",
      key: "portada",
      width: 150,
      onCell: (record) => {
        return {
          onClick: () => {
            const tipoPublicacion = Object.keys(record).find((key) =>
              key.startsWith("id_")
            );
            const tipoSinPrefijo = tipoPublicacion
              ? tipoPublicacion.replace("id_", "")
              : "desconocido";
            const id = record[tipoPublicacion];

            router.push(obtenerDireccionDePublicacion(tipoSinPrefijo, id));
          },
        };
      },
      render: (text, record) => {
        if (record.titulo_Servicio) {
          return (
            <div
              className={`flex justify-center ${
                !record.publicado ? "opacity-30" : ""
              }`}
            >
              {iconosSegunTipoServicio(record.titulo_Servicio)}
            </div>
          );
        }
        const fotos = record.fotos || record.foto;
        const fotoSrc = Array.isArray(fotos) ? fotos[0] : fotos;
        const imagenPorDefecto =
          "https://res.cloudinary.com/dvzf7szuo/image/upload/v1730236113/not-found_td14yf.png";

        return (
          <img
            src={fotoSrc || imagenPorDefecto}
            alt="Portada"
            style={{ width: "120px", height: "80px", objectFit: "cover" }}
            className={!record.publicado ? "opacity-30" : null}
          />
        );
      },
    },
    {
      title: "Informacion",
      dataIndex: "titulo",
      key: "titulo",
      ellipsis: true,
      onCell: (record) => {
        return {
          onClick: () => showModalEditar(record),
        };
      },
      render: (titulo, record) => {
        const maxLength = 90;
        const truncatedTitle =
          titulo.length > maxLength
            ? `${titulo.substring(0, maxLength)}...`
            : titulo;

        let tipoPublicacion = Object.keys(record).find((key) =>
          key.startsWith("id_")
        );
        tipoPublicacion = tipoPublicacion
          ? tipoPublicacion.replace("id_", "")
          : "Desconocido";

        return (
          <div className="flex">
            <div className="flex flex-col max-w-24">
              <div>{truncatedTitle}</div>
              <div className="font-bold">{tipoPublicacion}</div>
              {record.titulo_Servicio ? (
                <div className="font-semibold">
                  {tituloCorrectoServicio(record.titulo_Servicio)}
                </div>
              ) : null}

              {record.publicado ? (
                <div>
                  <CheckCircleOutlined /> Publicado
                </div>
              ) : (
                <div>
                  <CloseCircleOutlined /> No publicado
                </div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "Ubicación",
      dataIndex: "location",
      key: "location",
      ellipsis: true,
      width: 120,
      render: (location) => (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${location}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[--verde]"
        >
          <CiMap className="inline text-xl" /> Ver mapa
        </a>
      ),
    },
    {
      title: "Fecha de Publicacion",
      dataIndex: "fecha_publicacion",
      key: "fecha_publicacion",
      ellipsis: true,
      width: 120,
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
      width: "10%",
      render: (_, record) => (
        <div className="flex justify-center">
          <Dropdown
            menu={{
              items: getDropdownItems(record),
              onClick: (e) => handleDropdownClick(e, record),
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MenuOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      ),
    },
  ];

  const filteredColumns = useMemo(() => {
    if (windowSize.width <= 768) {
      return columns.filter((column) =>
        ["portada", "titulo", "options"].includes(column.key)
      );
    }
    if (tipoDePublicacion == "Servicio") {
      return columns.filter((column) =>
        ["portada", "titulo", "fecha_publicacion", "options"].includes(
          column.key
        )
      );
    }
    return columns;
  }, [windowSize.width, columns]);

  return (
    <>
      <Table
        dataSource={data?.publicaciones || []}
        columns={filteredColumns}
        loading={isLoading}
        rowKey={getRowKey}
        pagination={{
          current: page,
          total: data?.totalCount || 0,
          pageSize,
          onChange: (newPage) => setPage(newPage),
          showSizeChanger: false,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} de ${total} items`,
          position: ["bottomLeft"],
        }}
        size="middle"
        scroll={{ x: true }}
      />

      {selectedItem && (
        <>
          <EditarPublicacionModal
            updateData={updateData}
            selectedItem={selectedItem}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            mostrarCargarToast={mostrarCargarToast}
            mostrarExitoToast={mostrarExitoToast}
            mostrarFalloToast={mostrarFalloToast}
            setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
            setSelectedItem={setSelectedItem}
          />
          <EliminarPublicacionModal
            updateData={updateData}
            selectedItem={selectedItem}
            isModalOpen={isModalOpenEliminar}
            setIsModalOpen={setIsModalOpenElimininar}
            mostrarCargarToast={mostrarCargarToast}
            mostrarExitoToast={mostrarExitoToast}
            mostrarFalloToast={mostrarFalloToast}
            setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
          />

          <GenerarQRModal
            selectedItem={selectedItem}
            isModalOpen={isModalOpenQR}
            setIsModalOpen={setIsModalOpenQR}
            setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
          />
        </>
      )}
    </>
  );
}
