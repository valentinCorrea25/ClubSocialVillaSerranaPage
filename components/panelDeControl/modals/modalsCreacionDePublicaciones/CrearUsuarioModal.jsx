import { AdminContext } from "@/context/adminContext";
import { Button, Form, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useContext, useState } from "react";

export default function CrearUsuarioModal({
  isModalOpen,
  setIsModalOpen,
  updateData,
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
  setModalIsOpenForButtonFloat,
}) {
  const { crearUsuario } = useContext(AdminContext);
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleClose = () => {
    setIsModalOpen(false);
    setModalIsOpenForButtonFloat(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    setLoading(true);
    mostrarCargarToast();
    try {
      delete values.repetirContrasenia;
      const data = await crearUsuario(values);

      if (data.code == 500) {
        mostrarFalloToast(data.message);
      } else {
        mostrarExitoToast(data.message);
        handleClose();
        updateData();
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      className="px-20"
      title={<div className="text-center">Crear Publicacion</div>}
      open={isModalOpen}
      onCancel={handleClose}
      afterClose={handleClose}
      footer={
        <>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            className="bg-[--verde] text-white"
            loading={isLoading}
            onClick={() => form.submit()}
          >
            Guardar y Publicar
          </Button>
        </>
      }
      width="100%"
      style={{ maxWidth: "768px", top: "20px" }}
      bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <Form
        name="crear_usuario"
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >
        <h1 className="text-center text-xl md:text-2xl pb-4 ">
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
          {/* <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Crear Usuario
          </Button> */}
        </Form.Item>
      </Form>
    </Modal>
  );
}
