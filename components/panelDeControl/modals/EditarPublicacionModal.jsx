import React, { useContext, useEffect, useState } from "react";
import { Modal, Tag } from "antd";
import { Button, Form, Input } from "antd";
import { AdminContext } from "@/context/adminContext";
import EditAlquileres from "./editForms/EditAlquileres";
const { TextArea } = Input;
import {
  obtenerIdPublicacion,
  obtenerTipoSinPrefijo,
  obtenerTipoDePublicacion,
} from "@/components/utils/ControlPublicaciones";
import ImagenControl from "./ImagenControl";

export default function EditarPublicacionModal({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  updateData,
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
  setModalIsOpenForButtonFloat
}) {
  const [form] = Form.useForm();
  const { modificarPublicaciones, subirImagenesSupabase } =
    useContext(AdminContext);
  const [isLoading, setLoading] = useState(false);
  const [restoreVariables, setRestoreVariables] = useState(false);
  const [fileList, setFileList] = useState();
  useState(false);

  const handleClose = () => {
    setRestoreVariables(true);
    setIsModalOpen(false);
    setModalIsOpenForButtonFloat(false);
  };

  const handleResetComplete = () => {
    setRestoreVariables(false);
  };

  const idPublicacion = obtenerIdPublicacion(selectedItem);
  const tipoSinPrefijo = obtenerTipoSinPrefijo(idPublicacion);

  function seleccionarForm(tipoDePublicacion){
    switch(tipoDePublicacion){
      case "Alquiler": 
      break;
    }
  }

  const onFinish = async (values) => {
    setLoading(true);
    mostrarCargarToast();

    const tipoDePublicacion = obtenerTipoDePublicacion(tipoSinPrefijo);

    try {
      if (fileList && fileList.length > 0) {
        const nuevasFotos = await subirImagenesSupabase(
          fileList,
          tipoDePublicacion,
          selectedItem.titulo
        );

        values.fotos = [...(selectedItem.fotos || []), ...nuevasFotos];
      } else {
        values.fotos = selectedItem.fotos || [];
      }

      await modificarPublicaciones(
        selectedItem[idPublicacion],
        values,
        tipoDePublicacion
      );
      await updateData();
      mostrarExitoToast('Publicación modificada con éxito');
    } catch (e) {
      console.log(e);
      mostrarFalloToast('Error al modificar la publicación, contactar programador');
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  

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
        afterClose={handleClose}
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
            form={form}
            onFinish={onFinish}
            labelCol={{
              span: 20,
            }}
            layout="vertical"
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
              <TextArea maxLength={250} className="max-h-44" />
            </Form.Item>
            <Form.Item label="Subir imagenes">
              <ImagenControl
                selectedItem={selectedItem}
                fileList={fileList}
                setFileList={setFileList}
                restoreVariables={restoreVariables}
                onReset={handleResetComplete}
              />
            </Form.Item>
          </Form>
        </>
      </Modal>
    </>
  );
}
