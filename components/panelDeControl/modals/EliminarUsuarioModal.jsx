import React, { useContext, useState } from "react";
import { Modal, Tag } from "antd";
import { Button } from "antd";
import { AdminContext } from "@/context/adminContext";

export default function EliminarUsuarioModal({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  updateData,
  eliminarUsuario,
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
}) {
  const [isLoading, setLoading] = useState(false);
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onFinish = async () => {
    mostrarCargarToast();
    try {
      await eliminarUsuario(selectedItem.id);
      await updateData();
      mostrarExitoToast('Usuario eliminado con exito');
    }catch(e){
      console.log(e);
      mostrarFalloToast('No se ha podido eliminar al usuario');
    } finally {
      setLoading(false); // Detener el estado de carga, independientemente del resultado
      handleClose(); // Cerrar el modal
    }
  };

  return (
    <>
      <Modal
        title={<div className="text-center"> Eliminar Usuario </div>}
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
        <Tag className="text-lg mb-4">{`${selectedItem.nombre}`}</Tag>

        <>
          <p className="mb-6">
            Estas seguro que deseas eliminar a este usuario?
            <br />
            Sus credenciales no seran validas para el manejo de publicaciones o
            de usuarios
          </p>
        </>
      </Modal>
    </>
  );
}
