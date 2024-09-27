"use client";

import { createContext, useState } from "react";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [publicacion, setPublicacion] = useState(null);

  async function buscarAlquiler(id) {
    const res = await fetch(`/api/alquileres/${id}`);
    const data = await res.json();

    return data.respuesta;
  }

  async function buscarActividad(id) {
    const res = await fetch(`/api/actividades/${id}`);
    const data = await res.json();
    setPublicacion(data.message);
  }

  async function buscarRestaurant(id) {
    const res = await fetch(`/api/restaurantes/${id}`);
    const data = await res.json();

    return data.respuesta;
  }

  async function buscarServicio(id) {
    const res = await fetch(`/api/servicios/${id}`);
    const data = await res.json();
    setPublicacion(data.message);
  }

  async function buscarEventoNoticia(id) {
    const res = await fetch(`/api/eventosnoticias/${id}`);
    const data = await res.json();
    setPublicacion(data.message);
  }

  async function ultimas3EventoNoticia() {
    const res = await fetch(`/api/eventosnoticias?limit=3`);
    const data = await res.json();
    setPublicacion(data);
    return data;
  }

  async function alquileresRandom() {
    const res = await fetch(`/api/alquileres?limit=9`);
    const data = await res.json();
    setPublicacion(data);

    return data;
  }

  async function restaurantesRandom() {
    const res = await fetch(`/api/restaurantes?limit=9`);
    const data = await res.json();
    setPublicacion(data);

    return data;
  }

  async function eventosNoticiasRandom() {
    const res = await fetch(`/api/eventosnoticias/?limit=9`);
    const data = await res.json();
    setPublicacion(data);

    return data;
  }

  async function actividadesRandom() {
    const res = await fetch(`/api/actividades/?limit=9`);
    const data = await res.json();
    setPublicacion(data);

    return data;
  }

  async function serviciosRandom() {
    const res = await fetch(`/api/servicios/?limit=9`);
    const data = await res.json();
    setPublicacion(data);

    return data;
  }

  async function todosLosRestaurantes() {
    const res = await fetch(`/api/restaurantes/lista`);
    const data = await res.json();

    return data;
  }

  async function todosLosAlquileres() {
    const res = await fetch(`/api/alquileres/lista`);
    const data = await res.json();

    return data;
  }

  async function todasLasActividades() {
    const res = await fetch(`/api/actividades/lista`);
    const data = await res.json();

    return data;
  }

  async function todosLosServicios() {
    const res = await fetch(`/api/servicios/lista`);
    const data = await res.json();

    return data;
  }

  async function todasLasNoticiasEventos() {
    const res = await fetch(`/api/eventosnoticias/lista`);
    const data = await res.json();

    return data;
  }
  

  return (
    <ClientContext.Provider
      value={{
        buscarAlquiler,
        buscarActividad,
        buscarRestaurant,
        buscarEventoNoticia,
        buscarServicio,
        ultimas3EventoNoticia,
        alquileresRandom,
        restaurantesRandom,
        eventosNoticiasRandom,
        actividadesRandom,
        serviciosRandom,
        todosLosRestaurantes,
        todosLosAlquileres,
        todasLasActividades,
        todosLosServicios,
        todasLasNoticiasEventos,
        publicacion,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
