import React, { useContext, useState } from "react";
import {
  Form,
  Button,
  Input,
  Upload,
  Image,
  Checkbox,
  InputNumber,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AdminContext } from "@/context/adminContext";
import dynamic from "next/dynamic";
const { TextArea } = Input;
import { extraerIdDelMensaje } from "@/components/utils/ControlPublicaciones";
import { getBase64 } from "@/components/utils/ControlPublicaciones";
import { getCoordsGoogleMaps } from "@/components/utils/ControlPublicaciones";

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

export default function CrearAlquilerModal({
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
  isModalOpen,
  setIsModalOpen,
  setModalIsOpenForButtonFloat,
}) {
  const Mapa = dynamic(
    () => import("@/components/panelDeControl/leafletjs/Mapa"),
    {
      ssr: false,
      loading: () => <div>Cargando mapa...</div>,
    }
  );
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const { crearPublicacion, subirImagenesSupabase, setUpdateData } =
    useContext(AdminContext);
  const [urlGoogle, setUrlGoogle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleClose = () => {
    // setRestoreVariables(true);
    setIsModalOpen(false);
    setModalIsOpenForButtonFloat(false);
    resetForm();
  };

  const resetForm = () => {
    form.resetFields();
    setFileList([]);
    setUrlGoogle("");
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

  const onFinish = async (values) => {
    setIsLoading(true);
    mostrarCargarToast();
    console.log(values.caracteristicas);

    const caracteristicasSeleccionadas = alquileresCaracteristicas.reduce(
      (acc, item) => {
        acc[item.value] = values.caracteristicas?.includes(item.value) || false;
        return acc;
      },
      {} // Inicializamos el acumulador como un objeto vacío por alguna razon el primero objeto se manda como label
    );

    const alquilerData = {
      ...values,
      ...caracteristicasSeleccionadas,
    };

    delete alquilerData.caracteristicas;

    try {
      const urls = await subirImagenesSupabase(
        fileList,
        "alquiler",
        alquilerData.titulo
      );
      alquilerData.fotos = urls;
      console.log(alquilerData);

      const data = await crearPublicacion(alquilerData, "alquileres");
      if (data.code == 500) {
        mostrarFalloToast(data.message);
      } else {
        handleClose();
        mostrarExitoToast(data.message);
        setUpdateData("aql");
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      title={<div className="text-center"> Crear Publicacion </div>}
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
      width="100%" // Esto ajustará el modal al 100% del ancho de la pantalla
      style={{ maxWidth: "768px", top: "20px" }}
      bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }} //
    >
      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-8">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="sm:p-6 mx-auto"
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Información del Alquiler
              </h2>

              <Form.Item
                label="Título del Alquiler"
                name="titulo"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el título del alquiler",
                  },
                ]}
              >
                <Input className="w-full" />
              </Form.Item>

              <Form.Item
                label="Descripción del alquiler"
                name="descripcion"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa una descripción",
                  },
                ]}
              >
                <TextArea
                  placeholder="Escribe una descripción"
                  showCount
                  maxLength={500}
                  className="w-full h-40 resize-none"
                />
              </Form.Item>

              <Form.Item label="Subir imágenes">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                    }}
                    src={previewImage}
                    className="hidden"
                  />
                )}
              </Form.Item>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Información del Titular
              </h2>

              <Form.Item
                label="Nombre Completo"
                name="nombre_titular"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el nombre completo",
                  },
                ]}
              >
                <Input className="w-full" />
              </Form.Item>

              <Form.Item
                label="Celular"
                name="celular"
                rules={[
                  { required: true, message: "Por favor ingresa el celular"},
                  
                ]}
              >
                <Input
                maxLength={12}
                  count={{
                    show: true,
                    max: 12,
                  }}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                label="Correo Electrónico"
                name="mail"
                
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el correo electrónico",
                    type: 'email'
                  },
                ]}
              >
                <Input className="w-full" />
              </Form.Item>

              <h2 className="text-2xl font-semibold text-center mt-8 mb-6">
                Ubicación
              </h2>

              <Form.Item
                label="Link de Google Maps"
                name="ubicacion"
                required={false}
                rules={[
                  // {
                  //   required: false,
                  //   message: "Por favor ingresa la ubicación",
                  // },
                  {
                    validator: (_, value) => {
                      const valido = getCoordsGoogleMaps(urlGoogle);
                      if (urlGoogle) {
                        if (valido) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Por favor ingresa un enlace válido de Google Maps"
                          )
                        );
                      } else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              >
                <Input
                  className="w-full"
                  onChange={(e) => {
                    setUrlGoogle(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Dirección completa"
                name="ubicacion_calles"
                rules={[
                  { required: true, message: "Por favor ingresa la direccion" },
                ]}
              >
                <Input className="w-full" />
              </Form.Item>
              <Mapa urlGoogle={urlGoogle} />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Características del Alquiler
            </h2>
            <Form.Item name="caracteristicas">
              <Checkbox.Group
                options={alquileresCaracteristicas}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-center ml-12"
              />
            </Form.Item>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <Form.Item label="Camas individuales" name="camas_singles">
                <InputNumber min={0} className="w-full" />
              </Form.Item>

              <Form.Item label="Camas dobles" name="camas_dobles">
                <InputNumber min={0} className="w-full" />
              </Form.Item>

              <Form.Item
                label="Capacidad"
                name="capacidad"
                rules={[{ required: true, message: 'Porfavor ingresar capacidad' }]}
              >
                <InputNumber min={0} className="w-full" />
              </Form.Item>
            </div>
          </div>

          {/* <Form.Item className="mt-8 text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="px-8 py-2 text-lg"
            >
              Guardar y Publicar
            </Button>
          </Form.Item> */}
        </Form>
      </div>
    </Modal>
  );
}
