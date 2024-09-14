import React, { useContext, useEffect } from "react";
import { Modal, Tag } from "antd";
import {
  Button,
  Form,
  Input,
} from "antd";
import { AdminContext } from "@/context/adminContext";
const { TextArea } = Input;

export default function EditarPublicacionModal({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  updateData
}) {
  const [form] = Form.useForm(); // Crear una referencia al formulario
  const { modificarPublicaciones } = useContext(AdminContext);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const idPublicacion = selectedItem
    ? Object.keys(selectedItem).find((key) => key.startsWith("id_"))
    : null;

  const tipoSinPrefijo = idPublicacion
    ? idPublicacion.replace("id_", "")
    : "Tipo Desconocido";

  const onFinish = (values) => {
    let tipoDePublicacion = '';

    switch (tipoSinPrefijo.toLowerCase()) {
        case 'restaurant':
        tipoDePublicacion = 'restaurantes';
        break;
        case 'alquiler':
        tipoDePublicacion = 'alquileres';
        break;
        case 'servicio':
        tipoDePublicacion = 'servicios';
        break;
        case 'eventonoticia':
        tipoDePublicacion = 'eventosnoticias';
        break;
        case 'actividad':
        tipoDePublicacion = 'actividades';
        break;
        default:
        tipoDePublicacion = 'desconocido';
    }

    modificarPublicaciones(selectedItem[idPublicacion], values, tipoDePublicacion);
    console.log("Success:", values);
    updateData();
    handleClose();
  };

  // Setear valores iniciales cuando se abre el modal o cambia selectedItem
  useEffect(() => {
    if (selectedItem) {
      form.setFieldsValue({
        titulo: selectedItem.titulo,
        descripcion: selectedItem.descripcion,
      });
    }
  }, [selectedItem, form]);

  return (
    <>
      <Modal
        title={<div className="text-center"> Modificar Publicacion </div>}
        open={isModalOpen}
        footer={
          <>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              className="bg-[--verde] text-white"
              onClick={() => form.submit()} // Disparar el envío del formulario
            >
              Guardar
            </Button>
          </>
        }
      >
        {idPublicacion ? (
          <Tag className="text-lg mb-4">
            {`${tipoSinPrefijo} ID: ${selectedItem[idPublicacion]}`}
          </Tag>
        ) : (
          "ID no disponible"
        )}
        <>
          <Form
            form={form} // Conectar el formulario con la referencia
            onFinish={onFinish}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              maxWidth: 600,
            }}
          >
            <h1 className="font-semibold">Informacion de Restaurante</h1>
            <Form.Item
              label="Titulo"
              name="titulo"
              rules={[
                { required: true, message: "Por favor ingrese el título" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Descripcion"
              name="descripcion"
              rules={[
                { required: true, message: "Por favor ingrese la descripción" },
              ]}
            >
              <TextArea maxLength={250} className=" ml-2 max-h-44" />
            </Form.Item>
          </Form>
        </>
      </Modal>
    </>
  );
}
