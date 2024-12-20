"use client";

import { createContext, useState } from "react";
import { tituloCorrectoServicio } from "@/components/utils/ControlPublicaciones";

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
    return data.respuesta;
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
    console.log(data);
    
    return data.respuesta;
  }

  async function buscarEventoNoticia(id) {
    const res = await fetch(`/api/eventosnoticias/${id}`);
    const data = await res.json();
    return data.respuesta;
    setPublicacion(data.message);
  }

  async function ultimas3EventoNoticia() {
    try {
      const res = await fetch(`/api/eventosnoticias?limit=3`);
      const data = await res.json();

      setPublicacion(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async function alquileresRandom() {
    const res = await fetch(`/api/alquileres?limit=6`);
    const data = await res.json();
    setPublicacion(data);

    data.publicaciones = excluirNoPublicados(data.publicaciones);

    return data;
  }

  async function restaurantesRandom() {
    const res = await fetch(`/api/restaurantes?limit=6`);
    const data = await res.json();
    setPublicacion(data);

    data.publicaciones = excluirNoPublicados(data.publicaciones);

    return data;
  }

  async function eventosNoticiasRandom() {
    const res = await fetch(`/api/eventosnoticias/?limit=6`);
    const data = await res.json();
    setPublicacion(data);

    data.publicaciones = excluirNoPublicados(data.publicaciones);

    return data;
  }

  async function actividadesRandom() {
    const res = await fetch(`/api/actividades/?limit=6`);
    const data = await res.json();
    setPublicacion(data);

    data.publicaciones = excluirNoPublicados(data.publicaciones);

    return data;
  }

  async function serviciosRandom() {
    const res = await fetch(`/api/servicios/?limit=9`);
    const data = await res.json();
    setPublicacion(data);

    data.publicaciones = excluirNoPublicados(data.publicaciones);
    data.publicaciones = tituloServicioCorrectos(data.publicaciones);

    return data;
  }

  async function todosLosRestaurantes(page) {
    const res = await fetch(
      `/api/restaurantes/lista?page=${page ? page : 1}&web=true`
    );
    const data = await res.json();

    data.publicaciones = excluirNoPublicados(data.publicaciones);

    return data;
  }

  async function todosLosAlquileres(page, capacity) {
    const res = await fetch(
      `/api/alquileres/lista?page=${page ? page : 1}&web=true${
        capacity ? `&capacity=${capacity}` : ""
      }`
    );
    const data = await res.json();

    data.publicaciones = excluirNoPublicados(data.publicaciones);

    return data;
  }

  async function todasLasActividades(page) {
    const res = await fetch(`/api/actividades/lista?page=${page ? page : 1}`);
    const data = await res.json();

    data.publicaciones = excluirNoPublicados(data.publicaciones);

    return data;
  }

  async function todosLosServicios(page, tipo) {
    const res = await fetch(
      `/api/servicios/lista?page=${page ? page : 1}&web=true${
        tipo ? `&tiposervicio=${tipo}` : ""
      }`
    );
    const data = await res.json();

    console.log(
      `/api/servicios/lista?page=${page ? page : 1}&web=true${
        tipo ? `&tiposervicio=${tipo}` : ""
      }`
    );

    data.publicaciones = excluirNoPublicados(data.publicaciones);
    data.publicaciones = tituloServicioCorrectos(data.publicaciones);

    return data;
  }

  async function todasLasNoticiasEventos(page, startDate, endDate) {
    const formatDate = (date) => {
      return date ? new Date(date).toISOString().split("T")[0] : "";
    };
  
    const res = await fetch(
      `/api/eventosnoticias/lista?page=${page ? page : 1}&web=true` +
      `${startDate ? `&startDate=${formatDate(startDate)}` : ""}` +
      `${endDate ? `&endDate=${formatDate(endDate)}` : ""}`
    );
    const data = await res.json();

    const dataFiltrada = excluirNoPublicados(data.publicaciones);
    data.publicaciones = dataFiltrada;

    return data;
  }

  function excluirNoPublicados(data) {
    if (data) return data.filter((item) => item.publicado);
  }

  function tituloServicioCorrectos(data) {
    if (data) {
      data.forEach((servicio) => {
        servicio.titulo_Servicio = tituloCorrectoServicio(
          servicio.titulo_Servicio
        );
      });
    }
    return data;
  }

  async function serviciosPorTipo(tipo, page) {
    const res = await fetch(
      `/api/servicios/lista?page=${page ? page : 1}&tiposervicio=${tipo}`
    );
    const data = await res.json();

    console.log(data);

    data.publicaciones = excluirNoPublicados(data.publicaciones);
    data.publicaciones = tituloServicioCorrectos(data.publicaciones);

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
        serviciosPorTipo,
        publicacion,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
