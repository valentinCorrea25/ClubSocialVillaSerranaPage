import React, { useContext, useState } from "react";
import {
  Form,
  Button,
  Input,
  Upload,
  Image,
  Checkbox,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AdminContext } from "@/context/adminContext";
const { TextArea } = Input;
import { extraerIdDelMensaje } from "../utils/ControlPublicaciones";
import { getBase64 } from "../utils/ControlPublicaciones";

const alquileresCaracteristicas = [
  { label: "Agua Caliente", value: "agua_caliente" },
  { label: "Toallas", value: "toallas" },
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

export default function Alquileres({
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
}) {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const { crearPublicacion, subirImagenesSupabase } = useContext(AdminContext);

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

  const onFinish = async (values) => {
    mostrarCargarToast();
    const caracteristicasSeleccionadas = alquileresCaracteristicas.reduce(
      (acc, item) => {
        acc[item.value] = values.caracteristicas?.includes(item.value) || false;
        return acc;
      },
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
      if(data.code == 500){
        mostrarFalloToast(data.message);
      }else{
        mostrarExitoToast(data.message);
      }
    } catch (e) {
      
      console.error(e);
    }
  };

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Información del Alquiler</h2>

            <Form.Item
              label="Título del Alquiler"
              name="titulo"
              rules={[{ required: true, message: "Por favor ingresa el título del alquiler" }]}
            >
              <Input className="w-full" />
            </Form.Item>

            <Form.Item
              label="Descripción del alquiler"
              name="descripcion"
              rules={[{ required: true, message: "Por favor ingresa una descripción" }]}
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
            <h2 className="text-2xl font-semibold text-center mb-6">Información del Titular</h2>

            <Form.Item
              label="Nombre Completo"
              name="nombre_titular"
              rules={[{ required: true, message: "Por favor ingresa el nombre completo" }]}
            >
              <Input className="w-full" />
            </Form.Item>

            <Form.Item
              label="Celular"
              name="celular"
              rules={[{ required: true, message: "Por favor ingresa el celular" }]}
            >
              <Input className="w-full" />
            </Form.Item>

            <Form.Item
              label="Correo Electrónico"
              name="mail"
              rules={[{ required: true, message: "Por favor ingresa el correo electrónico" }]}
            >
              <Input className="w-full" />
            </Form.Item>

            <h2 className="text-2xl font-semibold text-center mt-8 mb-6">Ubicación</h2>

            <Form.Item
              label="Link de Google Maps"
              name="ubicacion"
              rules={[{ required: true, message: "Por favor ingresa la ubicación" }]}
            >
              <Input className="w-full" />
            </Form.Item>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.81761411724335!2d-55.23491625521616!3d-34.37383905079616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x950aba2fb28ebfb9%3A0xbac440ceb51919e9!2sDomingo%20P%C3%A9rez%20740%2C%2030000%20Minas%2C%20Departamento%20de%20Lavalleja!5e0!3m2!1ses-419!2suy!4v1723153982223!5m2!1ses-419!2suy"
              title="map"
              className="w-full h-48 rounded-lg"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Características del Alquiler</h2>
          <Form.Item name="caracteristicas">
            <Checkbox.Group
              options={alquileresCaracteristicas}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            />
          </Form.Item>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <Form.Item label="Camas individuales" name="camas_singles">
              <InputNumber min={0} className="w-full" />
            </Form.Item>

            <Form.Item label="Camas dobles" name="camas_dobles">
              <InputNumber min={0} className="w-full" />
            </Form.Item>

            <Form.Item label="Capacidad" name="capacidad" rules={[{ required: true }]}>
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>
        </div>

        <Form.Item className="mt-8 text-center">
          <Button type="primary" htmlType="submit" className="px-8 py-2 text-lg">
            Guardar y Publicar
          </Button>
        </Form.Item>
      </Form>
    </div>
    </>
  );
  
}