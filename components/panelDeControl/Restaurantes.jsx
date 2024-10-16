import React, { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Upload, Image, Checkbox, Form, message } from "antd";
import BuscadorMapa from "./mapaExalmple";
import { AdminContext } from "@/context/adminContext";
import { getBase64 } from "../utils/ControlPublicaciones";
import { getCoordsGoogleMaps } from "../utils/ControlPublicaciones";
import Mapa from "./leafletjs/Mapa";

const { TextArea } = Input;

const diasSemana = [
  { label: "Lunes", value: "lunes" },
  { label: "Martes", value: "martes" },
  { label: "Miércoles", value: "miercoles" },
  { label: "Jueves", value: "jueves" },
  { label: "Viernes", value: "viernes" },
  { label: "Sábado", value: "sabado" },
  { label: "Domingo", value: "domingo" },
];

export default function NuevoRestaurante({
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
}) {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const { crearPublicacion, subirImagenesSupabase } = useContext(AdminContext);
  const [urlGoogle, setUrlGoogle] = useState("");
 

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
    try {
      mostrarCargarToast();
      const urls = await subirImagenesSupabase(
        fileList,
        "restaurant",
        values.titulo
      );
      values.fotos = urls;

      const data = await crearPublicacion(values, "restaurantes");
      if(data.code == 500){
        mostrarFalloToast(data.message);
      }else{
        mostrarExitoToast(data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="flex flex-col justify-center items-center p-1 max-w-screen-xl m-auto "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  { required: true, message: "Por favor ingresa el celular" },
                ]}
              >
                <Input className="w-full" />
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
                <Input className="w-full" />
              </Form.Item>

              <h2 className="text-2xl font-semibold text-center mt-8 mb-6">
                Ubicación
              </h2>

              <Form.Item
                label="Link de Google Maps"
                name="ubicacion"
                rules={[
                  { required: true, message: "Por favor ingresa la ubicación" },
                  {
                    validator: (_, value) => {
                      const valido = getCoordsGoogleMaps(urlGoogle);
                      if (valido) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Por favor ingresa un enlace válido de Google Maps"
                        )
                      );
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
                <Input
                  className="w-full"
                />
              </Form.Item>
              <Mapa urlGoogle={urlGoogle} />
            </div>
          </div>

        <div className="w-full px-[5%] py-[5%] my-[1%]">
          <h1 className="text-center text-2xl">Horarios</h1>
          <Form.Item name="diasSemana">
            <Checkbox.Group
              options={diasSemana}
              className="grid grid-cols-2 gap-4 p-[5%]"
            />
          </Form.Item>

          <Form.Item label="Horarios Semanal" name="horarios_semanal">
            <Input />
          </Form.Item>

          <Form.Item label="Horarios Fin de Semana" name="horarios_finde">
            <Input />
          </Form.Item>
        </div>

        <div className="w-full px-[5%] py-[5%] my-[1%]">
          <h1 className="text-center text-2xl">Redes Sociales</h1>
          <Form.Item label="Facebook" name="facebook">
            <Input />
          </Form.Item>

          <Form.Item label="Instagram" name="instagram">
            <Input />
          </Form.Item>

          <Form.Item label="Página Web" name="pagina_web">
            <Input />
          </Form.Item>
        </div>

        <div className="w-full px-[5%] py-[5%] my-[1%]">
          <h1 className="text-center text-2xl">Métodos de Pago</h1>
          <Form.Item label="Método de Pago" name="metodo_pago">
            <Input />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar y Publicar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
