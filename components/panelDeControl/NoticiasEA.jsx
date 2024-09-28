import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Upload, Image, Checkbox, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;

export default function Publicacion() {
  const [currentForm, setCurrentForm] = useState("eventos");
  const { register, handleSubmit } = useForm();
  const [esEvento, setEsEvento] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const onSubmit = (data) => console.log(data);

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

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[--verde-menu-claro] p-10 rounded-lg shadow-md w-full max-w-lg"
      >
        <h1 className="text-center text-2xl mb-6">
          Crear nueva publicación de Actividad o Eventos y Noticias
        </h1>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            onClick={() => setCurrentForm("eventos")}
            className={`w-1/2 py-2 px-4 font-semibold ${
              currentForm === "eventos"
                ? "bg-green-400 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Eventos y Noticias
          </button>
          <button
            type="button"
            onClick={() => setCurrentForm("actividades")}
            className={`w-1/2 py-2 px-4 font-semibold ${
              currentForm === "actividades"
                ? "bg-green-400 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Actividades
          </button>
        </div>

        {currentForm === "eventos" ? (
          <>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Título</label>
              <Input {...register("titulo")} placeholder="dd/mm/aaaa" />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Contenido</label>
              <TextArea {...register("contenido")} rows={4} />
            </div>

            <div className="flex items-center mb-4">
              <label className="block font-semibold mr-2">¿Es Evento?</label>
              <Checkbox
                checked={esEvento}
                onChange={(e) => setEsEvento(e.target.checked)}
              />
            </div>

            {esEvento && (
              <div className="mb-4">
                <label className="block font-semibold mb-1">Fecha Evento</label>
                <Input {...register("fechaEvento")} placeholder="dd/mm/aaaa" />
              </div>
            )}

            <div className="mb-4">
              <label className="block font-semibold mb-1">Picture</label>
              <>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  Imagen
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
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
            </div>

            <div className="text-center">
              <Button type="primary" htmlType="submit" onClick={onSubmit}>
                Publicar
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Título</label>
              <Input {...register("titulo")} placeholder="Título de la actividad" />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Contenido</label>
              <TextArea {...register("contenido")} rows={4} />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Horario</label>
              <Input {...register("horario")} placeholder="Horario de la actividad" />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Ubicación</label>
              <Input {...register("ubicacion")} placeholder="Ubicación de la actividad" />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Día de la Semana</label>
              <Select
                mode="multiple"
                placeholder="Seleccione los días"
                {...register("dia_Semana")}
                className="w-full"
              >
                <Option value="Lunes">Lunes</Option>
                <Option value="Martes">Martes</Option>
                <Option value="Miércoles">Miércoles</Option>
                <Option value="Jueves">Jueves</Option>
                <Option value="Viernes">Viernes</Option>
                <Option value="Sábado">Sábado</Option>
                <Option value="Domingo">Domingo</Option>
              </Select>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Fotos</label>
              <>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  Imagen
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
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
            </div>

            <div className="text-center">
              <Button type="primary" htmlType="submit" onClick={onSubmit}>
                Publicar Actividad
              </Button>
            </div>
          </>
        )}
      </form>

    </div>
  );
}