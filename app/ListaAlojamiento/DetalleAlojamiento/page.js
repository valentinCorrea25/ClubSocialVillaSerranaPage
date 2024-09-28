import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { ClientContext } from "@/context/clientContext";
import Banner from "@/components/ListaAlojamiento/DetalleAlojamiento/Banner";
import Informacion from "@/components/ListaAlojamiento/DetalleAlojamiento/Informacion";
import Carousel from "@/components/ListaAlojamiento/DetalleAlojamiento/Carousel";
import Descripcion from "@/components/ListaAlojamiento/DetalleAlojamiento/Descripcion";
import Caracteristicas from "@/components/ListaAlojamiento/DetalleAlojamiento/Caracteristicas";
import UbicacionMap from "@/components/ListaAlojamiento/DetalleAlojamiento/UbicacionMap";
import PublicacionesSimilares from "@/components/ListaAlojamiento/DetalleAlojamiento/PublicacionesSimilares";

const useAccommodationData = (id) => {
  const { buscarAlquiler } = useContext(ClientContext);
  const [data, setData] = useState({ alojamiento: null, similares: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const resultado = await buscarAlquiler(id);
          if (resultado) {
            setData({
              alojamiento: resultado.publicacion,
              similares: resultado.publicacionesRelacionadas,
            });
          } else {
            setError("Alojamiento no encontrado");
          }
        } catch (err) {
          setError(err.message || "Error al cargar los datos");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [id, buscarAlquiler]);

  return { data, isLoading, error };
};

const DetalleAlojamientos = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useAccommodationData(id);

  const memoizedContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <Spin size="large" aria-label="Cargando detalles del alojamiento" />
        </div>
      );
    }

    if (error) {
      return <div role="alert" className="text-center text-red-500">{error}</div>;
    }

    if (!data.alojamiento) {
      return <div role="alert" className="text-center">Alojamiento no encontrado</div>;
    }

    return (
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Informacion alojamiento={data.alojamiento} />
          <Carousel alojamiento={data.alojamiento} />
          <Descripcion alojamiento={data.alojamiento} />
          <Caracteristicas alojamiento={data.alojamiento} />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-8">
          <div className="flex-1 flex flex-col gap-8">
            <UbicacionMap ubicacion={data.alojamiento.ubicacion} />
          </div>
          <div className="flex-1">
            <PublicacionesSimilares similares={data.similares} />
          </div>
        </div>
      </main>
    );
  }, [data, isLoading, error]);

  return (
    <div className="container flex flex-col max-w-screen-xl bg-[#F9F6EE] px-12 sm:px-16 lg:px-24 py-24 m-auto h-full">
      <div className="mb-14">
        <Banner
          title="Alojamientos"
          subtitle="Descubre nuestras opciones"
          backgroundImage="/images/alojamiento.jpg"
        />
      </div>
      {memoizedContent}
    </div>
  );
};

export default DetalleAlojamientos;