'use client';
import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import { Spin } from 'antd'; // Importa el spinner de antd
import { ClientContext } from '@/context/clientContext';
import { Suspense } from 'react';

import Informacion from '@/components/ListaRestaurantes/DetalleRestaurante/Informacion';
import Carousel from '@/components/utils/Carousel';
import Descripcion from '@/components/ListaRestaurantes/DetalleRestaurante/Descripcion';
import Caracteristicas from '@/components/ListaRestaurantes/DetalleRestaurante/Caracteristicas';
import Contacto from '@/components/utils/Contacto';
import UbicacionMap from '@/components/utils/UbicacionMap';
import PublicacionesSimilares from '@/components/ListaRestaurantes/DetalleRestaurante/PublicacionesSimilares';
import PublicacionNoEncontrada from '@/components/utils/PublicacionNoEncontrada';

const FixSuspenseRestaurante = (restaurante) => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { buscarRestaurant } = useContext(ClientContext);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);
  const [restaurantesSimilares, setRestaurantesSimilares] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const resultado = await buscarRestaurant(id);
          console.log(resultado);
          setRestauranteSeleccionado(resultado.publicacion);
          setRestaurantesSimilares(resultado.publicacionesRelacionadas);
          if (document != undefined) {
            document.title = resultado.publicacion.titulo
            document.querySelector('meta[name="description"]').content = resultado.publicacion.descripcion;
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      }

    };
    fetchRestaurant();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!restauranteSeleccionado) {
    return <PublicacionNoEncontrada />
  }



  return (
    <div className="flex flex-col min-h-screen max-w-screen-xl m-auto bg-[#F9F6EE] px-3 sm:px-12 lg:px-20 py-10">
      <div className="mb-10">
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Columna izquierda */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Informacion restaurante={restauranteSeleccionado} />
          <Carousel record={restauranteSeleccionado} />
          {/* <Descripcion restaurante={restauranteSeleccionado} /> */}
          <Caracteristicas restaurante={restauranteSeleccionado} />
        </div>

        {/* Columna derecha */}
        <div className="lg:col-span-1 flex flex-col h-full gap-6">
          {/* Contenedor para Contacto y Mapa */}
          <div className="flex flex-col flex-1 gap-6">
            {/* Contacto */}
            <div className="flex-1">
              <Contacto
                nombre_titular={restauranteSeleccionado.nombre_titular}
                mail={restauranteSeleccionado.mail}
                celular={restauranteSeleccionado.celular}
              />
            </div>
            {/* Mapa */}
            <div className="flex-1">
              <UbicacionMap ubicacion={restauranteSeleccionado.ubicacion} />
            </div>
          </div>
          {/* Publicaciones Similares */}
          <div className="mt-auto">
            <PublicacionesSimilares restaurantes={restaurantesSimilares} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default FixSuspenseRestaurante;
