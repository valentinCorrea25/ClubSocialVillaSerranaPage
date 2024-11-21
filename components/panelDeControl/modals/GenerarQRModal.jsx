import React, { useContext, useEffect, useState } from "react";
import { Input, Modal, QRCode, Space, Tag } from "antd";
import { Button } from "antd";
import { AdminContext } from "@/context/adminContext";
import {
  obtenerIdPublicacion,
  obtenerRutaDetalle,
  obtenerTipoSinPrefijo,
  tituloCorrectoServicio,
} from "@/components/utils/ControlPublicaciones";

export default function GenerarQRModal({
  isModalOpen,
  setIsModalOpen,
  selectedItem,
  setModalIsOpenForButtonFloat,
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

      console.log(tipo + '000000 ');
      

      setIdPublicacion(id);
      setTipoSinPrefijo(tipo);
      setRutaDetalle(ruta);
      setText(ruta);
    }
  }, [selectedItem]);

  const logo =
    "https://res.cloudinary.com/dvzf7szuo/image/upload/v1729721150/logo_b5nmbu.webp";
  const bgImage =
    "https://res.cloudinary.com/dvzf7szuo/image/upload/v1729721600/WhatsApp_Image_2024-10-10_at_1.24.09_PM_z1qrkq.jpg";

  return (
    <>
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 0;
            }
            body * {
              visibility: hidden;
            }
            .printable-area, .printable-area * {
              visibility: visible;
            }
            .hidden-print {
              display: none !important;
            }
            .printable-area {
              position: fixed;
              left: 0;
              top: 0;
              width: 100vw;
              height: 100vh;
              background-image: url(${bgImage});
              background-size: cover;
              background-position: center;
              background-color: #006400;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0;
              margin: 0;
            }
            .print-content {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              width: 80%;
              max-width: 500px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            .qr-container {
              display: flex;
              justify-content: center;
              margin-bottom: 1.5rem;
            }
              .second-page, .third-page, .other-pages {
                display: none;
              }
          }
        `}
      </style>
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
          <div className="print-content">
            <Space direction="vertical" align="center" className="w-full">
              <QRCode icon={logo} size={200} value={text || "-"} />
              <div className="flex flex-col items-center gap-2">
                <div className="text-center flex items-center">
                  {idPublicacion && (
                    <Tag className="text-lg">{`${tipoSinPrefijo} ${
                      selectedItem.titulo_Servicio
                        ? tituloCorrectoServicio(selectedItem.titulo_Servicio)
                        : ""
                    }`}</Tag>
                  )}
                  <Tag className="text-lg my-2 overflow-hidden">
                    {`${selectedItem.titulo.slice(0, 55)}${
                      selectedItem.titulo.length > 55 ? "..." : ""
                    }`}
                  </Tag>
                </div>
                {selectedItem.descripcion ? (
                  <div className="text-center">
                    <strong>Descripción:</strong> {selectedItem.descripcion}
                  </div>
                ) : null}
              </div>
            </Space>
          </div>
          <Button
            className="hidden-print w-1/2 m-auto mt-4"
            onClick={() => {
              window.print();
            }}
          >
            Imprimir
          </Button>
        </div>
      </Modal>
    </>
  );
}
