import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Upload, Image, Checkbox, Form } from "antd";
import BuscadorMapa from "./mapaExalmple";

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

export default function NuevoRestaurante() {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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

  const onFinish = (values) => {
    console.log("Submitted values:", values);
  };

  return (
    <Form
  form={form}
  layout="vertical"
  onFinish={onFinish}
  className="flex flex-col justify-center items-center p-1 sm:p-4 md:p-10 max-w-screen-xl m-auto"
>
  <div className="w-full flex flex-col lg:flex-row gap-10 justify-center">
    <div className="w-full lg:w-1/2 flex flex-col bg-[--verde-menu-claro] px-[5%] py-[5%]">
      <h1 className="text-center text-2xl">Información del Restaurante</h1>

      <Form.Item
        label="Nombre"
        name="nombre"
        rules={[{ required: true, message: "Por favor ingresa el nombre" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Descripción" name="descripcion">
        <TextArea
          placeholder="Descripción del restaurante"
          showCount
          maxLength={500}
          style={{ height: 250, resize: "none" }}
        />
      </Form.Item>

      <Form.Item label="Subir imagen">
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
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </Form.Item>
    </div>

    <div className="w-full lg:w-1/2 flex flex-col gap-4">
      <div className="flex flex-col bg-[--verde-menu-claro] px-[5%] py-[5%]">
        <h1 className="text-center text-2xl">Información del Titular</h1>

        <Form.Item
          label="Nombre Completo"
          name="nombre_titular"
          rules={[{ required: true, message: "Por favor ingresa el nombre completo" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Celular"
          name="celular"
          rules={[{ required: true, message: "Por favor ingresa el celular" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Correo Electrónico"
          name="correo"
          rules={[{ required: true, message: "Por favor ingresa el correo electrónico" }]}
        >
          <Input />
        </Form.Item>
      </div>

      <div className="flex flex-col bg-[--verde-menu-claro] px-[5%] py-[5%]">
        <h1 className="text-center text-2xl">Ubicación</h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.81761411724335!2d-55.23491625521616!3d-34.37383905079616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x950aba2fb28ebfb9%3A0xbac440ceb51919e9!2sDomingo%20P%C3%A9rez%20740%2C%2030000%20Minas%2C%20Departamento%20de%20Lavalleja!5e0!3m2!1ses-419!2suy!4v1723153982223!5m2!1ses-419!2suy"
          title="map"
          style={{ border: 0, width: "100%", height: "300px" }}
        />
      </div>
    </div>
  </div>

  <div className="w-full bg-[--verde-menu-claro] px-[5%] py-[5%] my-[1%]">
    <h1 className="text-center text-2xl">Horarios</h1>
    <Form.Item name="diasSemana">
      <Checkbox.Group
        options={diasSemana}
        className="grid grid-cols-2 gap-4 p-[5%] bg-gray-100"
      />
    </Form.Item>

    <Form.Item label="Horarios Semanal" name="horarios_semanal">
      <Input />
    </Form.Item>

    <Form.Item label="Horarios Fin de Semana" name="horarios_finde">
      <Input />
    </Form.Item>
  </div>

  <div className="w-full bg-[--verde-menu-claro] px-[5%] py-[5%] my-[1%]">
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

  <div className="w-full bg-[--verde-menu-claro] px-[5%] py-[5%] my-[1%]">
    <h1 className="text-center text-2xl">Métodos de Pago</h1>
    <Form.Item label="Método de Pago" name="metodo_pago">
      <Input />
    </Form.Item>
  </div>

  <Form.Item>
    <Button type="primary" htmlType="submit">
      Ingresar
    </Button>
  </Form.Item>
</Form>

  );
}
