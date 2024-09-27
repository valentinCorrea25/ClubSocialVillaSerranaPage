import React, { useContext, useEffect, useState } from "react";
import { Image, Modal, Tag, Upload } from "antd";
import { Button, Form, Input } from "antd";
import { AdminContext } from "@/context/adminContext";
import { getBase64 } from "@/components/utils/ControlPublicaciones";
const { TextArea } = Input;
import {
  obtenerIdPublicacion,
  obtenerTipoSinPrefijo,
  obtenerTipoDePublicacion,
} from "@/components/utils/ControlPublicaciones"; // Importa las funciones
import {
  PlusOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { FaTrash } from "react-icons/fa6";

export default function EditarPublicacionModal({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  updateData,
}) {
  const [form] = Form.useForm(); // Crear una referencia al formulario
  const {
    modificarPublicaciones,
    eliminarImagenesSupabase,
    subirImagenesSupabase,
  } = useContext(AdminContext);
  const [isLoading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [fileList, setFileList] = useState();
  const [isModalOpenEliminarImagen, setIsModalOpenEliminarImagen] =
    useState(false);
  const [imageToDelete, setImageToDelete] = useState();

  const [previewImageSaved, setPreviewImageSave] = useState(true);

  const toolbarRenderInfo = {
    // Cambiar esto de archivo
    icons: {
      flipYIcon: <Button>Flip Y</Button>,
      flipXIcon: <Button>Flip X</Button>,
      rotateLeftIcon: <RotateLeftOutlined />,
      rotateRightIcon: <RotateRightOutlined />,
      zoomOutIcon: <ZoomOutOutlined />,
      zoomInIcon: <ZoomInOutlined />,
      trashIcon: <FaTrash />,
    },
    actions: {
      onFlipY: () => console.log("Flip Y"),
      onFlipX: () => console.log("Flip X"),
      onRotateLeft: () => console.log("Rotate Left"),
      onRotateRight: () => console.log("Rotate Right"),
      onZoomOut: () => console.log("Zoom Out"),
      onZoomIn: () => console.log("Zoom In"),
      onReset: () => console.log("Reset"),
      onClose: () => console.log("Close"),
    },
    transform: {
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    },
    current: 0,
    image: {
      src: "image-url",
      alt: "Image description",
    },
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const idPublicacion = obtenerIdPublicacion(selectedItem);
  const tipoSinPrefijo = obtenerTipoSinPrefijo(idPublicacion);

  const onFinish = async (values) => {
    setLoading(true); // Mostrar el estado de carga inmediatamente

    const tipoDePublicacion = obtenerTipoDePublicacion(tipoSinPrefijo);

    try {
      if (fileList && fileList.length > 0) {
        const nuevasFotos = await subirImagenesSupabase(
          fileList,
          tipoDePublicacion,
          selectedItem.titulo
        );
        console.log(nuevasFotos);

        values.fotos = [...selectedItem.fotos, ...nuevasFotos];
      }
      console.log(values);

      await modificarPublicaciones(
        selectedItem[idPublicacion],
        values,
        tipoDePublicacion
      );
      await updateData(); // Actualizar los datos después de modificar
    } catch (e) {
      console.log(e); /// <--- EMPEZAR DESDE ACAA <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    } finally {
      setLoading(false); // Detener el estado de carga, independientemente del resultado
      handleClose(); // Cerrar el modal
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleDeleteImage = (imageSrc) => {
    setImageToDelete(imageSrc);
    setPreviewImageSave(false); // Close the preview
    setIsModalOpenEliminarImagen(true); // Open the delete confirmation modal
  };

  const confirmDeleteImage = () => {
    if (imageToDelete) {
      selectedItem.fotos = selectedItem.fotos.filter(
        (file) => file !== imageToDelete
      );
      eliminarImagenesSupabase(imageToDelete);
      // setFileList(newFileList);
      setImageToDelete(null);
    }
    setIsModalOpenEliminarImagen(false);
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
            form={form} // Conectar el formulario con la referencia // Cada formulario debe ser distinto
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
              <div className="flex">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList && fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
                <div className="flex ml-10 flex-wrap gap-1">
                  {selectedItem.fotos &&
                    selectedItem.fotos.map((item) => {
                      return (
                        <Image
                          className="max-w-28 max-h-20"
                          preview={
                            previewImageSaved
                              ? {
                                  toolbarRender: (_, actions) => (
                                    <Button
                                      icon={toolbarRenderInfo.icons.trashIcon}
                                      onClick={() => {
                                        setIsModalOpenEliminarImagen(true);
                                        handleDeleteImage(item);
                                      }}
                                    />
                                  ),
                                }
                              : false
                          }
                          key={item}
                          src={item}
                          alt={selectedItem.titulo}
                        />
                      );
                    })}
                </div>
              </div>
            </Form.Item>
          </Form>
        </>
      </Modal>
      <Modal
        title="Confirmar eliminación"
        open={isModalOpenEliminarImagen}
        onCancel={() => setIsModalOpenEliminarImagen(false)}
        onOk={confirmDeleteImage}
        afterClose={() => setPreviewImageSave(true)}
      >
        <p>¿Está seguro de que desea eliminar esta imagen?</p>
      </Modal>
    </>
  );
}
