"use client";

import React, { useState, useEffect, useContext } from "react";
import ActividadesList from "@/components/ListaActividades/ActividadesList";
import Banner from "@/components/ListaActividades/Banner";
import { ClientContext } from "@/context/clientContext";
import { Skeleton } from "antd";

const ActividadPage = () => {
  const { todasLasActividades } = useContext(ClientContext);
  const [actividades, setActividades] = useState();
  const [noResults, setNoResults] = useState(false);
  const appStyle = { padding: "10px", margin: "0 auto", width: "100%" };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todasLasActividades();
        if (data) {
          setActividades(data.publicaciones);
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

  return (
    <div style={appStyle} className="flex flex-col justify-center">
      <Banner
        title="Actividades"
        subtitle="Descubre nuestras actividades más recientes"
        backgroundImage="/images/actividad.jpg"
      />
      {!noResults ? (
        <div className="flex items-center justify-center flex-col md:flex-row gap-10">
          <Skeleton className="w-72" paragraph title/>
          <Skeleton className="w-72" paragraph title/>
          <Skeleton className="w-72" paragraph title/>
        </div>
      ) : (
        <ActividadesList actividades={actividades} />
      )}
    </div>
  );
};

export default ActividadPage;
