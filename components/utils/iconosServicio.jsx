import React from "react";
import {
  FaFence,
  FaLeaf,
  FaBroom,
  FaHardHat,
  FaPencilRuler,
  FaVideo,
  FaToolbox,
  FaCut,
  FaHeartbeat,
  FaWrench,
  FaTint,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

export default function iconosServicio({tipo}) {
  const ServicioTipo = {
    Alambrados: "Alambrados",
    Jardineria: "Jardineria",
    LimpiezaTerrenos: "LimpiezaTerrenos",
    Construccion: "Construccion",
    Diseno: "Diseno",
    Filmacion: "Filmacion",
    Equipamiento: "Equipamiento",
    Estetica: "Estetica",
    Salud: "Salud",
    Mecanica: "Mecanica",
    ProvisionDeAgua: "ProvisionDeAgua",
    Seguridad: "Seguridad",
    Traslados: "Traslados",
  };

  const IconoServicio = ({ tipo }) => {
    switch (tipo) {
      case ServicioTipo.Alambrados:
        return <FaFence />;
      case ServicioTipo.Jardineria:
        return <FaLeaf />;
      case ServicioTipo.LimpiezaTerrenos:
        return <FaBroom />;
      case ServicioTipo.Construccion:
        return <FaHardHat />;
      case ServicioTipo.Diseno:
        return <FaPencilRuler />;
      case ServicioTipo.Filmacion:
        return <FaVideo />;
      case ServicioTipo.Equipamiento:
        return <FaToolbox />;
      case ServicioTipo.Estetica:
        return <FaCut />;
      case ServicioTipo.Salud:
        return <FaHeartbeat />;
      case ServicioTipo.Mecanica:
        return <FaWrench />;
      case ServicioTipo.ProvisionDeAgua:
        return <FaTint />;
      case ServicioTipo.Seguridad:
        return <FaShieldAlt />;
      case ServicioTipo.Traslados:
        return <FaTruck />;
      default:
        return null;
    }
  };
  return IconoServicio(tipo);
}
