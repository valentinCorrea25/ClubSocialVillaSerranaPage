import React from 'react';
import Banner from '@/components/PublicacionAlojamiento/Banner';
import CaracteristicasAlojamiento from '@/components/PublicacionAlojamiento/CaracteristicasAlojamiento';
import Carousel from '@/components/PublicacionAlojamiento/Carousel';
import DescripcionAloj from '@/components/PublicacionAlojamiento/DescripcionAloj';
import ContactoInfo from '@/components/PublicacionAlojamiento/ContactoInfo';
import InfoAlojamiento from '@/components/PublicacionAlojamiento/InfoAlojamiento';
import PublicacionesSimilares from '@/components/PublicacionAlojamiento/PublicacionesSimilares';
import UbicacionMap from '@/components/PublicacionAlojamiento/UbicacionMap';

const Alojamientos = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F6EE] px-8 sm:px-12 lg:px-20 py-24">
      <div className="mb-10"><Banner 
          title="Alojamientos" 
          subtitle="Descubre nuestras opciones" 
          backgroundImage="/images/alojamiento.jpg" 
        /></div>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"><div className="lg:col-span-2 flex flex-col gap-6"><InfoAlojamiento />
      <div className="w-full"><Carousel /></div>
      <DescripcionAloj />
      <CaracteristicasAlojamiento />
      </div>
        
      <div className="lg:col-span-1 flex flex-col gap-6">
      <div className="flex-1 flex flex-col gap-6">
      <div className="w-full"><ContactoInfo /></div>
      <UbicacionMap /></div><div className="flex-1"><PublicacionesSimilares /></div>
        </div>
      </main>
    </div>
  );
};

export default Alojamientos;
