"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Buscador from "@/components/ListaAlojamiento/Buscador";
import ListaAlojamientos from "@/components/ListaAlojamiento/ListaAlojamientos";
import { Pagination, Skeleton } from "antd";
import { ClientContext } from "@/context/clientContext";
import Banners from "@/components/utils/Banners";
import { scrollToTop } from "@/components/utils/ControlPublicaciones";

const ListaAlojamientosPage = () => {
  const [alquileres, setTodosLosAlquileres] = useState()
  const [filteredAlojamientos, setFilteredAlojamientos] = useState();
  const { todosLosAlquileres } = useContext(ClientContext);
  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const router = useRouter();

  const handleFilterChange = (filters) => {
    const { priceRange, capacity } = filters;
    console.log(alquileres + 'ogoalsd');

    const filtered = alquileres.filter(
      (alojamiento) =>
        alojamiento.price >= priceRange[0] &&
        alojamiento.price <= priceRange[1] &&
        alojamiento.capacity >= capacity
    );

    if (filtered.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

    setFilteredAlojamientos(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todosLosAlquileres(page);
        if (data) {
          console.log(data);
          setFilteredAlojamientos(data.publicaciones)
          setTotal(data.totalPages);
          setNoResults(true);
        } else {
          console.log("publicacion is null after fetch");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    scrollToTop();
  }, [page]);

  const handleViewDetails = (id) => {
    router.push(`/ListaAlojamiento/DetalleAlojamiento?id=${id}`);
  };

  return (
    <>

      <div className="p-[10px] mx-auto max-w-[1200px]">
        <Banners
          title="Alojamientos"
          subtitle="Descubre los mejores alojamientos en Villa Serrana"
          backgroundImage="/images/actividad.jpg"
        />
      </div>
      <div className="flex flex-col min-h-screen bg-[#F9F6EE] sm:px-12 lg:px-20 py-5">


        <Buscador onFilterChange={handleFilterChange} />
        {!noResults ? (
          <div className="flex items-center justify-center flex-col md:flex-row gap-10">
            <Skeleton className="w-72" paragraph title />
            <Skeleton className="w-72" paragraph title />
            <Skeleton className="w-72" paragraph title />
          </div>
        ) : (
          <ListaAlojamientos
            alojamientos={filteredAlojamientos}
            onViewDetails={handleViewDetails}
          />
        )}
      </div>
      <Pagination
        current={page}
        onChange={(newPage) => setPage(newPage)}
        total={total * 25}
        pageSize={25}
        align="center"
      />
    </>
  );
};

export default ListaAlojamientosPage;
