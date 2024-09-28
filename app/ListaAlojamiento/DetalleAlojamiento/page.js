'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import { alojamientos as allAlojamientos } from '@/test/data'; 
import { Suspense } from 'react';
import Banner from '@/components/ListaAlojamiento/DetalleAlojamiento/Banner';
import Informacion from '@/components/ListaAlojamiento/DetalleAlojamiento/Informacion'; 
import Carousel from '@/components/ListaAlojamiento/DetalleAlojamiento/Carousel';
import Descripcion from '@/components/ListaAlojamiento/DetalleAlojamiento/Descripcion';
import Caracteristicas from '@/components/ListaAlojamiento/DetalleAlojamiento/Caracteristicas';
import Contacto from '@/components/ListaRestaurantes/DetalleRestaurante/Contacto';
import UbicacionMap from '@/components/ListaAlojamiento/DetalleAlojamiento/UbicacionMap'; 
import PublicacionesSimilares from '@/components/ListaAlojamiento/DetalleAlojamiento/PublicacionesSimilares';
import { ClientContext } from '@/context/clientContext';
import { Spin } from 'antd';

const DetalleAlojamientos = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const id = searchParams.get('id');
  const {buscarAlquiler} = useContext(ClientContext);
  const [isLoading, setIsLoading] = useState(true);
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState();
  const [alojamientoSimilares, setAlquileresSimilares] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsLoading(true);
        const resultado = await buscarAlquiler(id);
        console.log(resultado);
        
        setAlojamientoSeleccionado(resultado.publicacion);
        setAlquileresSimilares(resultado.publicacionesRelacionadas)
        setIsLoading(false);
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
    return <div>Alojamiento no encontrado</div>;
  }

  return (
      <Suspense>
        <div className="container flex flex-col max-w-screen-xl bg-[#F9F6EE] px-12 sm:px-16 lg:px-24 py-24 m-auto h-full "> 
          <div className="mb-14"><Banner title="Alojamientos" subtitle="Descubre nuestras opciones" 
          backgroundImage="/images/alojamiento.jpg" /></div>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"> 
          <div className="lg:col-span-2 flex flex-col gap-8"> 
            <Informacion alojamiento={alojamientoSeleccionado} />
            <Carousel alojamiento={alojamientoSeleccionado} />
            <Descripcion alojamiento={alojamientoSeleccionado} />
            <Caracteristicas alojamiento={alojamientoSeleccionado} />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-8"><div className="flex-1 flex flex-col gap-8"> 
            {/* <div className="w-full"><Contacto alquiler={alojamientoSeleccionado} /></div> */}
            <UbicacionMap ubicacion={alojamientoSeleccionado.ubicacion} /></div>
            <div className="flex-1"><PublicacionesSimilares similares={alojamientoSimilares} /></div>
          </div>
        </main>
      </div>
    </Suspense>
  );
};

export default DetalleAlojamientos;
