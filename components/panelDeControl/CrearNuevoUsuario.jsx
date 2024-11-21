import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Table, Dropdown, Space } from "antd";
import { AdminContext } from "@/context/adminContext";
import useSWR, { useSWRConfig } from "swr";
import { MenuOutlined } from "@ant-design/icons";
import EliminarUsuarioModal from "./modals/EliminarUsuarioModal";
import CrearUsuarioModal from "./modals/modalsCreacionDePublicaciones/CrearUsuarioModal";

const CrearNuevoUsuario = ({
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
  setModalIsOpenForButtonFloat,
}) => {
  const { eliminarUsuario } = useContext(AdminContext);
  const [isModalOpenEliminar, setIsModalOpenElimininar] = useState(false);
  const [isModalOpenCrear, setIsModalOpenCrear] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const { mutate } = useSWRConfig();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const key = `/api/usuarios/lista`;
  const { data, error, isLoading } = useSWR(key, fetcher, {
    revalidateOnMount: true, // Revalida siempre al montar
    revalidateOnFocus: true, // Revalida al volver a la pestaña
    cacheTime: 0,
  });

  function updateData() {
    mutate(key, data);
  }

  useEffect(() => {
    updateData();
  }, []);

  const columns = [
    {
      title: "Nombre de Usuario",
      key: "nombre",
      dataIndex: "nombre",
      ellipsis: true,
      render: (text) => {
        const maxLength = 30;
        const nombreRecortado =
          text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

        return nombreRecortado;
      },
    },
    {
      title: "Opciones",
      key: "options",
      width: "10%",
      render: (text, item) => {
        const items = [
          // {
          //   label: (
          //     <div
          //       className="w-full"
          //       onClick={() => {
          //         handleEdit();
          //       }}
          //     >
          //       Editar
          //     </div>
          //   ),
          //   key: "2",
          // },
          {
            label: (
              <div
                className="w-full"
                onClick={() => {
                  showModalEliminar(item);
                }}
              >
                Eliminar
              </div>
            ),
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

  const showModalEliminar = (item) => {
    setSelectedItem(item);
    setIsModalOpenElimininar(true);
  };

  const handleCreate = () => {
    setIsModalOpenCrear(true);
    setModalIsOpenForButtonFloat(true);
  };

  return (
    <div
      className="mx-auto flex flex-col"
      style={{ maxWidth: 450, margin: "0 auto" }}
    >
      <h1 className="text-center text-xl md:text-2xl pb-4 mt-4">
        Control de Usuarios
      </h1>
      <div className="flex flex-col">
        <div className=" w-full flex justify-end mb-2">
          <Button
            onClick={handleCreate}
            className="bg-[--verde] text-white sm:block right-0"
          >
            {" "}
            Crear Usuario{" "}
          </Button>
        </div>
        <Table
          dataSource={data ? data.usuarios : []}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          size="small"
          scroll={{ x: true }}
          pagination={false}
        />
      </div>
      <EliminarUsuarioModal
        updateData={updateData}
        selectedItem={selectedItem}
        isModalOpen={isModalOpenEliminar}
        setIsModalOpen={setIsModalOpenElimininar}
        eliminarUsuario={eliminarUsuario}
        mostrarCargarToast={mostrarCargarToast}
        mostrarExitoToast={mostrarExitoToast}
        mostrarFalloToast={mostrarFalloToast}
      />
      <CrearUsuarioModal
        mostrarCargarToast={mostrarCargarToast}
        mostrarExitoToast={mostrarExitoToast}
        mostrarFalloToast={mostrarFalloToast}
        updateData={updateData}
        isModalOpen={isModalOpenCrear}
        setIsModalOpen={setIsModalOpenCrear}
        setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
      />
    </div>
  );
};

export default CrearNuevoUsuario;
