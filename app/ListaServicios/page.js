"use client";

import React, { useContext, useState, useEffect } from "react";
import { Layout, Skeleton } from "antd";
import ServiciosList from "@/components/ListaServicios/ServiciosList";
import Buscador from "@/components/ListaServicios/Buscador";
import Banner from "@/components/utils/Banners";
import { ClientContext } from "@/context/clientContext";

const ServiciosPage = () => {
  const { todosLosServicios } = useContext(ClientContext);
  const [servicios, setServicios] = useState([]);
  const [filteredServicios, setFilteredServicios] = useState([]);
  const { Content } = Layout;
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todosLosServicios();
        if (data) {
          console.log(data);
          setServicios(data.publicaciones);
          setFilteredServicios(data.publicaciones);
          setNoResults(true);
        } else {
          console.log("publicacion is null after fetch");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, [todosLosServicios]);

  const handleFilterChange = (selectedCategory) => {
    if (selectedCategory === "") {
      // Mostrar todos los servicios
      setFilteredServicios(servicios);
    } else {
      // Filtrar por categoría
      const filtered = servicios.filter(
        (servicio) => servicio.titulo_Servicio === selectedCategory
      );
      setFilteredServicios(filtered);
    }
  };

  // Extraer categorías únicas para el selector
  const categories = Array.from(
    new Set(servicios.map((s) => s.titulo_Servicio))
  );

  return (
    <Layout className="bg-[--blanco]">
      <Content style={{ padding: "40px 10px" }}>
        <Banner
          title="¡Bienvenido a Nuestros Servicios!"
          subtitle="Descubre nuestras ofertas y encuentra lo que necesitas."
          backgroundImage="/images/servicios.jpg"
        />
        <div style={{ padding: "24px", width:"100%" }}>
          <Buscador
            categories={categories}
            onFilterChange={handleFilterChange}
          />
        </div>
        {noResults ? (
          <div>
            <ServiciosList servicios={filteredServicios} />
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col md:flex-row gap-10 mt-5">
            <Skeleton className="w-72" paragraph title />
            <Skeleton className="w-72" paragraph title />
            <Skeleton className="w-72" paragraph title />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default ServiciosPage;
