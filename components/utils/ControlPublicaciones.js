// utils.js o algún archivo de utilidades
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
      return "servicios";
    case "eventonoticia":
      return "eventosnoticias";
    case "actividad":
      return "actividades";
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
