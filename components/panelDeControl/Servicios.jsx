import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox, Button, Input, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;

export default function CrearServicio() {
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [todaLaSemanaSeleccionado, setTodaLaSemanaSeleccionado] = useState(false);
  const { register, handleSubmit } = useForm();
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

  const opcionesDias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const manejarCambioDias = (checkedValues) => {
    if (checkedValues.includes("Toda la semana")) {
      if (todaLaSemanaSeleccionado) {
        setDiasSeleccionados([]);
        setTodaLaSemanaSeleccionado(false);
      } else {
        setDiasSeleccionados(["Toda la semana"]);
        setTodaLaSemanaSeleccionado(true);
      }
    } else {
      setDiasSeleccionados(checkedValues);
      setTodaLaSemanaSeleccionado(false);
    }
  };
  const onSubmit = (data) => console.log(data);
  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
  >
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="text-2xl mb-4">Crear nuevo Servicio</h1>
      
      <div className="grid grid-cols-2 gap-4 bg-[--verde-menu-claro] p-5 rounded-md">
      
        <div>
          <h2>Información del Servicio</h2>
          <Input placeholder="Título*" className="mb-4" />
          <TextArea placeholder="Descripción" className="mb-4" rows={4} />
          <Select placeholder="Tipo de Servicio*" className="w-full">
            <Option value="apicultor">Apicultor</Option>
            <Option value="carpintero">Carpintero</Option>
            <Option value="sapen">Agregar el que sea necesario</Option>
          </Select>
        </div>

        
        <div>
          <h2>Información del Titular</h2>
          <Input placeholder="Nombre del Titular" className="mb-4" />
          <Input placeholder="Celular" className="mb-4" />
          <Input placeholder="Correo Electrónico" className="mb-4" />
        </div>

        
        <div className="col-span-2 bg-[--verde-menu-claro] p-5 rounded-md">
          <h2 className="text-center">Horarios Semanales</h2>
          <Checkbox.Group
            options={[...opcionesDias, "Toda la semana"]}
            value={diasSeleccionados}
            onChange={manejarCambioDias}
            className="grid grid-cols-2 gap-4 p-4 bg-gray-100"
          />
          <div className="flex justify-around mt-4">
            <div>
              <h3>Horario desde</h3>
              <Input className="w-full"  />
            </div>
            <div>
              <h3>Horario hasta</h3>
              <Input className="w-full"  />
            </div>
          </div> 
          <div className="text-center">
          <Button type="primary" onClick={onSubmit} className="mt-4">Publicar</Button>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
}
