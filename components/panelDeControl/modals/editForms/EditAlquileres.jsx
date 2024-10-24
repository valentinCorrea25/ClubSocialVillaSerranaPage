import { Checkbox, Form, InputNumber, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
// import Mapa from "../../leafletjs/Mapa";

export default function EditAlquileres({ alquiler, urlGoogle, setUrlGoogle }) {
  const alquileresCaracteristicas = [
    { label: "Toallas", value: "toallas" },
    { label: "Agua Caliente", value: "agua_caliente" },
    { label: "Sabanas", value: "sabanas" },
    { label: "TV", value: "tv" },
    { label: "WIFI", value: "wifi" },
    { label: "Piscina", value: "piscina" },
    { label: "Parrilla", value: "parrilla" },
    { label: "Cocina", value: "cocina" },
    { label: "Microondas", value: "microondas" },
    { label: "Tostadora", value: "tostadora" },
    { label: "Aire Acondicionado", value: "aire_acondicionado" },
    { label: "Estufa", value: "estufa" },
    { label: "Frazadas", value: "frazadas" },
    { label: "Mascotas", value: "mascotas" },
  ];
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Información del Alquiler
          </h2>

          <Form.Item
            label="Título del Alquiler"
            name="titulo"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el título del alquiler",
              },
            ]}
          >
            <Input value={alquiler.titulo} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Descripción del alquiler"
            name="descripcion"
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
              value={alquiler.descripcion}
              className="w-full h-40 resize-none"
            />
          </Form.Item>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Información del Titular
          </h2>

          <Form.Item
            label="Nombre Completo"
            name="nombre_titular"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el nombre completo",
              },
            ]}
          >
            <Input value={alquiler.nombre_titular} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Celular"
            name="celular"
            rules={[
              { required: true, message: "Por favor ingresa el celular" },
            ]}
          >
            <Input value={alquiler.celular} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Correo Electrónico"
            name="mail"
            rules={[
              {
                required: true,
                message: "Por favor ingresa el correo electrónico",
              },
            ]}
          >
            <Input value={alquiler.mail} className="w-full" />
          </Form.Item>

          <h2 className="text-2xl font-semibold text-center mt-8 mb-6">
            Ubicación
          </h2>

          <Form.Item
            label="Link de Google Maps"
            name="ubicacion"
            rules={[
              { required: false, message: "Por favor ingresa la ubicación" },
              {
                // validator: (_, value) => {
                //   const valido = getCoordsGoogleMaps(urlGoogle);
                //   if (valido) {
                //     return Promise.resolve();
                //   }
                //   return Promise.reject(
                //     new Error(
                //       "Por favor ingresa un enlace válido de Google Maps"
                //     )
                //   );
                // },
              },
            ]}
          >
            <Input
              className="w-full"
              value={alquiler.ubicacion}
              onLoad={() => {
                setUrlGoogle(alquiler.ubicacion);
              }}
              onChange={(e) => {
                setUrlGoogle(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Dirección completa"
            name="ubicacion_calles"
            rules={[
              { required: true, message: "Por favor ingresa la direccion" },
            ]}
          >
            <Input value={alquiler.ubicacion_calles} className="w-full" />
          </Form.Item>
          {/* <Mapa urlGoogle={urlGoogle} /> */}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Características del Alquiler
        </h2>
        <Form.Item name="caracteristicas">
          <Checkbox.Group
            options={alquileresCaracteristicas}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          />
        </Form.Item>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Form.Item label="Camas individuales" name="camas_singles">
            <InputNumber
              value={alquiler.camas_singles}
              min={0}
              className="w-full"
            />
          </Form.Item>

          <Form.Item label="Camas dobles" name="camas_dobles">
            <InputNumber
              value={alquiler.camas_dobles}
              min={0}
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Capacidad"
            name="capacidad"
            rules={[{ required: true }]}
          >
            <InputNumber
              value={alquiler.capacidad}
              min={0}
              className="w-full"
            />
          </Form.Item>
        </div>
      </div>
    </>
  );
}
