"use client";

import { useContext, useEffect, useState } from "react";
import EventosList from "@/components/ListaNoticiasEventos/EventosList";
import Banner from "@/components/utils/Banners";
import { ClientContext } from "@/context/clientContext";
import { Skeleton } from "antd";

const EventosPage = () => {
  const { todasLasNoticiasEventos } = useContext(ClientContext);
  const appStyle = { padding: "10px", margin: "0 auto", maxWidth: "1200px" };
  const [noticiasEventos, setNoticiasEventos] = useState();
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todasLasNoticiasEventos();
        if (data) {
          setNoticiasEventos(data.publicaciones);
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
  // const headerStyle = { textAlign: 'center', marginBottom: '40px', color: '#333' };

  return (
    <div style={appStyle}>
      <Banner
        title="Eventos y Noticias"
        subtitle="Descubre nuestros últimos eventos y noticias"
        backgroundImage="/images/eventos.jpg"
      />

      {!noResults ? (
        <div className="flex items-center justify-center flex-col md:flex-row gap-10">
          <Skeleton className="w-72" paragraph title/>
          <Skeleton className="w-72" paragraph title/>
          <Skeleton className="w-72" paragraph title/>
        </div>
      ) : (
        <EventosList noticiasEventos={noticiasEventos}/>
      )}
    </div>
  );
};

export default EventosPage;
