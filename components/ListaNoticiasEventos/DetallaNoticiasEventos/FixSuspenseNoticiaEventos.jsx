"use client";
// import Carousel from "@/components/ListaNoticiasEventos/DetallaNoticiasEventos/Carousel";
import { Eventosnoticias, Características, UbicacionMap, } from "@/components/ListaNoticiasEventos/DetallaNoticiasEventos/EventosNoticias";
import PubliSimilares from "@/components/ListaNoticiasEventos/DetallaNoticiasEventos/PublicacionesSimilares"
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { ClientContext } from "@/context/clientContext";
import { Spin } from "antd";
import { Suspense } from "react";
import PublicacionNoEncontrada from "@/components/utils/PublicacionNoEncontrada";
import Carousel from "@/components/utils/Carousel";

export default function FixSuspenseNoticiaEventos() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { buscarEventoNoticia } = useContext(ClientContext);
  const [eventonoticiaSeleccionado, setEventoNoticiaSeleccionado] = useState(null);
  const [eventonoticiaSimilares, setEventoNoticiaSimilares] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventoNoticas = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const resultado = await buscarEventoNoticia(id);
          console.log(resultado);
          setEventoNoticiaSeleccionado(resultado.publicacion);
          setEventoNoticiaSimilares(resultado.publicacionesRelacionadas);
          if(document != undefined){
            document.title = resultado.publicacion.titulo
            document.querySelector('meta[name="description"]').content = eliminarHTMLparaMetaData(resultado.publicacion.contenido);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchEventoNoticas();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" /> {/* Spinner */}
      </div>
    );
  }

  if (!eventonoticiaSeleccionado) {
    return <PublicacionNoEncontrada/>
  }

  return (
    <Suspense>
      <div className="flex flex-col min-h-screen max-w-screen-xl m-auto bg-[#F9F6EE] px-3 sm:px-12 lg:px-20 py-10">
        <div className="mb-10"></div>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Carousel record={eventonoticiaSeleccionado}/>
            <Eventosnoticias eventosnoticias={eventonoticiaSeleccionado} />
          </div>
          <div className="lg:col-span-1 flex flex-col h-full gap-6">
            {/* Contenedor para Contacto y Mapa */}
            <div className="flex flex-col flex-1 gap-6">
              <div className="">
                <PubliSimilares similares={eventonoticiaSimilares} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
}
