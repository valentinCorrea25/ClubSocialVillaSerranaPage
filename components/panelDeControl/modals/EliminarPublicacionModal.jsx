import React, { useContext, useEffect, useState } from "react";
import { Modal, Tag } from "antd";
import {
  Button,
  Form,
  Input,
} from "antd";
import { AdminContext } from "@/context/adminContext";

export default function EliminarPublicacionModal({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  updateData
}) {
  const { eliminarPublicacion } = useContext(AdminContext);
  const [isLoading, setLoading] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const idPublicacion = selectedItem
    ? Object.keys(selectedItem).find((key) => key.startsWith("id_"))
    : null;

  const tipoSinPrefijo = idPublicacion
    ? idPublicacion.replace("id_", "")
    : "Tipo Desconocido";

    const onFinish = async (values) => {
      setLoading(true); // Mostrar el estado de carga inmediatamente
    
      let tipoDePublicacion = '';
    
      switch (tipoSinPrefijo.toLowerCase()) {
        case 'restaurant':
          tipoDePublicacion = 'restaurantes';
          break;
        case 'alquiler':
          tipoDePublicacion = 'alquileres';
          break;
        case 'servicio':
          tipoDePublicacion = 'servicios';
          break;
        case 'eventonoticia':
          tipoDePublicacion = 'eventosnoticias';
          break;
        case 'actividad':
          tipoDePublicacion = 'actividades';
          break;
        default:
          tipoDePublicacion = 'desconocido';
      }
    
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
            <Button
              loading={isLoading}
              onClick={() => onFinish()}
              danger
            >
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
          <p className="mb-6">Estas seguro que deseas eliminar esta publicacion?</p>
        </>
      </Modal>
    </>
  );
}
