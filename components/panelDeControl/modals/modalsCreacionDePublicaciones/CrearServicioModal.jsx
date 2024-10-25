import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox, Button, Input, Select, Row, Col, Form, Modal } from "antd";
import { AdminContext } from "@/context/adminContext";
import { diasSemana } from "@/components/utils/ControlPublicaciones";
const { TextArea } = Input;
const { Option } = Select;

export default function CrearServicioModal({
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
  isModalOpen,
  setIsModalOpen,
  setModalIsOpenForButtonFloat,
}) {
  const [form] = Form.useForm();
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [todaLaSemanaSeleccionado, setTodaLaSemanaSeleccionado] =
    useState(false);
  const { getTipoDeServicios, crearPublicacion } = useContext(AdminContext);
  const [tipoServicio, setTipoServicio] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    // setRestoreVariables(true);
    setIsModalOpen(false);
    setModalIsOpenForButtonFloat(false);
    resetForm();
  };

  const resetForm = () => {
    form.resetFields();
    setDiasSeleccionados([]);
    setTodaLaSemanaSeleccionado(false);
  };

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
    };
    fetchTipoServicio();
  }, []);

  const onFinish = async (values) => {
    setIsLoading(true);
    mostrarCargarToast();
    try {
      const data = await crearPublicacion(values, "servicios");
      if (data.code == 500) {
        mostrarFalloToast(data.message);
      } else {
        handleClose();
        mostrarExitoToast(data.message);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      title={<div className="text-center">Crear Publicacion</div>}
      open={isModalOpen}
      onCancel={handleClose}
      afterClose={handleClose}
      footer={
        <>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            className="bg-[--verde] text-white"
            loading={isLoading}
            onClick={() => form.submit()}
          >
            Guardar y Publicar
          </Button>
        </>
      }
      width="100%"
      style={{ maxWidth: "768px", top:"20px" }}
      bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <div className="flex flex-col items-center justify-center p-1 sm:p-4 md:p-10">
          <h1 className="text-2xl mb-4">Crear nuevo Servicio</h1>

          <Form.Item
            label="Título*"
            name="titulo"
            rules={[{ required: true, message: "Por favor ingrese el título" }]}
            className="w-full"
          >
            <Input placeholder="Título*" />
          </Form.Item>

          <Form.Item label="Descripción" name="descripcion" required className="w-full">
            <TextArea placeholder="Descripción" rows={4} />
          </Form.Item>

          <Form.Item
            label="Tipo de Servicio*"
            name="titulo_Servicio"
            rules={[{ required: true, message: "Seleccione un tipo de servicio" }]}
            className="w-full"
          >
            <Select placeholder="Tipo de Servicio*">
              {tipoServicio &&
                tipoServicio.map((item) => (
                  <Option key={item} value={item} />
                ))}
            </Select>
          </Form.Item>

          {/* Información del Titular */}
          <Form.Item
            label="Nombre del Titular"
            name="nombre_titular"
            required
            className="w-full"
          >
            <Input placeholder="Nombre del Titular" />
          </Form.Item>

          <Form.Item label="Celular" name="celular" required className="w-full">
            <Input placeholder="Celular" />
          </Form.Item>

          <Form.Item label="Correo Electrónico" name="mail" required className="w-full">
            <Input placeholder="Correo Electrónico" />
          </Form.Item>

          {/* Horarios Semanales */}
          <div className="w-full p-5 rounded-md">
            <h2 className="text-center">Horarios Semanales</h2>
            <Form.Item name="dia_Semana" className="mb-6">
              <Checkbox.Group
                options={diasSemana}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              />
            </Form.Item>

            <Form.Item label="Horario" name="horario" className="w-full">
              <Input />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
