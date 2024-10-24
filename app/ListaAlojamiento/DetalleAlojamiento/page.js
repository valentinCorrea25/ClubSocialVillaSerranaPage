"use client";
import { Suspense } from 'react';
import FixSuspenseAlojamiento from '@/components/ListaAlojamiento/DetalleAlojamiento/FixSuspenseAlojamiento';


export default function DetalleAlojamiento() {

    return (
    <Suspense>
      <FixSuspenseAlojamiento/>
    </Suspense>
    );
  }
  
  