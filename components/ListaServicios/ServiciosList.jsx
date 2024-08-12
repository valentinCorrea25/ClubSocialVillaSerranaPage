import React from 'react';
import ServicioCard from './ServicioCard'; 

const ListaServicios = ({ servicios }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {servicios.length > 0 ? (
          servicios.map(servicio => (
            <div key={servicio.id_Publicacion} style={{ marginBottom: '24px', width: '100%', maxWidth: '700px' }}>
              <ServicioCard servicio={servicio} />
            </div>
          ))
        ) : (
          <p>No se encontraron servicios.</p>
        )}
      </div>
    </div>
  );
};

export default ListaServicios;
