"use client";
import { Suspense } from 'react';
import ServicioDetalle from '@/components/ListaServicios/DetalleServicio';


export default function DetalleAlojamiento() {

    return (
    <Suspense>
      <ServicioDetalle/>
    </Suspense>
    );
  }