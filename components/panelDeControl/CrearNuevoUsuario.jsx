import React, { useContext, useState } from "react";
import { Form, Input, Button, Table, Dropdown, Space } from "antd";
import { AdminContext } from "@/context/adminContext";
import useSWR, { useSWRConfig } from "swr";
import { MenuOutlined } from "@ant-design/icons";
import EliminarUsuarioModal from "./modals/EliminarUsuarioModal";

const CrearNuevoUsuario = ({
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
}) => {
  const { crearUsuario, eliminarUsuario } = useContext(AdminContext);
  const [isModalOpenEliminar, setIsModalOpenElimininar] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const { mutate } = useSWRConfig();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const key = `/api/usuarios/lista`;
  const { data, error, isLoading } = useSWR(key, fetcher);

  function updateData() {
    mutate(key, data);
  }

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

  const onFinish = async (values) => {
    mostrarCargarToast();
    try {
      delete values.repetirContrasenia;
      const data = await crearUsuario(values);
      updateData();
      if(data.code == 500){
        mostrarFalloToast(data.message);
      }else{
        mostrarExitoToast(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const showModalEliminar = (item) => {
    setSelectedItem(item);
    setIsModalOpenElimininar(true);
  };

  return (
    <div
      className="mx-auto flex flex-col"
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      <Form name="crear_usuario" onFinish={onFinish} layout="vertical">
        <h1 className="text-center text-xl md:text-2xl pb-4">
          Crear Nuevo Usuario
        </h1>
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: "Por favor ingresa tu nombre" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="hashPass"
          rules={[
            { required: true, message: "Por favor ingresa tu contraseña" },
            {
              min: 4,
              message: "La contraseña debe tener al menos 4 caracteres",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Repetir Contraseña"
          name="repetirContrasenia"
          rules={[
            { required: true, message: "Por favor repite tu contraseña" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("hashPass") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Crear Usuario
          </Button>
        </Form.Item>
      </Form>
      <h1 className="text-center text-xl md:text-2xl pb-4 mt-4">
          Control de Usuarios
        </h1>
      <Table
        dataSource={data ? data.usuarios : []}
        columns={columns}
        loading={isLoading}
        rowKey="id"
        size="small"
        scroll={{ x: true }}
        pagination={false}
      />
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
    </div>
  );
};

export default CrearNuevoUsuario;
