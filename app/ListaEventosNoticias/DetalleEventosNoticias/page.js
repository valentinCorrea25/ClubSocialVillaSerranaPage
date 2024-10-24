"use client";
import { Suspense } from 'react';
import FixSuspenseNoticiaEventos from '@/components/ListaNoticiasEventos/DetallaNoticiasEventos/FixSuspenseNoticiaEventos';


export default function DetalleAlojamiento() {

    return (
    <Suspense>
      <FixSuspenseNoticiaEventos/>
    </Suspense>
    );
  }
  
  