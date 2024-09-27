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

export default function Alquileres() {
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
    // Convertimos las características seleccionadas en propiedades booleanas singulares
    const caracteristicasSeleccionadas = alquileresCaracteristicas.reduce(
      (acc, item) => {
        acc[item.value] = values.caracteristicas?.includes(item.value) || false;
        return acc;
      },
      {}
    );

    // Combinamos el resto de los campos del formulario con las características
    const alquilerData = {
      ...values,
      ...caracteristicasSeleccionadas,
    };

    // Eliminamos la clave 'caracteristicas' del objeto final
    delete alquilerData.caracteristicas;

    try {
      const urls = await subirImagenesSupabase(fileList, "alquiler", alquilerData.titulo);
      alquilerData.fotos = urls;
      console.log(alquilerData);
      
      const mensaje = await crearPublicacion(alquilerData, "alquileres")
      
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
        className="flex flex-col justify-center items-center p-10"
      >
        <div className="w-full flex flex-row gap-10 justify-center">
          <div className="w-full flex flex-col bg-[--verde-menu-claro] px-[5%] py-[5%]">
            <h1 className="text-center text-2xl">Informacion del Alquiler</h1>

            <Form.Item
              label="Titulo del Alquiler"
              name="titulo"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el título del alquiler",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Descripcion del alquiler"
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
                style={{ height: 250, resize: "none" }}
              />
            </Form.Item>

            <Form.Item label="Subir imagenes">
              <>
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
              </>
            </Form.Item>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex h-1/2 flex-col bg-[--verde-menu-claro] px-[5%] py-[5%]">
              <h1 className="text-center text-2xl">Informacion del Titular</h1>

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
            </div>

            <div className="flex h-1/2 flex-col bg-[--verde-menu-claro] px-[5%] py-[5%]">
              <h1 className="text-center text-2xl">Ubicacion</h1>
              <Form.Item
                label="Link de google maps"
                name="ubicacion"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el correo electrónico",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.81761411724335!2d-55.23491625521616!3d-34.37383905079616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x950aba2fb28ebfb9%3A0xbac440ceb51919e9!2sDomingo%20P%C3%A9rez%20740%2C%2030000%20Minas%2C%20Departamento%20de%20Lavalleja!5e0!3m2!1ses-419!2suy!4v1723153982223!5m2!1ses-419!2suy"
                title="map"
                style={{ border: 0, width: "100%", height: "300px" }}
              />
            </div>
          </div>
        </div>

        <div className="w-full bg-[--verde-menu-claro] px-[5%] py-[5%] my-[1%]">
          <h1 className="text-center text-2xl">Caracteristicas del Alquiler</h1>
          <Form.Item name="caracteristicas">
            <Checkbox.Group
              options={alquileresCaracteristicas}
              className="grid grid-cols-2 gap-4 p-[1%] bg-gray-100"
            />
          </Form.Item>

          <div className="flex flex-wrap gap-4 justify-center w-full">
            <Form.Item label="Camas individuales" name="camas_singles">
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item label="Camas dobles" name="camas_dobles">
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item label="Capacidad" name="capacidad">
              <InputNumber min={0} required />
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
