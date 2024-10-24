"use client";
import { Suspense } from 'react';
import FixSuspenseRestaurante from '@/components/ListaRestaurantes/DetalleRestaurante/FixSuspenseRestaurante';


export default function DetalleAlojamiento() {

    return (
    <Suspense>
      <FixSuspenseRestaurante/>
    </Suspense>
    );
  }
  
  