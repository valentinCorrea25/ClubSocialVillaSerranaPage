import React from 'react'
import { SobreElCLub, Sobrevillaserrana } from '@/components/SobreNosotros/SobreClubyVillaserrana'
import Banner from "@/components/utils/Banners"
export default function SobreNosotros() {
  return (

    <>
      <div className="p-[10px] mx-auto max-w-[1200px]">
        <Banner
          title="Historia"
          subtitle="Descubre un poco sobre nosotros"
          backgroundImage="/images/sobrenosotros.jpeg"
        />
      </div>
      <div className='min-h-screen bg-[#F9F6EE] sm:px-12 lg:px-20 py-5'>
        <SobreElCLub />
        <Sobrevillaserrana />
      </div>
    </>
  )
}
