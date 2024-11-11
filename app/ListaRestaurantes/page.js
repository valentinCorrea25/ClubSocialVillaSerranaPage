'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Buscador from '@/components/ListaRestaurantes/Buscador';
import ListaRestaurantes from '@/components/ListaRestaurantes/ListaRestaurantes';
import Banner from '@/components/utils/Banners';
// import { restaurantesData as data } from '@/test/data';
import { Layout, Alert, Skeleton } from 'antd';
import { ClientContext } from '@/context/clientContext';

const { Content } = Layout;

const ListaRestaurantesPage = () => {
  const { todosLosRestaurantes } = useContext(ClientContext);
  // const [filteredRestaurantes, setFilteredRestaurantes] = useState();
  const [allRestaurantes, setAllRestaurants] = useState();
  const [noResults, setNoResults] = useState(true);
  // const [categories, setCategories] = useState([]);
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await todosLosRestaurantes();
        if (data) {
          setAllRestaurants(data.publicaciones);
          setNoResults(false);
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
    console.log(id + 'id');

    router.push(`/ListaRestaurantes/DetalleRestaurante?id=${id}`);
  };

  return (
    <>
      <div style={{ padding: "10px", margin: "0 auto", maxWidth: "1200px" }}>
        <Banner
          title="Restaurantes"
          subtitle="Descubre nuestras opciones"
          backgroundImage="/images/restaurantes.jpg"

        />
      </div>
      <div className="flex flex-col min-h-screen bg-[#F9F6EE] sm:px-12 lg:px-20 ">

        <Content>
          <div style={{
            textAlign: 'center',
            marginBottom: ''
          }}>
            {/* <Buscador 
            categories={categories}
            onFilterChange={handleFilterChange} 
          /> */}
          </div>
          <div style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: 'transparent'
          }}>
            {noResults ? (
              <div className='flex flex-col '>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ) : (
              <ListaRestaurantes restaurantes={allRestaurantes} onViewDetails={handleViewDetails} />
            )}
          </div>
        </Content>
      </div>
    </>
  );
};

export default ListaRestaurantesPage;
