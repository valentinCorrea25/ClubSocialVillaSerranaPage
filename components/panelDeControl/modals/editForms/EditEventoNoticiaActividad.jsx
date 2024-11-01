import {
  dateFormat,
  tituloCorrectoServicio,
} from "@/components/utils/ControlPublicaciones";
import { AdminContext } from "@/context/adminContext";
import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "@/components/panelDeControl/richTextEditor/RichTextEditor";
import dayjs from "dayjs";

export default function EditEventoNoticiaActividad({
  eventoNoticiaActividad,
  diasSemana,
  currentForm,
  setTextoRichText,
  textoRichText,
}) {
  const [esEvento, setEsEvento] = useState(
    eventoNoticiaActividad.fecha_evento ? true : false
  );

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getInitialValues = () => {
    if (
      !eventoNoticiaActividad.dia_Semana ||
      !Array.isArray(eventoNoticiaActividad.dia_Semana)
    ) {
      return [];
    }
    return eventoNoticiaActividad.dia_Semana;
  };

  useEffect(() => {
    setTextoRichText(eventoNoticiaActividad.contenido);
  }, [eventoNoticiaActividad]);

  return (
    <>
      <div className="flex flex-col items-center justify-center p-1 sm:p-4 md:p-10">
        <h1 className="text-center text-xl md:text-2xl mb-6">
          Editar publicación de Actividad o Eventos y Noticias
        </h1>

        {/* <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0 md:space-x-2 max-w-screen-xl">
          <Button
            type={currentForm === "eventos" ? "primary" : "default"}
            onClick={() => {
              setCurrentForm("eventos");
            }}
            className="w-full md:w-1/2"
          >
            Eventos y Noticias
          </Button>
          <Button
            type={currentForm === "actividades" ? "primary" : "default"}
            onClick={() => {
              setCurrentForm("actividades");
            }}
            className="w-full md:w-1/2"
          >
            Actividades
          </Button>
        </div> */}

        {currentForm === "EventoNoticia" ? (
          <>
            <Form.Item
              label="Título"
              name="titulo"
              className="w-full"
              rules={[{ required: true }]}
              initialValue={eventoNoticiaActividad.titulo}
            >
              <Input placeholder="Título" />
            </Form.Item>

            <Form.Item
              label="Contenido"
              name="contenido"
              initialValue={textoRichText}
              rules={[
                {
                  validator: (_, value) => {
                    if (!textoRichText || textoRichText.trim() === "") {
                      return Promise.reject(
                        new Error("El contenido es requerido")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <RichTextEditor
                setTextoRichText={setTextoRichText}
                initialHTML={eventoNoticiaActividad.contenido}
              />
            </Form.Item>

            <Form.Item>
              <Checkbox
                checked={esEvento}
                onChange={(e) => setEsEvento(e.target.checked)}
              >
                ¿Es Evento?
              </Checkbox>
            </Form.Item>

            {esEvento && (
               <Form.Item
               label="Fecha Evento"
               name="fecha_evento"
               className="w-full"
               initialValue={eventoNoticiaActividad.fecha_evento ? dayjs(eventoNoticiaActividad.fecha_evento) : null}
               rules={[{ required: true, message: "La fecha del evento es requerida" }]}
             >
               <DatePicker
                 format={dateFormat}
                 className="w-full"
               />
             </Form.Item>
            )}
          </>
        ) : (
          <>
            <Form.Item
              label="Título"
              name="titulo"
              initialValue={eventoNoticiaActividad.titulo}
              rules={[{ required: true }]}
            >
              <Input placeholder="Título de la actividad" />
            </Form.Item>

            <Form.Item
              label="Contenido"
              name="contenido"
              rules={[
                {
                  validator: (_, value) => {
                    if (!textoRichText || textoRichText.trim() === "") {
                      return Promise.reject(
                        new Error("El contenido es requerido")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <RichTextEditor setTextoRichText={setTextoRichText} />
            </Form.Item>

            <div className="flex justify-center gap-4">
              <Form.Item
                label="Horario"
                name="horario"
                initialValue={eventoNoticiaActividad.horario}
                rules={[{ required: true }]}
              >
                <Input placeholder="Horario de la actividad" />
              </Form.Item>

              <Form.Item
                label="Ubicación"
                name="ubicacion"
                initialValue={eventoNoticiaActividad.ubicacion}
                rules={[{ required: true }]}
              >
                <Input placeholder="Ubicación de la actividad" />
              </Form.Item>
            </div>

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

            {/* <Form.Item className="text-center">
              <Button type="primary" htmlType="submit">
                Publicar Actividad
              </Button>
            </Form.Item> */}
          </>
        )}
      </div>
    </>
  );
}
