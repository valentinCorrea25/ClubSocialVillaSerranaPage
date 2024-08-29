"use client";

import { createContext, useState } from "react";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [publicacion, setPublicacion] = useState(null)

  async function buscarAlquiler(id) {
    const res = await fetch(`/api/alquileres/${id}`);
    const data = await res.json();
    setPublicacion(data.message);
  }

  async function buscarActividad(id) {
    const res = await fetch(`/api/actividades/${id}`);
    const data = await res.json();
    setAlquiler(data.message);
  }

  async function buscarRestaurant(id) {
    const res = await fetch(`/api/restaurantes/${id}`);
    const data = await res.json();
    setAlquiler(data.message);
  }

  async function buscarServicio(id) {
    const res = await fetch(`/api/servicios/${id}`);
    const data = await res.json();
    setAlquiler(data.message);
  }

  async function buscarEventoNoticia(id) {
    const res = await fetch(`/api/eventosnoticias/${id}`);
    const data = await res.json();
    setAlquiler(data.message);
  }

  return (
    <ClientContext.Provider
      value={{
        buscarAlquiler,
        buscarActividad,
        buscarRestaurant,
        buscarEventoNoticia,
        buscarServicio,
        publicacion,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
