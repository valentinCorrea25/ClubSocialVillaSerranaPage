// utils.js o algún archivo de utilidades
export const obtenerTipoDePublicacion = (tipoSinPrefijo) => {
    switch (tipoSinPrefijo.toLowerCase()) {
      case 'restaurant':
        return 'restaurantes';
      case 'alquiler':
        return 'alquileres';
      case 'servicio':
        return 'servicios';
      case 'eventonoticia':
        return 'eventosnoticias';
      case 'actividad':
        return 'actividades';
      default:
        return 'desconocido';
    }
  };

  export const obtenerIdPublicacion = (selectedItem) => {
    return selectedItem
      ? Object.keys(selectedItem).find((key) => key.startsWith("id_"))
      : null;
  };

  export const obtenerTipoSinPrefijo = (idPublicacion) => {
    return idPublicacion
      ? idPublicacion.replace("id_", "")
      : "Tipo Desconocido";
  };
  
  
  