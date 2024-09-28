'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import { Spin } from 'antd'; // Importa el spinner de antd
import { ClientContext } from '@/context/clientContext';
import { Suspense } from 'react';
import Banner from '@/components/ListaRestaurantes/DetalleRestaurante/Banner';
import Informacion from '@/components/ListaRestaurantes/DetalleRestaurante/Informacion';
import Carousel from '@/components/ListaRestaurantes/DetalleRestaurante/Carousel';
import Descripcion from '@/components/ListaRestaurantes/DetalleRestaurante/Descripcion';
import Caracteristicas from '@/components/ListaRestaurantes/DetalleRestaurante/Caracteristicas';
import Contacto from '@/components/ListaRestaurantes/DetalleRestaurante/Contacto';
import UbicacionMap from '@/components/ListaRestaurantes/DetalleRestaurante/UbicacionMap';
import PublicacionesSimilares from '@/components/ListaRestaurantes/DetalleRestaurante/PublicacionesSimilares';

const DetalleRestaurantes = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const id = searchParams.get('id');
  const { buscarRestaurant } = useContext(ClientContext);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);
  const [ restaurantesSimilares, setRestaurantesSimilares ] = useState(null);  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (id) {
        setIsLoading(true);
        const resultado = await buscarRestaurant(id);
        setRestauranteSeleccionado(resultado.publicacion);
        setRestaurantesSimilares(resultado.publicacionesRelacionadas)
        setIsLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" /> {/* Spinner */}
      </div>
    );
  }

  if (!restauranteSeleccionado) {
    return <div>Restaurante no encontrado</div>;
  }
  
  

  return (
    <Suspense>
      <div className="flex flex-col min-h-screen max-w-screen-xl m-auto bg-[#F9F6EE] px-8 sm:px-12 lg:px-20 py-24">
        <div className="mb-10">
          <Banner 
            title="Restaurantes" 
            subtitle="Descubre nuestras opciones" 
            backgroundImage="/images/restaurantes.jpg" 
          />
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Columna izquierda */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Informacion restaurante={restauranteSeleccionado} />
            <Carousel restaurante={restauranteSeleccionado} />
            {/* <Descripcion restaurante={restauranteSeleccionado} /> */}
            <Caracteristicas restaurante={restauranteSeleccionado} />
          </div>
          
          {/* Columna derecha */}
          <div className="lg:col-span-1 flex flex-col h-full gap-6">
            {/* Contenedor para Contacto y Mapa */}
            <div className="flex flex-col flex-1 gap-6">
              {/* Contacto */}
              <div className="flex-1">
                <Contacto restaurante={restauranteSeleccionado} />
              </div>
              {/* Mapa */}
              <div className="flex-1">
                <UbicacionMap ubicacion={restauranteSeleccionado.coordenadas} />
              </div>
            </div>
            {/* Publicaciones Similares */}
            <div className="mt-auto">
              <PublicacionesSimilares restaurantes={restaurantesSimilares} />
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
};

export default DetalleRestaurantes;
