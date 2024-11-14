import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function PublicacionNoEncontrada() {
  const router = useRouter();

  return (
    <div className="h-[50vh] flex flex-col items-center justify-center">
      <div className="text-center p-8 rounded-lg max-w-2xl mx-auto">
        <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-6 animate-bounce" />

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Publicación no encontrada
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Lo sentimos, la publicación que estás buscando no existe o ha sido
          removida.
        </p>

        <Button
          onClick={() => router.push("/")}
          type="primary"
          size="large"
          icon={<FaHome className="mr-2" />}
          className="flex items-center justify-center mx-auto hover:scale-105 transition-transform duration-200"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
