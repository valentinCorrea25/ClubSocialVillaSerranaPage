import {
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
  FaStore,
  FaHome,
  FaBolt,
  FaSwimmingPool,
  FaTrailer
} from "react-icons/fa";

export const dateFormat = "DD/MM/YYYY";

export const obtenerTipoDePublicacion = (tipoSinPrefijo) => {
  switch (tipoSinPrefijo.toLowerCase()) {
    case "restaurant":
      return "restaurantes";
    case "alquiler":
      return "alquileres";
    case "servicio":
      return "servicios";
    case "eventonoticia":
      return "eventosnoticias";
    case "actividad":
      return "actividades";
    default:
      return "desconocido";
  }
};

export const obtenerDireccionDePublicacion = (tipoSinPrefijo, id) => {
  switch (tipoSinPrefijo.toLowerCase()) {
    case "restaurant":
      return `/ListaRestaurantes/DetalleRestaurante?id=${id}`;
    case "alquiler":
      return `/ListaAlojamiento/DetalleAlojamiento?id=${id}`;
    case "servicio":
      return "/ListaServicios";
    case "eventonoticia":
      return `/ListaEventosNoticias/DetalleEventosNoticias?id=${id}`;
    case "actividad":
      return `/ListaActividades/DetalleActividades?id=${id}`;
    default:
      return "desconocido";
  }
};

export const obtenerIdPublicacion = (selectedItem) => {
  return selectedItem
    ? Object.keys(selectedItem).find((key) => key.startsWith("id_"))
    : null;
};

export const obtenerTipoSinPrefijo = (idPublicacion) => {
  return idPublicacion ? idPublicacion.replace("id_", "") : "Tipo Desconocido";
};

