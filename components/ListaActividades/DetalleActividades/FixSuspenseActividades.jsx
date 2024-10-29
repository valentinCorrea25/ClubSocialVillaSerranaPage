"use client";
import Carousel from '@/components/ListaActividades/DetalleActividades/Carousel'
import { Actividad, Características, UbicacionMap } from '@/components/ListaActividades/DetalleActividades/Actividades';
import PubliSimilares from '@/components/ListaActividades/DetalleActividades/PublicacionesSimilares';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import { ClientContext } from '@/context/clientContext';
import { Spin } from 'antd';
import { Suspense } from 'react';

export default function FixSuspenseActividades() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { buscarActividad } = useContext(ClientContext);
  const [actividadSeleccionado, setActividadSeleccionado] = useState(null);
  const [actividadesSimilares, setActividadSimilares] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchActividad = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const resultado = await buscarActividad(id);
          console.log(resultado);
          setActividadSeleccionado(resultado.publicacion);
          setActividadSimilares(resultado.publicacionesRelacionadas);
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
    return <div>Actividad no encontrada</div>;
  }




  return (
    // <div className="flex flex-col min-h-screen bg-[#F9F6EE]">

    //   <Actividad actividad={actividadSeleccionado}/>
    //   <Carousel actividad={actividadSeleccionado}/>
    //   <Características actividad={actividadSeleccionado}/>
    //   <PubliSimilares similares={actividadesSimilares}/>

    // </div>
    <Suspense>
      <div className="flex flex-col min-h-screen max-w-screen-xl m-auto bg-[#F9F6EE] px-3 sm:px-12 lg:px-20 py-10">
        <div className="mb-10">
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Columna izquierda */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Carousel actividad={actividadSeleccionado} />

            <Actividad actividad={actividadSeleccionado} />

          </div>

          {/* Columna derecha */}
          <div className="lg:col-span-1 flex flex-col h-full gap-6">
            {/* Contenedor para Contacto y Mapa */}
            <div className="flex flex-col flex-1 gap-6">
              {/* Contacto */}
              {/* Mapa */}
              <div className="flex-1">
                <UbicacionMap ubicacion={actividadSeleccionado.ubicacion} />
              </div>
            </div>
            {/* Publicaciones Similares */}
            <div className="mt-auto">
              <PubliSimilares similares={actividadesSimilares} />
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
}

