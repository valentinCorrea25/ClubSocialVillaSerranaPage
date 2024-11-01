// "use client";

// import React from "react";
// import { Card, List, Tag, Button, Alert } from "antd";
// import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";


// const { Meta } = Card;

// const ListaAlojamientos = ({ alojamientos, onViewDetails }) => {
//   if (!alojamientos) {
//     return (
//       <div style={{ padding: "24px" }}>
//         <Alert
//           message="No se encontraron resultados"
//           description="No hay alojamientos que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda."
//           type="warning"
//           showIcon
//         />
//       </div>
//     );
//   }

//   return (
//     <List
//       itemLayout="horizontal"
//       dataSource={alojamientos}
//       renderItem={(alojamiento) => (
//         <List.Item>
//           <Card
//             onClick={() => onViewDetails(alojamiento.id_Alquiler)}
//             hoverable
//             className="flex md:flex-row flex-col justify-center sm:justify-start sm:p-4 p-2"
//             style={{
//               width: "100%",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               borderRadius: "4px",
//               display: "flex",
//               alignItems: "center",
//               flexDirection: "row",
//               flexWrap: "wrap",
//               backgroundColor: "#ffffff",
//               transition: "transform 0.3s ease, box-shadow 0.3s ease",
//             }}
//             cover={
//               alojamiento.fotos && alojamiento.fotos.length > 0 ? (
//                 <img
//                   alt={alojamiento.title || "Imagen del alojamiento"}
//                   src={
//                     alojamiento.fotos[0] ||
//                     "https://via.placeholder.com/600x400"
//                   }
//                   style={{
//                     width: 300,
//                     height: 200,
//                     objectFit: "cover",
//                     marginRight: 16,
//                   }}
//                 />
//               ) : null
//             }
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = "scale(1.05)";
//               e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = "scale(1)";
//               e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
//             }}
//           >
//             <div >
//               <Meta
//                 title={alojamiento.titulo || "Título no disponible"}
//                 description={
//                   <>
//                     <div>
//                       <EnvironmentOutlined />
//                       {alojamiento.ubicacion_calles || "Ubicación no disponible"}
//                     </div>
//                     <div>
//                       <UserOutlined /> Capacidad:
//                       {alojamiento.capacidad || "No especificado"}
//                     </div>
//                    {alojamiento.precio ? <div>
//                       Precio:
//                       {alojamiento.precio !== undefined
//                         ? `$${alojamiento.precio}`
//                         : "No especificado"}
//                     </div> : null}
//                     <div>
//                       Descripción: {alojamiento.descripcion || "No disponible"}
//                     </div>
//                     <div className="flex flex-wrap sm:max-w-52 md:max-w-80 lg:max-w-[40em]">
//                       {(() => {
//                         const comodidades = [];

//                         for (const key in alojamiento) {
//                           if (comodidades.length >= 10) break;

//                           if (alojamiento[key] === true) {
//                             let nombreComodidad = key
//                               .replace("_", " ")
//                               .replace(/\b\w/g, (char) => char.toUpperCase());
//                             comodidades.push(nombreComodidad);
//                           }
//                         }

//                         return comodidades.length > 0
//                           ? comodidades.map((comodidad, index) => (
//                               <Tag key={index}>{comodidad}</Tag>
//                             ))
//                           : "No hay comodidades disponibles";
//                       })()}
//                     </div>
//                   </>
//                 }
//               />
//             </div>
//             <div
//               style={{
//                 marginTop: "auto",
//                 display: "flex",
//                 justifyContent: "flex-start",
//               }}
//             >
//               <Button
//                 type="primary"
//                 onClick={() => onViewDetails(alojamiento.id_Alquiler)}
//                 className="mt-7 m-auto sm:ml-0"
//               >
//                 Ver Detalles
//               </Button>
//             </div>
//           </Card>
//         </List.Item>
//       )}
//     />
//   );
// };

// export default ListaAlojamientos;


'use client';

import React from 'react';
import AlojamientoCard from './AlojamientoCard';
import { Alert, Pagination, Button } from 'antd';

const ListaAlojamientos = ({ alojamientos, onViewDetails  }) => {
  if (!alojamientos || alojamientos.length === 0) {
    return (
      <div className="p-6">
        <Alert
          message="No se encontraron resultados"
          description="No hay alojamientos que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda."
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-1 sm:p-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {alojamientos.map((alojamiento, index) => (
          <AlojamientoCard key={index} alojamiento={alojamiento} />
          
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Pagination defaultCurrent={1} total={10} />
      </div>
    </div>
  );
};

export default ListaAlojamientos;