export const obtenerRutaDetalle = (
  tipoSinPrefijo,
  idPublicacion,
  selectedItem
) => {
  let domain;
  let tipoRuta;
  if (typeof window !== "undefined") {
    domain = window.location.origin;
  } else {
    domain = "default-domain";
  }

  switch (tipoSinPrefijo) {
    case "Alquiler":
      tipoRuta = "ListaAlojamiento/DetalleAlojamiento?";
      break;
    case "Restaurant":
      tipoRuta = "ListaRestaurantes/DetalleRestaurante?";
      break;
    case "Actividad":
      tipoRuta = "ListaActividades/DetalleActividad?";
      break;
    case "NoticiaEvento":
      tipoRuta = "ListaNoticiaEventos/DetalleNoticiaEvento?";
      break;
    case "Servicio":
      tipoRuta = "ListaServicios/DetalleServicio?";
      break;
  }
  console.log(tipoRuta);

  return `${domain}/${tipoRuta}id=${selectedItem[idPublicacion]}`;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export function extraerIdDelMensaje(mensaje) {
  // Expresión regular para encontrar el id después de "id: "
  const regex = /id:\s*(\d+)/;

  // Ejecutar la expresión regular en el mensaje
  const match = mensaje.match(regex);

  // Si hay una coincidencia, retornar el primer grupo de captura
  if (match) {
    return parseInt(match[1], 10); // Convertir a número entero
  } else {
    return null; // Retornar null si no se encuentra un id
  }
}

export function getCoordsGoogleMaps(url) {
  try {
    if (typeof url !== "string") {
      throw new Error("URL no válida");
    }

    // Expresión regular para extraer las coordenadas
    var regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    var match = url.match(regex);

    if (match) {
      var lat = match[1];
      var lon = match[2];
      return [lat, lon];
    } else {
      return false;
    }
  } catch (e) {
    return e.message;
  }
}

// Enum para los tipos de servicio
const ServicioTipo = {
  Alambrados: "Alambrados",
  Almacenes: "Almacenes",
  Jardineria: "Jardineria",
  LimpiezaTerrenos: "LimpiezaTerrenos",
  LimpiezaCasas: "LimpiezaCasas",
  Construccion: "Construccion",
  Diseno: "Diseno",
  Filmacion: "Filmacion",
  Electricista: "Electricista",
  Equipamiento: "Equipamiento",
  Estetica: "Estetica",
  Piscinas: "Piscinas",
  Salud: "Salud",
  Mecanica: "Mecanica",
  ProvisionDeAgua: "ProvisionDeAgua",
  Seguridad: "Seguridad",
  Traslados: "Traslados",
};

export function iconosSegunTipoServicio(tipoServicio) {
  let IconComponent;
  switch (tipoServicio) {
    case ServicioTipo.Alambrados:
      IconComponent = FaTrailer;
      break;
    case ServicioTipo.Almacenes:
      IconComponent = FaStore;
      break;
    case ServicioTipo.Construccion:
      IconComponent = FaHardHat;
      break;
    case ServicioTipo.Diseno:
      IconComponent = FaPencilRuler;
      break;
    case ServicioTipo.Electricista:
      IconComponent = FaBolt;  // Ícono de rayo/electricidad
      break;
    case ServicioTipo.Equipamiento:
      IconComponent = FaToolbox;
      break;
    case ServicioTipo.Estetica:
      IconComponent = FaCut;
      break;
    case ServicioTipo.Filmacion:
      IconComponent = FaVideo;
      break;
    case ServicioTipo.Jardineria:
      IconComponent = FaLeaf;
      break;
    case ServicioTipo.LimpiezaCasas:
      IconComponent = FaHome;
      break;
    case ServicioTipo.LimpiezaTerrenos:
      IconComponent = FaBroom;
      break;
    case ServicioTipo.Mecanica:
      IconComponent = FaWrench;
      break;
    case ServicioTipo.Piscinas:
      IconComponent = FaSwimmingPool;
      break;
    case ServicioTipo.ProvisionDeAgua:
      IconComponent = FaTint;
      break;
    case ServicioTipo.Salud:
      IconComponent = FaHeartbeat;
      break;
    case ServicioTipo.Seguridad:
      IconComponent = FaShieldAlt;
      break;
    case ServicioTipo.Traslados:
      IconComponent = FaTruck;
      break;
    default:
      return null;
  }

  return IconComponent ? (
    <IconComponent style={{ fontSize: "24px", textAlign: "center" }} />
  ) : null;
}

// Función para obtener el título correcto del servicio
export function tituloCorrectoServicio(tipoServicio) {
  switch (tipoServicio) {
    case ServicioTipo.Alambrados:
      return "Alambrados";
    case ServicioTipo.Almacenes:
      return "Almacenes";
    case ServicioTipo.Jardineria:
      return "Jardinería";
    case ServicioTipo.LimpiezaTerrenos:
      return "Limpieza de terrenos";
    case ServicioTipo.Construccion:
      return "Construcción";
    case ServicioTipo.Diseno:
      return "Diseño";
    case ServicioTipo.Filmacion:
      return "Filmación";
    case ServicioTipo.Equipamiento:
      return "Equipamiento";
    case ServicioTipo.Estetica:
      return "Estética";
    case ServicioTipo.Salud:
      return "Salud";
    case ServicioTipo.Mecanica:
      return "Mecánica";
    case ServicioTipo.ProvisionDeAgua:
      return "Provisión de agua";
    case ServicioTipo.Seguridad:
      return "Seguridad";
    case ServicioTipo.Traslados:
      return "Traslados";
    case ServicioTipo.Piscinas:
      return "Piscinas";
    case ServicioTipo.Electricista:
      return "Electricista";
    case ServicioTipo.LimpiezaCasas:
      return "Limpieza de casas";
    default:
      throw new Error("Tipo de servicio no reconocido");
  }
}

export function obtenerTipoServicioPorTitulo(titulo) {
  switch (titulo) {
    case "Alambrados":
      return ServicioTipo.Alambrados;
    case "Almacenes":
      return ServicioTipo.Almacenes;
    case "Jardinería":
      return ServicioTipo.Jardineria;
    case "Limpieza de terrenos":
      return ServicioTipo.LimpiezaTerrenos;
    case "Construcción":
      return ServicioTipo.Construccion;
    case "Diseño":
      return ServicioTipo.Diseno;
    case "Filmación":
      return ServicioTipo.Filmacion;
    case "Equipamiento":
      return ServicioTipo.Equipamiento;
    case "Estética":
      return ServicioTipo.Estetica;
    case "Salud":
      return ServicioTipo.Salud;
    case "Mecánica":
      return ServicioTipo.Mecanica;
    case "Provisión de agua":
      return ServicioTipo.ProvisionDeAgua;
    case "Seguridad":
      return ServicioTipo.Seguridad;
    case "Traslados":
      return ServicioTipo.Traslados;
    case "Limpieza de casas":
      return ServicioTipo.LimpiezaCasas;
    case "Electricista":
      return ServicioTipo.Electricista;
    case "Piscinas":
      return ServicioTipo.Piscinas;
    default:
      throw new Error("Título de servicio no reconocido");
  }
}

export const tiposDePago = [
  { label: "Efectivo", value: "Efectivo" },
  { label: "Visa", value: "Visa" },
  { label: "Mastercard", value: "Mastercard" },
  { label: "OCA", value: "OCA" },
  { label: "Mercado Pago", value: "Mercado Pago" },
  { label: "PedidosYa", value: "Pedidosya" },
  { label: "Prex", value: "Prex" },
  { label: "Midinero", value: "MiDinero" },
  { label: "American Express", value: "American Express" },
  { label: "Transferencia Bancaria", value: "Transferencia Bancaria" },
];

export const alquileresCaracteristicas = [
  { label: "Toallas", value: "toallas" },
  { label: "Agua Caliente", value: "agua_caliente" },
  { label: "Sabanas", value: "sabanas" },
  { label: "TV", value: "tv" },
  { label: "WIFI", value: "wifi" },
  { label: "Piscina", value: "piscina" },
  { label: "Parrilla", value: "parrilla" },
  { label: "Cocina", value: "cocina" },
  { label: "Microondas", value: "microondas" },
  { label: "Tostadora", value: "tostadora" },
  { label: "Aire Acondicionado", value: "aire_acondicionado" },
  { label: "Estufa", value: "estufa" },
  { label: "Frazadas", value: "frazadas" },
  { label: "Mascotas", value: "mascotas" },
];

export const diasSemana = [
  { label: "Lunes", value: "Lunes" },
  { label: "Martes", value: "Martes" },
  { label: "Miércoles", value: "Miércoles" },
  { label: "Jueves", value: "Jueves" },
  { label: "Viernes", value: "Viernes" },
  { label: "Sábado", value: "Sábado" },
  { label: "Domingo", value: "Domingo" },
];

export function trimearValores(obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].trim();
    } else if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      obj[key] = trimearValores(obj[key]);
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map((item) =>
        typeof item === "string"
          ? item.trim()
          : typeof item === "object" && item !== null
          ? trimearValores(item)
          : item
      );
    }
  });
  return obj;
}

export function scrollToTop (){
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

export const cleanContent = (htmlContent) => {
  const temp = document.createElement('div');
  temp.innerHTML = htmlContent;

  const brElements = temp.getElementsByTagName('br');
  while (brElements.length) {
    brElements[0].replaceWith(' ');
  }

  return temp.textContent || temp.innerText;
};

export function excluirNoPublicados(data) {
  if (data) return data.filter((item) => item.publicado);
}

export function formatearTelefonoAUruguayo(phoneNumber) {
  if(!phoneNumber){
    return
  }
  const cleanedNumber = phoneNumber.replace(/\s+/g, '');
  if (cleanedNumber.length === 9 && cleanedNumber.startsWith('0')) {
    return `+598${cleanedNumber.slice(1)}`;
  }
}

function eliminarHTMLparaMetaData(str) {
  const textoLimpio = str.replace(/<[^>]*>/g, ''); 
  return textoLimpio.length > 235 ? textoLimpio.slice(0, 235) + "..." : textoLimpio;
}

