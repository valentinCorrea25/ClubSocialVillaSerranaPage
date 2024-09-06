"use client";
import React, { useContext, useState, useEffect } from "react";
import Item from "./Item";
import { Button, Spin } from "antd";
import {useRouter} from "next/navigation";
import { ClientContext } from "@/context/clientContext";

export default function ListaItems({ type }) {
  const {
    alquileresRandom,
    restaurantesRandom,
    eventosNoticiasRandom,
    actividadesRandom,
    serviciosRandom,
  } = useContext(ClientContext);
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const publicacionesSeleccionadas = await seleccionarTipo(type);
      setItems(publicacionesSeleccionadas);
    }

    fetchItems();
  }, [type]); // Re-run the effect when `type` changes

  async function seleccionarTipo(type) {
    switch (type) {
      case 1:
        return await alquileresRandom();
      case 2:
        return await restaurantesRandom();
      case 3:
        return await eventosNoticiasRandom();
      case 4:
        return await actividadesRandom();
      case 5:
        return await serviciosRandom();
      default:
        return [];
    }
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div className="w-full flex gap-y-4 flex-col md:grid md:grid-cols-3 md:grid-rows-3 md:gap-x-8 md:gap-y-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <Item key={index} type={type} informacion={item} />
          ))
        ) : (
          <Spin size="large" />
        )}
      </div>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          router.push(
            type == 1
              ? "/ListaAlojamiento"
              : type == 2
              ? "/ListaRestaurantes"
              : type == 3
              ? "/ListaEventosNoticias"
              : type == 4
              ? "/ListaActividades"
              : type == 5
              ? "#"
              : null
          );
        }}
      >
        Ver más
        {type == 1
          ? " Alquileres"
          : type == 2
          ? " Restaurantes"
          : type == 3
          ? " Noticias y Eventos"
          : type == 4
          ? " Actividades"
          : type == 5
          ? " Servicios"
          : null}
      </Button>
    </div>
  );
}
