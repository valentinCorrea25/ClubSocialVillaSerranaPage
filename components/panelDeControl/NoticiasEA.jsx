import React, { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Upload, Image, Checkbox, Select, Form } from "antd";
import { getBase64 } from "../utils/ControlPublicaciones";
import { AdminContext } from "@/context/adminContext";

const { TextArea } = Input;
const { Option } = Select;

export default function Publicacion() {
  const [currentForm, setCurrentForm] = useState("eventos");
  const [esEvento, setEsEvento] = useState(false);
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

  const handleFecha = (inputFecha) => {
    const [dia, mes, año] = inputFecha.split("/");
    return new Date(año, mes - 1, dia);
  };

  const onFinish = async (values) => {
    try {
      if (currentForm == 'eventos') {
        const urls = await subirImagenesSupabase(
          fileList,
          "eventoNoticias",
          values.titulo
        );
        values.fotos = urls;
        if (values.fecha_evento) {
          values.fecha_evento = handleFecha(values.fecha_evento);
        }

        const mensaje = await crearPublicacion(values, "eventosnoticias");
        console.log(mensaje);
      } else {

        const urls = await subirImagenesSupabase(
          fileList,
          "actividades",
          values.titulo
        );
        values.fotos = urls;

        const mensaje = await crearPublicacion(values, "actividades");
        console.log(mensaje);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative">
      <Form
        onFinish={onFinish}
        className="p-5 md:p-10 rounded-lg w-full max-w-lg flex flex-col mx-auto bg-white shadow-lg"
      >
        <h1 className="text-center text-xl md:text-2xl mb-6">
          Crear nueva publicación de Actividad o Eventos y Noticias
        </h1>

        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0 md:space-x-2 max-w-screen-xl">
          <Button
            type={currentForm === "eventos" ? "primary" : "default"}
            onClick={() => setCurrentForm("eventos")}
            className="w-full md:w-1/2"
          >
            Eventos y Noticias
          </Button>
          <Button
            type={currentForm === "actividades" ? "primary" : "default"}
            onClick={() => setCurrentForm("actividades")}
            className="w-full md:w-1/2"
          >
            Actividades
          </Button>
        </div>

        {currentForm === "eventos" ? (
          <>
            <Form.Item
              label="Título"
              name="titulo"
              rules={[{ required: true }]}
            >
              <Input placeholder="Título" />
            </Form.Item>

            <Form.Item
              label="Contenido"
              name="contenido"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Checkbox
                checked={esEvento}
                onChange={(e) => setEsEvento(e.target.checked)}
              >
                ¿Es Evento?
              </Checkbox>
            </Form.Item>

            {esEvento && (
              <Form.Item
                label="Fecha Evento"
                name="fecha_evento"
                rules={[{ required: true }]}
              >
                <Input placeholder="dd/mm/aaaa" />
              </Form.Item>
            )}

            <Form.Item label="Imágenes">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
              {previewImage && (
                <Image
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>

            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit">
                Publicar
              </Button>
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              label="Título"
              name="titulo"
              rules={[{ required: true }]}
            >
              <Input placeholder="Título de la actividad" />
            </Form.Item>

            <Form.Item
              label="Contenido"
              name="contenido"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Horario"
              name="horario"
              rules={[{ required: true }]}
            >
              <Input placeholder="Horario de la actividad" />
            </Form.Item>

            <Form.Item
              label="Ubicación"
              name="ubicacion"
              rules={[{ required: true }]}
            >
              <Input placeholder="Ubicación de la actividad" />
            </Form.Item>

            <Form.Item
              label="Día de la Semana"
              name="dia_Semana"
              rules={[{ required: true }]}
            >
              <Select mode="multiple" placeholder="Seleccione los días">
                <Option value="Lunes">Lunes</Option>
                <Option value="Martes">Martes</Option>
                <Option value="Miércoles">Miércoles</Option>
                <Option value="Jueves">Jueves</Option>
                <Option value="Viernes">Viernes</Option>
                <Option value="Sábado">Sábado</Option>
                <Option value="Domingo">Domingo</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Imágenes">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
              {previewImage && (
                <Image
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>

            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit">
                Publicar Actividad
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
}
