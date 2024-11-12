"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Buscador from "@/components/ListaRestaurantes/Buscador";
import ListaRestaurantes from "@/components/ListaRestaurantes/ListaRestaurantes";
import Banner from "@/components/utils/Banners";
// import { restaurantesData as data } from '@/test/data';
import { Layout, Alert, Skeleton, Pagination } from "antd";
import { ClientContext } from "@/context/clientContext";
import { scrollToTop } from "@/components/utils/ControlPublicaciones";

const { Content } = Layout;

const ListaRestaurantesPage = () => {
  const { todosLosRestaurantes } = useContext(ClientContext);
  // const [filteredRestaurantes, setFilteredRestaurantes] = useState();
  const [allRestaurantes, setAllRestaurants] = useState();
  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todosLosRestaurantes(page);
        if (data) {
          setAllRestaurants(data.publicaciones);
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
    console.log(id + "id");

    router.push(`/ListaRestaurantes/DetalleRestaurante?id=${id}`);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#F9F6EE] sm:px-12 lg:px-20 py-5">
        <Banner
          title="Restaurantes"
          subtitle="Descubre nuestras opciones"
          backgroundImage="/images/restaurantes.jpg"
        />

        <Content>
          <div
            style={{
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            {/* <Buscador 
            categories={categories}
            onFilterChange={handleFilterChange} 
          /> */}
          </div>
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
              backgroundColor: "transparent",
            }}
          >
            {!noResults ? (
              <div className="flex flex-col ">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ) : (
              <ListaRestaurantes
                restaurantes={allRestaurantes}
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
        </Content>
      </div>
    </>
  );
};

export default ListaRestaurantesPage;
