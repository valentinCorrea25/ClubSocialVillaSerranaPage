"use client";
import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { alojamientos as allAlojamientos } from "@/test/data";
import { Suspense } from "react";
import Informacion from "@/components/ListaAlojamiento/DetalleAlojamiento/Informacion";
import Carousel from "@/components/ListaAlojamiento/DetalleAlojamiento/Carousel";
import Descripcion from "@/components/ListaAlojamiento/DetalleAlojamiento/Descripcion";
import ContactoInfo from "@/components/ListaRestaurantes/DetalleRestaurante/Contacto";
import PublicacionesSimilares from "@/components/ListaAlojamiento/DetalleAlojamiento/PublicacionesSimilares";
import { ClientContext } from "@/context/clientContext";
import { Spin } from "antd";
import dynamic from "next/dynamic";
import PublicacionNoEncontrada from "@/components/utils/PublicacionNoEncontrada";

const FixSuspenseAlojamiento = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { buscarAlquiler } = useContext(ClientContext);
  const [isLoading, setIsLoading] = useState(true);
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState();
  const [alojamientoSimilares, setAlquileresSimilares] = useState();

  // const MapaLeaflet = dynamic(() => import('@/components/utils/MapaLeaflet'), { ssr: false });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const resultado = await buscarAlquiler(id);
          console.log(resultado);
          setAlojamientoSeleccionado(resultado.publicacion);
          setAlquileresSimilares(resultado.publicacionesRelacionadas);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Optionally set an error state here
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!alojamientoSeleccionado) {
    return <PublicacionNoEncontrada/>
  }

  return (
    <Suspense>
      <div className="container flex flex-col max-w-screen-xl bg-[#F9F6EE] px-3 sm:px-16 lg:px-24 py-10 m-auto h-full ">
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Informacion alojamiento={alojamientoSeleccionado} />
            <Carousel alojamiento={alojamientoSeleccionado} />
            <Descripcion alojamiento={alojamientoSeleccionado} />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-8">
            <div className="flex-1 flex flex-col gap-8">
              <div className="w-full">
                <ContactoInfo
                  nombre_titular={alojamientoSeleccionado.nombre_titular}
                  mail={alojamientoSeleccionado.mail}
                  celular={alojamientoSeleccionado.celular}
                />

              </div>
              {/* <MapaLeaflet ubicacion={alojamientoSeleccionado.ubicacion} /> */}
            </div>
            <div className="flex-1">
              <PublicacionesSimilares similares={alojamientoSimilares} />
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
};

export default FixSuspenseAlojamiento;
