import { getCoordsGoogleMaps } from "@/components/utils/ControlPublicaciones";
import { Checkbox, Form, InputNumber, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import dynamic from "next/dynamic";
import React, { useState } from "react";
// import Mapa from "../../leafletjs/Mapa";

export default function EditRestaurantes({ restaurante, urlGoogle, setUrlGoogle, diasSemana, tiposDePago }) {
    const Mapa = dynamic(() => import("@/components/panelDeControl/leafletjs/Mapa"), {
        ssr: false,
        loading: () => <div>Cargando mapa...</div>,
      });

      const getInitialValues = () => {
        if (!restaurante.diasSemana || !Array.isArray(restaurante.diasSemana)) {
          return [];
        }
        return restaurante.diasSemana;
      };

      const getInitialValuesPagos = () => {
        if (!restaurante.tipo_pago || !Array.isArray(restaurante.tipo_pago)) {
          return [];
        }
        return restaurante.tipo_pago;
      };
    
 
  return (
    <>
       <div className="flex flex-col gap-6 lg:gap-8">
          <div className="w-full">
            <div className="bg-white p-1 md:p-6">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Información del Restaurante
              </h2>

              <Form.Item
                label="Título del Restaurante"
                name="titulo"
                initialValue={restaurante.titulo}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el título del alquiler",
                  },
                ]}
              >
                <Input className="w-full" />
              </Form.Item>

              <Form.Item
                label="Descripción del alquiler"
                name="descripcion"
                initialValue={restaurante.descripcion}
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
                  className="w-full h-40 resize-none"
                />
              </Form.Item>

            </div>
          </div>

          <div className="w-full">
            <div className="bg-white p-1 md:p-6">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Información del Titular
              </h2>

              <Form.Item
                label="Nombre Completo"
                name="nombre_titular"
                initialValue={restaurante.nombre_titular}
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
                initialValue={restaurante.celular}
                rules={[
                  { required: true, message: "Por favor ingresa el celular" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Correo Electrónico"
                name="mail"
                initialValue={restaurante.mail}
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el correo electrónico",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-center mb-6">
                  Ubicación
                </h2>

                <Form.Item
                  label="Link de Google Maps"
                  name="ubicacion"
                  initialValue={restaurante.ubicacion}
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa la ubicación",
                    },
                    {
                      validator: (_, value) => {
                        const valido = getCoordsGoogleMaps(urlGoogle);
                        if (valido) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Por favor ingresa un enlace válido de Google Maps"
                          )
                        );
                      },
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setUrlGoogle(e.target.value);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Dirección completa"
                  name="ubicacion_calles"
                  initialValue={restaurante.ubicacion_calles}
                  rules={[
                    {
                      required: true,
                      message: "El campo no puede estar vacío",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <div className="w-full h-[200px] overflow-hidden">
                  <Mapa urlGoogle={urlGoogle} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secciones adicionales en tarjetas independientes */}
        <div className="mt-6 space-y-6">
          {/* Sección de Horarios */}
          <div className="bg-white p-1 md:p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Horarios
            </h2>

            <Form.Item name="diasSemana" className="mb-6" initialValue={getInitialValues()}>
              <Checkbox.Group
                options={diasSemana}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item label="Horarios Semanal" name="horario_semanal" initialValue={restaurante.horario_semanal}>
                <Input />
              </Form.Item>

              <Form.Item label="Horarios Fin de Semana" name="horario_finde" initialValue={restaurante.horario_finde}>
                <Input />
              </Form.Item>
            </div>
          </div>

          {/* Sección de Redes Sociales */}
          <div className="bg-white p-1 md:p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Redes Sociales
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Form.Item label="Facebook" name="facebook" initialValue={restaurante.facebook}>
                <Input />
              </Form.Item>

              <Form.Item label="Instagram" name="instagram" initialValue={restaurante.instagram}>
                <Input />
              </Form.Item>

              <Form.Item label="Página Web" name="web" initialValue={restaurante.web}>
                <Input />
              </Form.Item>
            </div>
          </div>

          {/* Sección de Métodos de Pago */}
          <div className="bg-white p-1 md:p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Métodos de Pago
            </h2>

            <Form.Item label="Tipos de pago" name="tipo_pago" initialValue={restaurante.tipo_pago}>
                <Select mode="multiple" placeholder="Seleccione los días" options={tiposDePago}>
                </Select>
            </Form.Item>
          </div>
        </div>
    </>
  );
}
