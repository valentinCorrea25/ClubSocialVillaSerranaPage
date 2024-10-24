"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Buscador from "@/components/ListaAlojamiento/Buscador";
import ListaAlojamientos from "@/components/ListaAlojamiento/ListaAlojamientos";
import { Skeleton } from "antd";
import { ClientContext } from "@/context/clientContext";
import Banners from "@/components/utils/Banners";

const ListaAlojamientosPage = () => {
  const [alquileres, setTodosLosAlquileres] = useState()
  const [filteredAlojamientos, setFilteredAlojamientos] = useState();
  const { todosLosAlquileres } = useContext(ClientContext);
  const [noResults, setNoResults] = useState(false);
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
        const data = await todosLosAlquileres();
        if (data) {
          console.log(data);
          
          setFilteredAlojamientos(data.publicaciones)
          setNoResults(true);
        } else {
          console.log("publicacion is null after fetch");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (id) => {
    router.push(`/ListaAlojamiento/DetalleAlojamiento?id=${id}`);
  };

  return (
    <>
    <div className="flex flex-col bg-[#F9F6EE] sm:px-12 lg:px-20 py-5">
            <Banners
      title="Alojamiento"
      subtitle="Busca tu alojamiento"
      backgroundImage="/images/alojamiento.jpg" 
      />
    </div>
    
    <div
      style={{
        padding: "30px 20px",
        backgroundColor: "#f9f6ee",
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
      
    >

      <div
        style={{
          margin:"10px",
          padding: "10px",
          borderBottom: "1px solid #ddd",
          marginBottom: "40px",
          borderRadius: "4px",
          backgroundColor: "#fff",
        }}
      >
        <Buscador onFilterChange={handleFilterChange} />
      </div>
      {!noResults ? (
        <div className="flex flex-col gap-28">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ListaAlojamientos
          alojamientos={filteredAlojamientos}
          onViewDetails={handleViewDetails}
        />
      )}
    </div>
    </>
  );
};

export default ListaAlojamientosPage;
