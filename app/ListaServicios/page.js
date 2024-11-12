"use client";

import React, { useContext, useState, useEffect } from "react";
import { Layout, Pagination, Skeleton } from "antd";
import ServiciosList from "@/components/ListaServicios/ServiciosList";
import Buscador from "@/components/ListaServicios/Buscador";
import Banner from "@/components/utils/Banners";
import { ServicioTitulo } from "@prisma/client";
import { ClientContext } from "@/context/clientContext";
import { scrollToTop } from "@/components/utils/ControlPublicaciones";

const ServiciosPage = () => {
  const { todosLosServicios } = useContext(ClientContext);
  const [servicios, setServicios] = useState([]);
  const [filteredServicios, setFilteredServicios] = useState([]);
  const { Content } = Layout;
  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [filtroServicio, setFiltroServicio] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todosLosServicios(page, filtroServicio);
        if (data) {
          console.log(data);
          setServicios(ServicioTitulo);
          setFilteredServicios(data.publicaciones);
          setTotal(data.totalPages);
          console.log(data.totalPages);
          
          setNoResults(true);
        } else {
          console.log("publicacion is null after fetch");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, [todosLosServicios, page, filtroServicio]);

  useEffect(() => {
    scrollToTop();
  }, [page]);

  const handleFilterChange = (selectedCategory) => {
    setPage(1);
    if (selectedCategory === "") {
      setFiltroServicio(null);
    } else {
      setFiltroServicio(selectedCategory);
    }
  };
  return (
    <Layout className="bg-[#f9f6ee]">
      <Content style={{ padding: "40px 10px" }}>
        <Banner
          title="¡Bienvenido a Nuestros Servicios!"
          subtitle="Descubre nuestras ofertas y encuentra lo que necesitas."
          backgroundImage="/images/servicios.jpg"
        />
        <div style={{ padding: "24px", width: "100%" }}>
          <Buscador
            categories={servicios}
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
      <Pagination
        current={page}
        onChange={(newPage) => setPage(newPage)}
        total={total*25}
        pageSize={25}
        align="center"
      />
    </Layout>
  );
};

export default ServiciosPage;
