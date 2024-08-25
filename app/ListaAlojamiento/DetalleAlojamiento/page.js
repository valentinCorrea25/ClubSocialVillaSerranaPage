'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { alojamientos as allAlojamientos } from '@/test/data'; 
import { Suspense } from 'react';
import Banner from '@/components/ListaAlojamiento/DetalleAlojamiento/Banner';
import Informacion from '@/components/ListaAlojamiento/DetalleAlojamiento/Informacion'; 
import Carousel from '@/components/ListaAlojamiento/DetalleAlojamiento/Carousel';
import Descripcion from '@/components/ListaAlojamiento/DetalleAlojamiento/Descripcion';
import Caracteristicas from '@/components/ListaAlojamiento/DetalleAlojamiento/Caracteristicas';
import Contacto from '@/components/ListaAlojamiento/DetalleAlojamiento/Contacto';
import UbicacionMap from '@/components/ListaAlojamiento/DetalleAlojamiento/UbicacionMap'; 
import PublicacionesSimilares from '@/components/ListaAlojamiento/DetalleAlojamiento/PublicacionesSimilares';

const DetalleAlojamientos = () => {
  // const searchParams = useSearchParams();
  // const id = searchParams.get('id'); 
  
  // const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState(
  //   allAlojamientos.find(alojamiento => alojamiento.id === parseInt(id, 10)) || null
  // );

  // Actualiza el estado cuando cambie el ID en la URL
  // useEffect(() => {
  //   if (id) {
  //     setAlojamientoSeleccionado(allAlojamientos.find(alojamiento => alojamiento.id === parseInt(id, 10)));
  //   }
  // }, [id]);

  // if (!alojamientoSeleccionado) {
  //   return <div>Alojamiento no encontrado</div>;
  // }

  return (
    <div>hola</div>
    //   <Suspense>
    //     <div className="container flex flex-col min-h-screen bg-[#F9F6EE] px-12 sm:px-16 lg:px-24 py-32"> 
    //       <div className="mb-14"><Banner title="Alojamientos" subtitle="Descubre nuestras opciones" 
    //       backgroundImage="/images/alojamiento.jpg" /></div>

    //     <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"> 
    //       <div className="lg:col-span-2 flex flex-col gap-8"> 
    //         <Informacion alojamiento={alojamientoSeleccionado} />
    //         <Carousel alojamiento={alojamientoSeleccionado} />
    //         <Descripcion alojamiento={alojamientoSeleccionado} />
    //         <Caracteristicas caracteristicas={alojamientoSeleccionado.caracteristicas} />
    //       </div>

    //       <div className="lg:col-span-1 flex flex-col gap-8"><div className="flex-1 flex flex-col gap-8"> 
    //         <div className="w-full"><Contacto contacto={alojamientoSeleccionado.contacto} /></div>
    //         <UbicacionMap ubicacion={alojamientoSeleccionado.location} /></div>
    //         <div className="flex-1"><PublicacionesSimilares onSelect={setAlojamientoSeleccionado} /></div>
    //       </div>
    //     </main>
    //   </div>
    // </Suspense>
  );
};

export default DetalleAlojamientos;
