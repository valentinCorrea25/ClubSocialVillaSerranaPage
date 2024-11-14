import { getCoordsGoogleMaps } from "@/components/utils/ControlPublicaciones";
import { Checkbox, Form, InputNumber, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
// import Mapa from "../../leafletjs/Mapa";

export default function EditAlquileres({
  alquiler,
  urlGoogle,
  setUrlGoogle,
  alquileresCaracteristicas,
}) {
  console.log(alquiler);

  const Mapa = dynamic(
    () => import("@/components/panelDeControl/leafletjs/Mapa"),
    {
      ssr: false,
      loading: () => <div>Cargando mapa...</div>,
    }
  );

  const getInitialValues = () => {
    const selectedFeatures = [];
    alquileresCaracteristicas.forEach(({ value }) => {
      if (alquiler[value] === true) {
        selectedFeatures.push(value);
      }
    });
    return selectedFeatures;
  };

  useEffect(() => {
    setUrlGoogle(alquiler.ubicacion);
  }, []);

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
            initialValue={alquiler.titulo}
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
            initialvalue={alquiler.descripcion}
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

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Información del Titular
          </h2>

          <Form.Item
            label="Nombre Completo"
            name="nombre_titular"
            initialValue={alquiler.nombre_titular}
            rules={[
              {
                required: true,
                message: "El nombre no puede estar vacío",
              },
            ]}
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            label="Celular"
            name="celular"
            initialValue={alquiler.celular}
            rules={[
              {
                required: true,
                message: "Por favor ingrese un número de celular",
              },
              {
                pattern: /^[\d\s]+$/,
                message: "Solo se permiten números y espacios",
              },
              {
                transform: (value) => value.replace(/[^\d\s]/g, ""), // Transforma el valor automáticamente
              },
            ]}
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            label="Correo Electrónico"
            name="mail"
            initialValue={alquiler.mail}
            rules={[
              {
                required: false,
                message: "Por favor ingresa un correo electrónico valido",
                type: 'email'
              },
            ]}
          >
            <Input className="w-full" />
          </Form.Item>

          <h2 className="text-2xl font-semibold text-center mt-8 mb-6">
            Ubicación
          </h2>

          <Form.Item
            label="Link de Google Maps"
            name="ubicacion"
            initialValue={alquiler.ubicacion}
            required={false}
            rules={[
              {
                validator: (_, value) => {
                  const valido = getCoordsGoogleMaps(urlGoogle);
                  if (urlGoogle) {
                    if (valido) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Por favor ingresa un enlace válido de Google Maps"
                      )
                    );
                  } else {
                    return Promise.resolve();
                  }
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
            initialValue={alquiler.ubicacion_calles}
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

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Características del Alquiler
        </h2>
        <Form.Item name="caracteristicas" initialValue={getInitialValues()}>
          <Checkbox.Group
            options={alquileresCaracteristicas}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          />
        </Form.Item>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Form.Item
            initialValue={alquiler.camas_singles}
            label="Camas individuales"
            name="camas_singles"
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item
            initialValue={alquiler.camas_dobles}
            label="Camas dobles"
            name="camas_dobles"
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Capacidad"
            name="capacidad"
            initialValue={alquiler.capacidad}
            rules={[{ required: true, message: 'Capacidad es requerido' }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </div>
      </div>
    </>
  );
}
