import React, { useContext, useEffect, useState } from "react";
import { Modal, Tag } from "antd";
import {
  Button,
  Form,
  Input,
} from "antd";
import { AdminContext } from "@/context/adminContext";
const { TextArea } = Input;
import { obtenerIdPublicacion, obtenerTipoSinPrefijo, obtenerTipoDePublicacion } from '@/components/utils/ControlPublicaciones'; // Importa las funciones


export default function EditarPublicacionModal({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  updateData
}) {
  const [form] = Form.useForm(); // Crear una referencia al formulario
  const { modificarPublicaciones } = useContext(AdminContext);
  const [isLoading, setLoading] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const idPublicacion = obtenerIdPublicacion(selectedItem);
  const tipoSinPrefijo = obtenerTipoSinPrefijo(idPublicacion);

    const onFinish = async (values) => {
      setLoading(true); // Mostrar el estado de carga inmediatamente
    
      const tipoDePublicacion = obtenerTipoDePublicacion(tipoSinPrefijo);
    
      try {
        await modificarPublicaciones(selectedItem[idPublicacion], values, tipoDePublicacion);
        await updateData(); // Actualizar los datos después de modificar
      } finally {
        setLoading(false); // Detener el estado de carga, independientemente del resultado
        handleClose(); // Cerrar el modal
      }
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
        onCancel={handleClose}
        footer={
          <>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              className="bg-[--verde] text-white"
              loading={isLoading}
              onClick={() => form.submit()}
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
