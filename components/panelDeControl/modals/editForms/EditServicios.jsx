import { tituloCorrectoServicio } from "@/components/utils/ControlPublicaciones";
import { AdminContext } from "@/context/adminContext";
import { Checkbox, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useEffect, useState } from "react";

export default function EditServicios({ servicio, diasSemana }) {
  const { getTipoDeServicios } = useContext(AdminContext);
  const [tipoServicio, setTipoServicio] = useState([]);

  const getInitialValues = () => {
    if (!servicio.dia_Semana || !Array.isArray(servicio.dia_Semana)) {
      return [];
    }
    return servicio.dia_Semana;
  };

  useEffect(() => {
    const fetchTipoServicio = async () => {
      const data = await getTipoDeServicios();
      setTipoServicio(data);
    };
    fetchTipoServicio();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center p-1 sm:p-4 md:p-10">
        <h1 className="text-2xl mb-4">Crear nuevo Servicio</h1>

        <Form.Item
          label="Título*"
          name="titulo"
          initialValue={servicio.titulo}
          rules={[{ required: true, message: "Por favor ingrese el título" }]}
          className="w-full"
        >
          <Input placeholder="Título*" />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="descripcion"
          required
          className="w-full"
          initialValue={servicio.descripcion}
        >
          <TextArea placeholder="Descripción" rows={4} />
        </Form.Item>

        <Form.Item
          label="Tipo de Servicio*"
          name="titulo_Servicio"
          initialValue={servicio.titulo_Servicio}
          rules={[
            { required: true, message: "Seleccione un tipo de servicio" },
          ]}
          className="w-full"
        >
          <Select placeholder="Tipo de Servicio*">
            {tipoServicio &&
              tipoServicio.map((item) => <Option key={item} value={tituloCorrectoServicio(item)} />)}
          </Select>
        </Form.Item>

        {/* Información del Titular */}
        <Form.Item
          label="Nombre del Titular"
          name="nombre_titular"
          required
          className="w-full"
          initialValue={servicio.nombre_titular}
        >
          <Input placeholder="Nombre del Titular" />
        </Form.Item>

        <Form.Item label="Celular" name="celular" required className="w-full">
          <Input placeholder="Celular" />
        </Form.Item>

        <Form.Item
          label="Correo Electrónico"
          name="mail"
          required
          className="w-full"
          initialValue={servicio.mail}
        >
          <Input placeholder="Correo Electrónico" />
        </Form.Item>

        {/* Horarios Semanales */}
        <div className="w-full p-5 rounded-md">
          <h2 className="text-center">Horarios Semanales</h2>
          <Form.Item
            name="dia_Semana"
            className="mb-6"
            initialValue={getInitialValues()}
          >
            <Checkbox.Group
              options={diasSemana}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            />
          </Form.Item>

          <Form.Item
            label="Horario"
            name="horario"
            className="w-full"
            initialValue={servicio.horario}
          >
            <Input />
          </Form.Item>
        </div>
      </div>
    </>
  );
}
