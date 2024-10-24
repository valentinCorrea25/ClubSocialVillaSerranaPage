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

  function seleccionarForm(tipoDePublicacion, selectedItem) {
    const [urlGoogle, setUrlGoogle] = useState("");

    switch (tipoDePublicacion) {
      case "Alquiler":
        return <EditAlquileres alquiler={selectedItem} setUrlGoogle={setUrlGoogle} urlGoogle={urlGoogle}/>;
      default:
        return null; // Retorna null si no coincide ningún caso
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
        width="100%" // Esto ajustará el modal al 100% del ancho de la pantalla
        style={{ maxWidth: "768px", top:"20px" }}
        bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }} //
      >
        {idPublicacion ? (
          <Tag className="text-lg mt-4 mx-auto">
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
            className="mx-auto"
          >
            {seleccionarForm(tipoSinPrefijo, selectedItem)}
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
