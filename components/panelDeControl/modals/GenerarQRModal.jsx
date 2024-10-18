import React, { useContext, useEffect, useState } from "react";
import { Input, Modal, QRCode, Space, Tag } from "antd";
import { Button } from "antd";
import { AdminContext } from "@/context/adminContext";
import logo from "@/public/images/logo.png";
import {
  obtenerIdPublicacion,
  obtenerTipoSinPrefijo,
  obtenerRutaDetalle,
} from "@/components/utils/ControlPublicaciones"; // Importa las funciones

export default function GenerarQRModal({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  setModalIsOpenForButtonFloat
}) {
  const [idPublicacion, setIdPublicacion] = useState(null);
  const [tipoSinPrefijo, setTipoSinPrefijo] = useState("Tipo Desconocido");
  const [rutaDetalle, setRutaDetalle] = useState("");
  const [text, setText] = useState("");

  const handleClose = () => {
    setIsModalOpen(false);
    setModalIsOpenForButtonFloat(false);
  };

  useEffect(() => {
    if (selectedItem) {
      const id = obtenerIdPublicacion(selectedItem);
      const tipo = obtenerTipoSinPrefijo(id);
      const ruta = obtenerRutaDetalle(tipo, id, selectedItem);

      setIdPublicacion(id);
      setTipoSinPrefijo(tipo);
      setRutaDetalle(ruta);
      setText(ruta);
    }
  }, [selectedItem]);

  return (
    <Modal
      title={
        <div className="text-center">Generar código QR de Publicación</div>
      }
      open={isModalOpen}
      onCancel={handleClose}
      footer={
        <>
          <Button onClick={handleClose}>Salir</Button>
        </>
      }
    >
      <div className="flex justify-center flex-col printable-area">
        <Space direction="vertical" align="center">
          <QRCode icon={logo} size={200} value={text || "-"} />
        </Space>
        <div className="flex flex-col justify-center gap-2 mx-auto">
          <div className="m-auto">
            <Tag className="text-lg my-2">{`Título: ${selectedItem.titulo}`}</Tag>
            {idPublicacion ? (
              <Tag className="text-lg mb-4">
                {`${tipoSinPrefijo} ID: ${selectedItem[idPublicacion]}`}
              </Tag>
            ) : (
              "ID no disponible"
            )}
          </div>
          <div className="mb-2">Descripcion: {selectedItem.descripcion}</div>

          <Button
            className="hidden-print w-1/2 m-auto"
            onClick={() => {
              window.print();
            }}
          >
            Imprimir
          </Button>
        </div>
      </div>
    </Modal>
  );
}
