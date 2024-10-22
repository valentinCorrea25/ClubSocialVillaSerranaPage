import React, {useState, useContext } from "react";
import { Button, Input } from "antd";
import { AdminContext } from "@/context/adminContext";

import TablaGenerica from "../utils/TablaGenerica";

export default function Alquileres({
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
  setModalIsOpenForButtonFloat,
  setTipoDePublicacionACrear,
  setIsModalOpen,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleCreate() {
    setTipoDePublicacionACrear('alquiler');
    setIsModalOpen(true);
    setModalIsOpenForButtonFloat(true);
  }


  return (
    <div>
      <div className="flex space-x-2 justify-between my-2 w-full">
        <Input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm mb-2 w-full"
        />
        <Button onClick={handleCreate} className="bg-[--verde] text-white hidden sm:block"> Crear Alquiler </Button>
      </div>

      <TablaGenerica
        apiEndpoint="/api/alquileres/lista"
        searchQuery={searchQuery}
        mostrarCargarToast={mostrarCargarToast}
        mostrarExitoToast={mostrarExitoToast}
        mostrarFalloToast={mostrarFalloToast}
        setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
        getRowKey={(record) => {
          const tipoPublicacion = Object.keys(record).find((key) =>
            key.startsWith("id_")
          );
          return `${record[tipoPublicacion]}_${tipoPublicacion}`;
        }}
      />
    </div>
  );
}