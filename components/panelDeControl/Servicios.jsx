import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox, Button, Input, Select, Row, Col, Form } from "antd";
import { AdminContext } from "@/context/adminContext";
const { TextArea } = Input;
const { Option } = Select;

export default function CrearServicio() {
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [todaLaSemanaSeleccionado, setTodaLaSemanaSeleccionado] = useState(false);
  const {getTipoDeServicios} = useContext(AdminContext);
  const [tipoServicio, setTipoServicio] = useState([]);
  const { crearPublicacion } = useContext(AdminContext);
  
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

  useEffect(() => {
    const fetchTipoServicio = async () => {
     const data = await getTipoDeServicios();
     setTipoServicio(data);
    }
    fetchTipoServicio();
  }, []);

  const onFinish = async (values) => {
    try {
      const mensaje = await crearPublicacion(values, "servicios");
    } catch (e) {
      console.log(e);
    }
  };

  

  return (
    <Form onFinish={onFinish} layout="vertical">
      <div className="flex flex-col items-center justify-center p-2 sm:p-4 md:p-10 ">
        <h1 className="text-2xl mb-4">Crear nuevo Servicio</h1>

        <Row gutter={[16, 16]}>
          {/* Información del Servicio */}
          <Col xs={24} md={12}>
            <Form.Item label="Título*" name="titulo" rules={[{ required: true, message: 'Por favor ingrese el título' }]}>
              <Input placeholder="Título*" />
            </Form.Item>

            <Form.Item label="Descripción" name="descripcion">
              <TextArea placeholder="Descripción" rows={4} />
            </Form.Item>

            <Form.Item label="Tipo de Servicio*" name="titulo_Servicio" rules={[{ required: true, message: 'Seleccione un tipo de servicio' }]}>
              <Select placeholder="Tipo de Servicio*" className="w-full">
                {tipoServicio && tipoServicio.map((item)=>{
                  return <Option value={item}/>
                })}
              </Select>
            </Form.Item>
          </Col>

          {/* Información del Titular */}
          <Col xs={24} md={12}>
            <Form.Item label="Nombre del Titular" name="nombre_titular" required>
              <Input placeholder="Nombre del Titular" />
            </Form.Item>

            <Form.Item label="Celular" name="celular" required>
              <Input placeholder="Celular" />
            </Form.Item>

            <Form.Item label="Correo Electrónico" name="mail" required>
              <Input placeholder="Correo Electrónico" />
            </Form.Item>
          </Col>

          {/* Horarios Semanales */}
          <Col span={24}>
            <div className="p-5 rounded-md">
              <h2 className="text-center">Horarios Semanales</h2>
              <Form.Item name="dia_Semana">
                <Checkbox.Group
                  options={[...opcionesDias, "Toda la semana"]}
                  value={diasSeleccionados}
                  onChange={manejarCambioDias}
                  className="grid grid-cols-2 gap-4 p-4 bg-gray-100 items-center"
                />
              </Form.Item>

              <Row gutter={[16, 16]} className="mt-4">
                <Col xs={24} md={12}>
                  <Form.Item label="Horario" name="horario">
                    <Input />
                  </Form.Item>
                </Col>
                {/* <Col xs={24} md={12}>
                  <Form.Item label="Horario hasta" name="horarioHasta">
                    <Input />
                  </Form.Item>
                </Col> */}
              </Row>

              <div className="text-center">
                <Button type="primary" htmlType="submit" className="mt-4">
                  Publicar
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Form>
  );
}
