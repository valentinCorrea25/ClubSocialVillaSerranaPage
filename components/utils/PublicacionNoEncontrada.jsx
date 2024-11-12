import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

export default function PublicacionNoEncontrada() {
    const router = useRouter();
  return (
    <>
      <div className="text-4xl p-10 text-center">Publicacion no encontrada</div>
      <div className="flex justify-center pb-10">
        <Button onClick={()=>router.push('/')}>Volver al inicio</Button>
      </div>
    </>
  );
}
