import React, { useContext, useState } from "react";
import { Modal, Tag } from "antd";
import { Button } from "antd";
import { AdminContext } from "@/context/adminContext";
import {
  obtenerIdPublicacion,
  obtenerTipoSinPrefijo,
  obtenerTipoDePublicacion,
} from "@/components/utils/ControlPublicaciones"; // Importa las funciones

export default function EliminarPublicacionModal({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  updateData,
}) {
  const { eliminarPublicacion } = useContext(AdminContext);
  const [isLoading, setLoading] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const idPublicacion = obtenerIdPublicacion(selectedItem);
  const tipoSinPrefijo = obtenerTipoSinPrefijo(idPublicacion);

  const onFinish = async () => {
    const tipoDePublicacion = obtenerTipoDePublicacion(tipoSinPrefijo);
    try {
      await eliminarPublicacion(selectedItem[idPublicacion], tipoDePublicacion);
      await updateData(); // Actualizar los datos después de modificar
    } finally {
      setLoading(false); // Detener el estado de carga, independientemente del resultado
      handleClose(); // Cerrar el modal
    }
  };

  return (
    <>
      <Modal
        title={<div className="text-center"> Eliminar Publicacion </div>}
        open={isModalOpen}
        onCancel={handleClose}
        footer={
          <>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button loading={isLoading} onClick={() => onFinish()} danger>
              Eliminar
            </Button>
          </>
        }
      >
        {idPublicacion ? (
          <Tag className="text-lg mb-4">
            {`${tipoSinPrefijo} ID: ${selectedItem[idPublicacion]}`}
          </Tag>
        ) : (
          "ID no disponible"
        )}
        <>
          <p className="mb-6">
            Estas seguro que deseas eliminar esta publicacion?
          </p>
        </>
      </Modal>
    </>
  );
}
