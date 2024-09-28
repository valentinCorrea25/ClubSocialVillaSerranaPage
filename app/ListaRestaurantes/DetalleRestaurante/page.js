import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { ClientContext } from "@/context/clientContext";
import Banner from "@/components/ListaRestaurantes/DetalleRestaurante/Banner";
import Informacion from "@/components/ListaRestaurantes/DetalleRestaurante/Informacion";
import Carousel from "@/components/ListaRestaurantes/DetalleRestaurante/Carousel";
import Caracteristicas from "@/components/ListaRestaurantes/DetalleRestaurante/Caracteristicas";
import Contacto from "@/components/ListaRestaurantes/DetalleRestaurante/Contacto";
import UbicacionMap from "@/components/ListaRestaurantes/DetalleRestaurante/UbicacionMap";
import PublicacionesSimilares from "@/components/ListaRestaurantes/DetalleRestaurante/PublicacionesSimilares";

const useRestaurantData = (id) => {
  const { buscarRestaurant } = useContext(ClientContext);
  const [data, setData] = useState({ restaurante: null, similares: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const resultado = await buscarRestaurant(id);
          setData({
            restaurante: resultado.publicacion,
            similares: resultado.publicacionesRelacionadas,
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchRestaurant();
  }, [id, buscarRestaurant]);

  return { data, isLoading, error };
};

const DetalleRestaurantes = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useRestaurantData(id);

  const memoizedContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <Spin size="large" aria-label="Cargando detalles del restaurante" />
        </div>
      );
    }

    if (error) {
      return <div role="alert">Error: {error}</div>;
    }

    if (!data.restaurante) {
      return <div role="alert">Restaurante no encontrado</div>;
    }

    return (
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Informacion restaurante={data.restaurante} />
          <Carousel restaurante={data.restaurante} />
          <Caracteristicas restaurante={data.restaurante} />
        </div>
        <div className="lg:col-span-1 flex flex-col h-full gap-6">
          <div className="flex flex-col flex-1 gap-6">
            <div className="flex-1">
              <Contacto restaurante={data.restaurante} />
            </div>
            <div className="flex-1">
              <UbicacionMap ubicacion={data.restaurante.coordenadas} />
            </div>
          </div>
          <div className="mt-auto">
            <PublicacionesSimilares restaurantes={data.similares} />
          </div>
        </div>
      </main>
    );
  }, [data, isLoading, error]);

  return (
    <div className="flex flex-col min-h-screen max-w-screen-xl m-auto bg-[#F9F6EE] px-8 sm:px-12 lg:px-20 py-24">
      <div className="mb-10">
        <Banner
          title="Restaurantes"
          subtitle="Descubre nuestras opciones"
          backgroundImage="/images/restaurantes.jpg"
        />
      </div>
      {memoizedContent}
    </div>
  );
};

export default DetalleRestaurantes;