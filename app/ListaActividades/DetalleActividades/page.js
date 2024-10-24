"use client";
import { Suspense } from 'react';
import FixSuspenseActividades from '@/components/ListaActividades/DetalleActividades/FixSuspenseActividades';


export default function DetalleActividades() {

    return (
    <Suspense>
      <FixSuspenseActividades/>
    </Suspense>
    );
  }
  
  