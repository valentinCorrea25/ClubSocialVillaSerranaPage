import React from "react";
import ServicioCard from "./ServicioCard";
import { Empty } from "antd";

const ListaServicios = ({ servicios }) => {
  return (
    <div className="max-w-7xl mx-auto p-1 md:p-5">
      <div className={`${servicios.length > 0 ? 'grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'flex justify-center my-5'}`}>
        {servicios.length > 0 ? (
          servicios.map((servicio) => (
            <div key={servicio.id_Publicacion} className="w-full">
              <ServicioCard servicio={servicio} />
            </div>
          ))
        ) : (
            <Empty
              description={
                <span className="text-lg text-gray-500">
                  No se encontraron servicios
                </span>
              }
            />

        )}
      </div>
    </div>
  );
};

export default ListaServicios;
