"use client";
import Carousel from '@/components/utils/Carousel';
import { Actividad } from '@/components/ListaActividades/DetalleActividades/Actividades';
import UbicacionMap from '@/components/utils/UbicacionMap';
import PubliSimilares from '@/components/ListaActividades/DetalleActividades/PublicacionesSimilares';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import { ClientContext } from '@/context/clientContext';
import { Spin } from 'antd';
import { Suspense } from 'react';
import PublicacionNoEncontrada from '@/components/utils/PublicacionNoEncontrada';

export default function FixSuspenseActividades() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { buscarActividad } = useContext(ClientContext);
  const [actividadSeleccionado, setActividadSeleccionado] = useState(null);
  const [actividadesSimilares, setActividadSimilares] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const fetchActividad = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const resultado = await buscarActividad(id);
          console.log(resultado);
          setActividadSeleccionado(resultado.publicacion);
          setActividadSimilares(resultado.publicacionesRelacionadas);
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
    fetchActividad();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" /> {/* Spinner */}
      </div>
    );
  }

  if (!actividadSeleccionado) {
    return <PublicacionNoEncontrada/>
  }




  return (
    <Suspense>
      <div className="flex flex-col min-h-screen max-w-screen-xl m-auto bg-[#F9F6EE] px-3 sm:px-12 lg:px-20 py-10">
        <div className="mb-10">
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Carousel record={actividadSeleccionado} />
            <Actividad actividad={actividadSeleccionado} />
          </div>

          <div className="lg:col-span-1 flex flex-col h-full gap-6">
            <div className="flex flex-col flex-1 gap-6">
            
              {/* <div className="flex-1">
                <UbicacionMap ubicacion={actividadSeleccionado.ubicacion} />
              </div> */}
            </div>

            <div className="mt-auto">
              <PubliSimilares similares={actividadesSimilares} />
            </div>

          </div>
        </main>
      </div>
    </Suspense>
  );
}

