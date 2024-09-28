'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BotonQueEncuentras() {
    const router = useRouter();
  return (
    <button
        onClick={()=>router.push('/queencuentras')}
          type="button"
          class="font-bold text-white border border-[--verde] bg-[--verde-oscuro] focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Que encuentras
    </button>
  )
}
