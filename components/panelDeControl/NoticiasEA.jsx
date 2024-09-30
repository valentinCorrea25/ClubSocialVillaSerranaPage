import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Upload, Image, Checkbox, Select, Form } from "antd";

const { TextArea } = Input;
const { Option } = Select;

export default function Publicacion() {
  const [currentForm, setCurrentForm] = useState("eventos");
  const [esEvento, setEsEvento] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const onSubmit = (values) => {
    console.log(values);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-1 sm:p-4 md:p-10">
      <Form
        onFinish={onSubmit}
        className="bg-[--verde-menu-claro] p-6 md:p-10 rounded-lg shadow-md w-full max-w-lg flex flex-col"
      >
        <h1 className="text-center text-xl md:text-2xl mb-6">
          Crear nueva publicación de Actividad o Eventos y Noticias
        </h1>

        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0 md:space-x-2">
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
                name="fechaEvento"
                rules={[{ required: true }]}
              >
                <Input placeholder="dd/mm/aaaa" />
              </Form.Item>
            )}

            <Form.Item label="Imágenes">
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
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
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
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
