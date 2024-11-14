"use client";

import React, { useState, useEffect, useContext, } from "react";
import { useRouter } from "next/navigation";
import ActividadesList from "@/components/ListaActividades/ActividadesList";
import Banner from "@/components/utils/Banners";
import { ClientContext } from "@/context/clientContext";
import { Pagination, Skeleton } from "antd";
import { scrollToTop } from "@/components/utils/ControlPublicaciones";

const ActividadPage = () => {
  const { todasLasActividades } = useContext(ClientContext);
  const [actividades, setActividades] = useState();
  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const appStyle = { padding: "10px", margin: "0 auto", width: "100%" };
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todasLasActividades(page);
        if (data) {
          setActividades(data.publicaciones);
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
  }, [page]);

  useEffect(() => {
    scrollToTop();
  }, [page]);

  return (
    <><div className="p-[10px] mx-auto max-w-[1200px]">
      <Banner
        title="Actividades"
        subtitle="Descubre nuestras actividades más recientes"
        backgroundImage="/images/actividad.jpg"
      />
    </div>
      <div className="flex flex-col min-h-screen bg-[#F9F6EE] sm:px-12 lg:px-20 ">

        {!noResults ? (
          <div className="flex items-center justify-center flex-col md:flex-row gap-10">
            <Skeleton className="w-72" paragraph title />
            <Skeleton className="w-72" paragraph title />
            <Skeleton className="w-72" paragraph title />
          </div>
        ) : (
          <ActividadesList actividades={actividades}
          />
        )}
        <Pagination
          current={page}
          onChange={(newPage) => setPage(newPage)}
          total={total * 25}
          pageSize={25}
          align="center"
        />
      </div>
    </>
  );
};

export default ActividadPage;
