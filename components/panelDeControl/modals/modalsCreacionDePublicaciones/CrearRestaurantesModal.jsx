import React, { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Upload,
  Image,
  Checkbox,
  Form,
  message,
  Modal,
  Select,
} from "antd";
import { AdminContext } from "@/context/adminContext";
import {
  diasSemana,
  getBase64,
  tiposDePago,
} from "@/components/utils/ControlPublicaciones";
import { getCoordsGoogleMaps } from "@/components/utils/ControlPublicaciones";
// import Mapa from "@/components/panelDeControl/leafletjs/Mapa";
import dynamic from "next/dynamic";

const { TextArea } = Input;

export default function CrearRestaurantesModal({
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

  const handleClose = () => {
    setIsModalOpen(false);
    setModalIsOpenForButtonFloat(false);
    resetForm();
  };

  const resetForm = () => {
    form.resetFields();
    setFileList([]);
    setUrlGoogle("");
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
        Subir
      </div>
    </button>
  );

  const onFinish = async (values) => {
    console.log(values);

    try {
      setIsLoading(true);
      mostrarCargarToast();
      const urls = await subirImagenesSupabase(
        fileList,
        "restaurant",
        values.titulo
      );
      values.fotos = urls;

      const data = await crearPublicacion(values, "restaurantes");
      if (data.code == 500) {
        mostrarFalloToast(data.message);
      } else {
        handleClose();
        mostrarExitoToast(data.message);
        setUpdateData('rest');
      }
      setIsLoading(false);
      console.log(update);
      
    } catch (e) {
      console.log(e);
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
      style={{ maxWidth: "768px", top: "20px" }} // Limita el ancho del modal para que parezca un móvil
      bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }} //
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="w-full max-w-full px-1 md:px-6"
      >
        {/* Grid principal de dos columnas */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Columna izquierda */}
          <div className="w-full">
            <div className="bg-white p-1 md:p-6">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Información del Restaurante
              </h2>

              <Form.Item
                label="Título del Restaurante"
                name="titulo"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el título del Restaurante",
                  },
                ]}
              >
                <Input className="w-full" />
              </Form.Item>

              <Form.Item
                label="Descripción del restaurante"
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

              <Form.Item label="Subir imágenes" className="mb-0">
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  maxCount={8}
                  className="w-full flex justify-center"
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="w-full">
            <div className="bg-white p-1 md:p-6">
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
                <Input />
              </Form.Item>

              <Form.Item
                label="Celular"
                name="celular"
                rules={[
                  { required: true, message: "Por favor ingresa el celular" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Correo Electrónico"
                name="mail"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el correo electrónico",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-center mb-6">
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
                        }else{
                          return Promise.resolve();
                        }
                      },
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setUrlGoogle(e.target.value);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Dirección completa"
                  name="ubicacion_calles"
                  rules={[
                    {
                      required: true,
                      message: "El campo no puede estar vacío",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <div className="w-full h-[200px] overflow-hidden">
                  <Mapa urlGoogle={urlGoogle} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secciones adicionales en tarjetas independientes */}
        <div className="mt-6 space-y-6">
          {/* Sección de Horarios */}
          <div className="bg-white p-1 md:p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Horarios
            </h2>

            <Form.Item name="diasSemana" className="mb-6 ml-12">
              <Checkbox.Group
                options={diasSemana}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item label="Horarios Semanal" name="horario_semanal">
                <Input />
              </Form.Item>

              <Form.Item label="Horarios Fin de Semana" name="horario_finde">
                <Input />
              </Form.Item>
            </div>
          </div>

          {/* Sección de Redes Sociales */}
          <div className="bg-white p-1 md:p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Redes Sociales
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Form.Item label="Facebook" name="facebook">
                <Input />
              </Form.Item>

              <Form.Item label="Instagram" name="instagram">
                <Input />
              </Form.Item>

              <Form.Item label="Página Web" name="web">
                <Input />
              </Form.Item>
            </div>
          </div>

          {/* Sección de Métodos de Pago */}
          <div className="bg-white p-1 md:p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Métodos de Pago
            </h2>

            <Form.Item label="Tipos de pago" name="tipo_pago">
              <Select
                mode="multiple"
                placeholder="Seleccione..."
                options={tiposDePago}
              ></Select>
            </Form.Item>
          </div>
        </div>
        {/* <div className="w-full flex justify-center mt-5">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Guardar y Publicar
            </Button>
          </Form.Item>
        </div> */}
      </Form>
    </Modal>
  );
}
