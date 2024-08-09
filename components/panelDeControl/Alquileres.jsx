import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Upload, Image, Checkbox } from "antd";
const { TextArea } = Input;

const alquileresCaracteristicas = [
  {
    label: "Agua Caliente",
    value: "agua_caliente",
  },
  {
    label: "Toallas",
    value: "toallas",
  },
  {
    label: "Sabanas",
    value: "sabanas",
  },
  {
    label: "TV",
    value: "tv",
  },
  {
    label: "WIFI",
    value: "wifi",
  },
  {
    label: "Piscina",
    value: "piscina",
  },
  {
    label: "Parillero",
    value: "parillero",
  },
  {
    label: "Cocina",
    value: "cocina",
  },
  {
    label: "Microondas",
    value: "microondas",
  },
  {
    label: "Tostadora",
    value: "tostadora",
  },
  {
    label: "Aire Acondicionado",
    value: "aire_acondicionado",
  },
  {
    label: "Estufa",
    value: "estufa",
  },
  {
    label: "Frazadas",
    value: "frazadas",
  },
  {
    label: "Mascotas",
    value: "mascotas",
  },
];

export default function Alquileres() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

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
        Upload
      </div>
    </button>
  );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center p-10"
      >
        <div className="w-full flex flex-row gap-10 justify-center">

          <div className="w-full flex flex-col bg-[--verde-menu-claro] px-[5%] py-[5%]">
            <h1 className="text-center text-2xl">Informacion del Alquiler</h1>

            <div className="flex flex-col justify-start">
              <h2>Titulo del Alquiler</h2>
              <Input {...register("titulo") } />
            </div>

            <div className="flex flex-col justify-start">
              <h2>Descripcion del alquiler</h2>
              <TextArea
                placeholder="textarea with clear icon"
                showCount
                maxLength={500}
                style={{
                  height: 250,
                  resize: "none",
                }}
              />
            </div>

            <div className="flex flex-col justify-start my-5">
              <h2>Subir imagenes</h2>
              <>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
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
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex h-1/2 flex-col bg-[--verde-menu-claro] px-[5%] py-[5%]">
              <h1 className="text-center text-2xl">Informacion del Titular</h1>

              <div className="flex flex-col justify-start">
                <h2>Nombre Completo</h2>
                <Input />
              </div>

              <div className="flex flex-col justify-start">
                <h2>Celular</h2>
                <Input />
              </div>

              <div className="flex flex-col justify-start">
                <h2>Correo Electrónico</h2>
                <Input />
              </div>
            </div>

            <div className="flex h-1/2 flex-col bg-[--verde-menu-claro] px-[5%] py-[5%]">
              <h1 className="text-center text-2xl">Ubicacion</h1>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.81761411724335!2d-55.23491625521616!3d-34.37383905079616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x950aba2fb28ebfb9%3A0xbac440ceb51919e9!2sDomingo%20P%C3%A9rez%20740%2C%2030000%20Minas%2C%20Departamento%20de%20Lavalleja!5e0!3m2!1ses-419!2suy!4v1723153982223!5m2!1ses-419!2suy"></iframe>
            </div>
          </div>

        </div>

        <div className=" w-full bg-[--verde-menu-claro] px-[5%] py-[5%] my-[1%]">
          <h1 className="text-center text-2xl">Caracteristicas del Alquiler</h1>
          <Checkbox.Group
            options={alquileresCaracteristicas}
            className="grid grid-cols-2 gap-4 p-[1%] bg-gray-100"
          />
          <div className="flex flex-wrap gap-4 justify-center w-full">
              <div className="flex flex-col w-1/5">
                <h2>Camas individuales</h2>
                <Input type="number"/>
              </div>
              <div className="flex flex-col w-1/5">
                <h2>Camas dobles</h2>
                <Input type="number"/>
              </div>
              <div className="flex flex-col w-1/5">
                <h2>Capacidad</h2>
                <Input {...register("capacidad") } type="number"/>
              </div>
          </div>
        </div>
        <Button htmlType="submit" onClick={onSubmit}>Guardar</Button>
      </form>
    </>
  );
}
