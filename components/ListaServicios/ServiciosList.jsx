import React from 'react';
import ServicioCard from './ServicioCard'; 

const ListaServicios = ({ servicios }) => {
  return (
    <div className="max-w-7xl mx-auto p-1 md:p-5">
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {servicios.length > 0 ? (
          servicios.map(servicio => (
            <div key={servicio.id_Publicacion} className="w-full">
              <ServicioCard servicio={servicio} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">No se encontraron servicios.</p>
        )}
      </div>
    </div>
  );
};

export default ListaServicios;
