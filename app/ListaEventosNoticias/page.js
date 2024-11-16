"use client";

import { useContext, useEffect, useState } from "react";
import EventosList from "@/components/ListaNoticiasEventos/EventosList";
import Banner from "@/components/utils/Banners";
import { ClientContext } from "@/context/clientContext";
import { Pagination, Skeleton } from "antd";
import { scrollToTop } from "@/components/utils/ControlPublicaciones";
import Buscador from "@/components/ListaNoticiasEventos/Buscador";

const EventosPage = () => {
  const { todasLasNoticiasEventos } = useContext(ClientContext);

  const [noticiasEventos, setNoticiasEventos] = useState();
  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [filter, setFilter] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilterChange = () => {
    setPage(1);
    setFilter(!filter);
   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todasLasNoticiasEventos(page, startDate, endDate);
        if (data) {
          setNoticiasEventos(data.publicaciones);
          setNoResults(true);
          setTotal(data.totalPages);
        } else {
          console.log("publicacion is null after fetch");
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchData();
  }, [page, filter]);

  useEffect(() => {
    scrollToTop();
  }, [page]);

  return (
    <div className="p-[10px] mx-auto max-w-[1200px]">
      <Banner
        title="Eventos y Noticias"
        subtitle="Descubre nuestros últimos eventos y noticias"
        backgroundImage="/images/eventos.jpg"
      />
      <Buscador onFilterChange={handleFilterChange} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate}/>
      {!noResults ? (
        <div className="flex items-center justify-center flex-col md:flex-row gap-10 mt-10">
          <Skeleton className="w-72" paragraph title />
          <Skeleton className="w-72" paragraph title />
          <Skeleton className="w-72" paragraph title />
        </div>
      ) : (
        <EventosList noticiasEventos={noticiasEventos} />
      )}

      <Pagination
        current={page}
        onChange={(newPage) => setPage(newPage)}
        total={total * 9}
        pageSize={9}
        align="center"
      />
    </div>
  );
};

export default EventosPage;
