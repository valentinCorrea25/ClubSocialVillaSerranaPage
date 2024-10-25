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
  tiposDePago,
} from "@/components/utils/ControlPublicaciones";
import ImagenControl from "./ImagenControl";
import EditRestaurantes from "./editForms/EditRestaurantes";

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

  const alquileresCaracteristicas = [
    { label: "Toallas", value: "toallas" },
    { label: "Agua Caliente", value: "agua_caliente" },
    { label: "Sabanas", value: "sabanas" },
    { label: "TV", value: "tv" },
    { label: "WIFI", value: "wifi" },
    { label: "Piscina", value: "piscina" },
    { label: "Parrilla", value: "parrilla" },
    { label: "Cocina", value: "cocina" },
    { label: "Microondas", value: "microondas" },
    { label: "Tostadora", value: "tostadora" },
    { label: "Aire Acondicionado", value: "aire_acondicionado" },
    { label: "Estufa", value: "estufa" },
    { label: "Frazadas", value: "frazadas" },
    { label: "Mascotas", value: "mascotas" },
  ];

  const diasSemana = [
    { label: "Lunes", value: "lunes" },
    { label: "Martes", value: "martes" },
    { label: "Miércoles", value: "miercoles" },
    { label: "Jueves", value: "jueves" },
    { label: "Viernes", value: "viernes" },
    { label: "Sábado", value: "sabado" },
    { label: "Domingo", value: "domingo" },
  ]; //////////////////////////////////////// PASARLOS A CONTROLPUBLICACION.js

  const idPublicacion = obtenerIdPublicacion(selectedItem);
  const tipoSinPrefijo = obtenerTipoSinPrefijo(idPublicacion);

  function seleccionarForm(tipoDePublicacion, selectedItem) {
    const [urlGoogle, setUrlGoogle] = useState("");
    console.log(tipoDePublicacion);
    

    switch (tipoDePublicacion) {
      case "Alquiler":
        return <EditAlquileres alquiler={selectedItem} setUrlGoogle={setUrlGoogle}  urlGoogle={urlGoogle} alquileresCaracteristicas={alquileresCaracteristicas}/>;
      case "Restaurant":
        return <EditRestaurantes restaurante={selectedItem} setUrlGoogle={setUrlGoogle}  urlGoogle={urlGoogle} tiposDePago={tiposDePago} diasSemana={diasSemana}/>
      default:
        return null; // Retorna null si no coincide ningún caso
    }
  }

  // const onFinish = async (values) => {
  //   setLoading(true);
  //   mostrarCargarToast();
  //   const tipoDePublicacion = obtenerTipoDePublicacion(tipoSinPrefijo);

  //   try {
  //     if (fileList && fileList.length > 0) {
  //       const nuevasFotos = await subirImagenesSupabase(
  //         fileList,
  //         tipoDePublicacion,
  //         selectedItem.titulo
  //       );

  //       values.fotos = [...(selectedItem.fotos || []), ...nuevasFotos];
  //     } else {
  //       values.fotos = selectedItem.fotos || [];
  //     }

  //     await modificarPublicaciones(
  //       selectedItem[idPublicacion],
  //       values,
  //       tipoDePublicacion
  //     );
  //     await updateData();
  //     mostrarExitoToast('Publicación modificada con éxito');
  //   } catch (e) {
  //     console.log(e);
  //     mostrarFalloToast('Error al modificar la publicación, contactar programador');
  //   } finally {
  //     setLoading(false);
  //     handleClose();
  //   }
  // };
  const onFinish = async (formValues) => { 
    setLoading(true);
    mostrarCargarToast();
    const tipoDePublicacion = obtenerTipoDePublicacion(tipoSinPrefijo);

    let processedValues = { ...formValues };

    if(tipoDePublicacion == 'alquileres'){
      const caracteristicasSeleccionadas = alquileresCaracteristicas.reduce(
        (acc, item) => {
          acc[item.value] = formValues.caracteristicas?.includes(item.value) || false;
          return acc;
        },
        {} 
      );
  
      processedValues = {
        ...processedValues,
        ...caracteristicasSeleccionadas,
      };
  
      delete processedValues.caracteristicas;
    }
    console.log(processedValues);

    try {
      if (fileList && fileList.length > 0) {
        const nuevasFotos = await subirImagenesSupabase(
          fileList,
          tipoDePublicacion,
          selectedItem.titulo
        );

        processedValues.fotos = [...(selectedItem.fotos || []), ...nuevasFotos];
      } else {
        processedValues.fotos = selectedItem.fotos || [];
      }

      await modificarPublicaciones(
        selectedItem[idPublicacion],
        processedValues,
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
        width="100%"
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
