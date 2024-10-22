import React from "react";
import { useContext } from "react";
import CrearRestaurantesModal from "./CrearRestaurantesModal";
import CrearAlquilerModal from "./CrearAlquilerModal";
import CrearEventoNoticiaActividadModal from "./CrearEventoNoticiaActividadModal";
import CrearServicioModal from "./CrearServicioModal";

export default function ModalCrearPublicacionesControl({ // DEBERIA ACTUALIZAR LAS TABLAS CUANDO SE CREA
  tipoDePublicacion,
  isModalOpen,
  setIsModalOpen,
  setModalIsOpenForButtonFloat,
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
}) {
  function renderComponent(tipoDePublicacion) {
    switch (tipoDePublicacion) {


      case "restaurante":
        return (
          <CrearRestaurantesModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
            mostrarCargarToast={mostrarCargarToast}
            mostrarExitoToast={mostrarExitoToast}
            mostrarFalloToast={mostrarFalloToast}
          />
        );


      case "alquiler":
        return (
          <CrearAlquilerModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
            mostrarCargarToast={mostrarCargarToast}
            mostrarExitoToast={mostrarExitoToast}
            mostrarFalloToast={mostrarFalloToast}
          />
        );

        
      case "servicio":
        return (<CrearServicioModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
          mostrarCargarToast={mostrarCargarToast}
          mostrarExitoToast={mostrarExitoToast}
          mostrarFalloToast={mostrarFalloToast}
        />);


      case "evento_noticia_actividad":
        return (<CrearEventoNoticiaActividadModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
          mostrarCargarToast={mostrarCargarToast}
          mostrarExitoToast={mostrarExitoToast}
          mostrarFalloToast={mostrarFalloToast}
        />)
      default:
        return "desconocido";
    }
  }

  return renderComponent(tipoDePublicacion);
}
