import { 
  FaFence, FaLeaf, FaBroom, FaHardHat, FaPencilRuler, FaVideo, 
  FaToolbox, FaCut, FaHeartbeat, FaWrench, FaTint, FaShieldAlt, FaTruck 
} from 'react-icons/fa';

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
    if (typeof url !== 'string') {
      throw new Error('URL no válida');
    }

    // Expresión regular para extraer las coordenadas
    var regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    var match = url.match(regex);

    if (match) {
      var lat = match[1];
      var lon = match[2];
      return [lat, lon];
    } else {
      return false
    }
  } catch (e) {
    return e.message;
  }
}



// Enum para los tipos de servicio
const ServicioTipo = {
  Alambrados: 'Alambrados',
  Jardineria: 'Jardineria',
  LimpiezaTerrenos: 'LimpiezaTerrenos',
  Construccion: 'Construccion',
  Diseno: 'Diseno',
  Filmacion: 'Filmacion',
  Equipamiento: 'Equipamiento',
  Estetica: 'Estetica',
  Salud: 'Salud',
  Mecanica: 'Mecanica',
  ProvisionDeAgua: 'ProvisionDeAgua',
  Seguridad: 'Seguridad',
  Traslados: 'Traslados'
};

export function iconosSegunTipoServicio(tipoServicio) {
  let IconComponent;
  switch (tipoServicio) {
    case ServicioTipo.Alambrados:
      IconComponent = FaFence;
      break;
    case ServicioTipo.Jardineria:
      IconComponent = FaLeaf;
      break;
    case ServicioTipo.LimpiezaTerrenos:
      IconComponent = FaBroom;
      break;
    case ServicioTipo.Construccion:
      IconComponent = FaHardHat;
      break;
    case ServicioTipo.Diseno:
      IconComponent = FaPencilRuler;
      break;
    case ServicioTipo.Filmacion:
      IconComponent = FaVideo;
      break;
    case ServicioTipo.Equipamiento:
      IconComponent = FaToolbox;
      break;
    case ServicioTipo.Estetica:
      IconComponent = FaCut;
      break;
    case ServicioTipo.Salud:
      IconComponent = FaHeartbeat;
      break;
    case ServicioTipo.Mecanica:
      IconComponent = FaWrench;
      break;
    case ServicioTipo.ProvisionDeAgua:
      IconComponent = FaTint;
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
  
  return IconComponent ? <IconComponent style={{ fontSize: '24px', textAlign:'center'}} /> : null;
}

// Función para obtener el título correcto del servicio
export function tituloCorrectoServicio(tipoServicio){
  switch (tipoServicio) {
    case ServicioTipo.Alambrados:
      return 'Alambrados';
    case ServicioTipo.Jardineria:
      return 'Jardinería';
    case ServicioTipo.LimpiezaTerrenos:
      return 'Limpieza de terrenos';
    case ServicioTipo.Construccion:
      return 'Construcción';
    case ServicioTipo.Diseno:
      return 'Diseño';
    case ServicioTipo.Filmacion:
      return 'Filmación';
    case ServicioTipo.Equipamiento:
      return 'Equipamiento';
    case ServicioTipo.Estetica:
      return 'Estética';
    case ServicioTipo.Salud:
      return 'Salud';
    case ServicioTipo.Mecanica:
      return 'Mecánica';
    case ServicioTipo.ProvisionDeAgua:
      return 'Provisión de agua';
    case ServicioTipo.Seguridad:
      return 'Seguridad';
    case ServicioTipo.Traslados:
      return 'Traslados';
    default:
      throw new Error('Tipo de servicio no reconocido');
  }
}
