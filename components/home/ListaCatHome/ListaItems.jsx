"use client";
import React, { useContext, useState, useEffect } from "react";
import Item from "./Item";
import { Button, Spin } from "antd";
import { useRouter } from "next/navigation";
import { ClientContext } from "@/context/clientContext";

export default function ListaItems({ type }) {
  const { alquileresRandom,
    restaurantesRandom,
    eventosNoticiasRandom,
    actividadesRandom,
    serviciosRandom } = useContext(ClientContext);
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const publicacionesSeleccionadas = await seleccionarTipo(type);
      setItems(publicacionesSeleccionadas);
    }

    fetchItems();
  }, [type]);

  async function seleccionarTipo(type) {
    switch (type) {
      case 1: return await alquileresRandom();
      case 2: return await restaurantesRandom();
      case 3: return await eventosNoticiasRandom();
      case 4: return await actividadesRandom();
      case 5: return await serviciosRandom();
    }
  }


  const isMobile = window.innerWidth < 640;


  const displayedItems = isMobile && items.length > 3 ? items.slice(0, 3) : items;

  return (
    <div className="flex flex-col gap-4 justify-center items-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {displayedItems.length > 0 ? (
          displayedItems.map((item, index) => (
            <div className="  text-center" key={index}>
              <Item type={type} informacion={item} />
            </div>
          ))
        ) : (
          <div className="col-span-1 sm:col-span-2 md:col-span-3  flex justify-center items-center">
            <Spin size="large" />
          </div>
        )}
      </div>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          router.push(
            type === 1 ? "/ListaAlojamiento"
              : type === 2 ? "/ListaRestaurantes"
                : type === 3 ? "/ListaEventosNoticias"
                  : type === 4 ? "/ListaActividades"
                    : type === 5 ? "/ListaServicios"
                      : null
          );
        }}
      > Ver
        {type === 1
          ? " Alojamientos"
          : type === 2
            ? " Restaurantes"
            : type === 3
              ? " Noticias y Eventos"
              : type === 4
                ? " Actividades"
                : type === 5
                  ? " Servicios"
                  : null}
      </Button>
    </div>
  );
}
