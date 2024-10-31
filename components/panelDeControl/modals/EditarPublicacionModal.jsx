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
  alquileresCaracteristicas,
  diasSemana,
  trimearValores,
  obtenerTipoServicioPorTitulo,
} from "@/components/utils/ControlPublicaciones";
import ImagenControl from "./ImagenControl";
import EditRestaurantes from "./editForms/EditRestaurantes";
import EditServicios from "./editForms/EditServicios";
import EditEventoNoticiaActividad from "./editForms/EditEventoNoticiaActividad";

export default function EditarPublicacionModal({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  setSelectedItem,
  updateData,
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
  setModalIsOpenForButtonFloat,
}) {
  const [form] = Form.useForm();
  const { modificarPublicaciones, subirImagenesSupabase } =
    useContext(AdminContext);
  const [isLoading, setLoading] = useState(false);
  const [restoreVariables, setRestoreVariables] = useState(false);
  const [fileList, setFileList] = useState();
  const [textoRichText, setTextoRichText] = useState("");
  useState(false);

  const handleClose = () => {
    setRestoreVariables(true);
    setIsModalOpen(false);
    setModalIsOpenForButtonFloat(false);
    setTextoRichText('');
    form.resetFields();
    setSelectedItem(false);
  };

  const handleFecha = (inputFecha) => {
    const [dia, mes, año] = inputFecha.split("/");
    return new Date(año, mes - 1, dia);
  };

  const handleResetComplete = () => {
    setRestoreVariables(false);
  };

  const idPublicacion = obtenerIdPublicacion(selectedItem);
  const tipoSinPrefijo = obtenerTipoSinPrefijo(idPublicacion);

  function seleccionarForm(tipoDePublicacion, selectedItem) {
    const [urlGoogle, setUrlGoogle] = useState("");
    const [currentForm, setCurrentForm] = useState(tipoDePublicacion);
    console.log(tipoDePublicacion);

    switch (tipoDePublicacion) {
      case "Alquiler":
        return (
          <EditAlquileres
            alquiler={selectedItem}
            setUrlGoogle={setUrlGoogle}
            urlGoogle={urlGoogle}
            alquileresCaracteristicas={alquileresCaracteristicas}
          />
        );
      case "Restaurant":
        return (
          <EditRestaurantes
            restaurante={selectedItem}
            setUrlGoogle={setUrlGoogle}
            urlGoogle={urlGoogle}
            tiposDePago={tiposDePago}
            diasSemana={diasSemana}
          />
        );
      case "Servicio":
        return (
          <EditServicios servicio={selectedItem} diasSemana={diasSemana} />
        );

      case "EventoNoticia":
        return (
          <EditEventoNoticiaActividad
            key={restoreVariables ? 'reset' : 'default'}
            eventoNoticiaActividad={selectedItem}
            diasSemana={diasSemana}
            setCurrentForm={setCurrentForm}
            currentForm={currentForm}
            setTextoRichText={setTextoRichText}
            textoRichText={textoRichText}
          />
        );

        case "Actividad":
        return (
          <EditEventoNoticiaActividad
            key={restoreVariables ? 'reset' : 'default'}
            eventoNoticiaActividad={selectedItem}
            diasSemana={diasSemana}
            setCurrentForm={setCurrentForm}
            currentForm={currentForm}
            setTextoRichText={setTextoRichText}
            textoRichText={textoRichText}
          />
        );

      default:
        return null; // Retorna null si no coincide ningún caso
    }
  }
  const onFinish = async (formValues) => {
    setLoading(true);
    mostrarCargarToast();
    const tipoDePublicacion = obtenerTipoDePublicacion(tipoSinPrefijo);

    let processedValues = { ...formValues };

    processedValues = trimearValores(processedValues);

    if (tipoDePublicacion == "servicios") {
      processedValues.titulo_Servicio = obtenerTipoServicioPorTitulo(
        processedValues.titulo_Servicio
      );
    }

    if(tipoDePublicacion == "eventosnoticias"){
      processedValues.fecha_evento = formValues.fecha_evento
      ? handleFecha(formValues.fecha_evento)
      : null;
      processedValues.contenido = textoRichText;
    }

    if (tipoDePublicacion == "alquileres") {
      const caracteristicasSeleccionadas = alquileresCaracteristicas.reduce(
        (acc, item) => {
          acc[item.value] =
            formValues.caracteristicas?.includes(item.value) || false;
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
      if (tipoDePublicacion != "servicios") {
        if (fileList && fileList.length > 0) {
          const nuevasFotos = await subirImagenesSupabase(
            fileList,
            tipoDePublicacion,
            selectedItem.titulo
          );

          processedValues.fotos = [
            ...(selectedItem.fotos || []),
            ...nuevasFotos,
          ];
        } else {
          processedValues.fotos = selectedItem.fotos || [];
        }
      }

      await modificarPublicaciones(
        selectedItem[idPublicacion],
        processedValues,
        tipoDePublicacion
      );
      await updateData();
      mostrarExitoToast("Publicación modificada con éxito");
    } catch (e) {
      console.log(e);
      mostrarFalloToast(
        "Error al modificar la publicación, contactar programador"
      );
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
        style={{ maxWidth: "768px", top: "20px" }}
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
            {tipoSinPrefijo != "Servicio" ? (
              <Form.Item label="Subir imagenes">
                <ImagenControl
                  selectedItem={selectedItem}
                  fileList={fileList}
                  setFileList={setFileList}
                  restoreVariables={restoreVariables}
                  onReset={handleResetComplete}
                />
              </Form.Item>
            ) : null}
          </Form>
        </>
      </Modal>
    </>
  );
}
