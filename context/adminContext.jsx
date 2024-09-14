"use client";

import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [alquiler, setAlquiler] = useState(null)
  const [mensaje, setMensaje] = useState(null);

  async function crearAlquiler(datos) {
    const res = await fetch(`/api/alquileres`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor: String(datos),
        limit: true,
      }),
    });
    const data = await res.json();
    setMensaje(data.message);
  }

  async function crearRestaurant(datos) {
    const res = await fetch(`/api/restaurantes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor: String(datos),
        limit: true,
      }),
    });
    const data = await res.json();
    setMensaje(data.message);
  }

  async function crearServicios(datos) {
    const res = await fetch(`/api/servicios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor: String(datos),
        limit: true,
      }),
    });
    const data = await res.json();
    setMensaje(data.message);
  }

  async function crearUsuario(datos) {
    const res = await fetch(`/api/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor: String(datos),
        limit: true,
      }),
    });
    const data = await res.json();
    setMensaje(data.message);
  }

  async function crearEventoNoticia(datos) {
    const res = await fetch(`/api/eventosnoticias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor: String(datos),
        limit: true,
      }),
    });
    const data = await res.json();
    setMensaje(data.message);
  }

  async function crearActividad(datos) {
    const res = await fetch(`/api/actividades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor: String(datos),
        limit: true,
      }),
    });
    const data = await res.json();
    setMensaje(data.message);
  }

  async function modificarPublicaciones(id,datos,tipoPubliacacion) {
    const res = await fetch(`/api/${tipoPubliacacion}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datos
      }),
    });
    const data = await res.json();
    setMensaje(data.message);
  }

  return (
    <AdminContext.Provider
      value={{
        crearAlquiler,
        crearRestaurant,
        crearServicios,
        crearUsuario,
        crearEventoNoticia,
        crearActividad,
        modificarPublicaciones,
        mensaje
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
