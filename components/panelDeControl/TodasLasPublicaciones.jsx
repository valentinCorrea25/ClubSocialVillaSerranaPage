// // import React, { useMemo, useState } from "react";
// // import { Table, Dropdown, Space, Input, Button } from "antd";
// // import useSWR, { useSWRConfig } from "swr";
// // import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
// // import { useRouter } from "next/navigation";
// // import EditarPublicacionModal from "./modals/EditarPublicacionModal";
// // import EliminarPublicacionModal from "./modals/EliminarPublicacionModal";
// // import { obtenerDireccionDePublicacion } from "../utils/ControlPublicaciones";
// // import GenerarQRModal from "./modals/GenerarQRModal";
// // import useWindowSize from "@/components/utils/useWindowSize";

// // export default function TodasLasPublicaciones({
// //   mostrarCargarToast,
// //   mostrarExitoToast,
// //   mostrarFalloToast,
// //   setModalIsOpenForButtonFloat
// // }) {
// //   const [page, setPage] = useState(1);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [isModalOpenEliminar, setIsModalOpenElimininar] = useState(false);
// //   const [isModalOpenQR, setIsModalOpenQR] = useState(false);
// //   const [selectedItem, setSelectedItem] = useState({});
// //   const router = useRouter();
// //   const { mutate } = useSWRConfig();
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const windowSize = useWindowSize();

// //   const showModalEditar = (item) => {
// //     setSelectedItem(item);
// //     setIsModalOpen(true);
// //     setModalIsOpenForButtonFloat(true);
// //   };

// //   const showModalQR = (item) => {
// //     setSelectedItem(item);
// //     setIsModalOpenQR(true);
// //     setModalIsOpenForButtonFloat(true);
// //   };

// //   const showModalEliminar = (item) => {
// //     setSelectedItem(item);
// //     setIsModalOpenElimininar(true);
// //     setModalIsOpenForButtonFloat(true);
// //   };

// //   const fetcher = (...args) => fetch(...args).then((res) => res.json());

// //   const key = `/api/listapublicaciones?page=${page}${
// //     searchQuery?.trim() ? `&text=${searchQuery}` : ""
// //   }`;

// //   const { data, error, isLoading } = useSWR(key, fetcher, {
// //     keepPreviousData: true
// //   });

// //   function updateData() {
// //     mutate(key, data);
// //   }

// //   const columns = [
// //     {
// //       title: "Portada",
// //       dataIndex: "fotos",
// //       key: "portada",
// //       onCell: (record) => {
// //         return {
// //           onClick: () => {
// //             const tipoPublicacion = Object.keys(record).find((key) =>
// //               key.startsWith("id_")
// //             );
// //             const tipoSinPrefijo = tipoPublicacion
// //               ? tipoPublicacion.replace("id_", "")
// //               : "desconocido";
// //             const id = record[tipoPublicacion];

// //             router.push(obtenerDireccionDePublicacion(tipoSinPrefijo, id));
// //           },
// //         };
// //       },
// //       render: (text, record) => {
// //         const fotos = record.fotos || record.foto;
// //         const fotoSrc = Array.isArray(fotos) ? fotos[0] : fotos;
// //         return fotoSrc ? (
// //           <img
// //             src={fotoSrc}
// //             alt="Portada"
// //             style={{ width: "60px", height: "60px", objectFit: "cover" }}
// //           />
// //         ) : null;
// //       },
// //     },
// //     {
// //       title: "Informacion",
// //       dataIndex: "titulo",
// //       key: "titulo",
// //       ellipsis: true,
// //       onCell: (record) => {
// //         return {
// //           onClick: () => showModalEditar(record), // Make sure this calls the function on click
// //         };
// //       },
// //       render: (titulo, record) => {
// //         const maxLength = 30;
// //         const truncatedTitle =
// //           titulo.length > maxLength
// //             ? `${titulo.substring(0, maxLength)}...`
// //             : titulo;

// //         let tipoPublicacion = Object.keys(record).find((key) =>
// //           key.startsWith("id_")
// //         );
// //         tipoPublicacion = tipoPublicacion
// //           ? tipoPublicacion.replace("id_", "")
// //           : "Desconocido";

// //         return (
// //           <div className="flex flex-col max-w-24">
// //             <div>{truncatedTitle}</div>
// //             <div className="font-bold">{tipoPublicacion}</div>
// //           </div>
// //         );
// //       },
// //     },
// //     {
// //       title: "Ubicación",
// //       dataIndex: "location",
// //       key: "location",
// //       ellipsis: true,
// //       render: (location) => (
// //         <a
// //           href={`https://www.google.com/maps/search/?api=1&query=${location}`}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Ver mapa
// //         </a>
// //       ),
// //     },
// //     {
// //       title: "Fecha",
// //       dataIndex: "fecha_publicacion",
// //       key: "fecha_publicacion",
// //       ellipsis: true,
// //       render: (fechaPublicacion) => {
// //         const opciones = {
// //           year: "numeric",
// //           month: "short",
// //           day: "numeric",
// //         };
// //         return new Date(fechaPublicacion).toLocaleDateString("es-UY", opciones);
// //       },
// //     },
// //     {
// //       title: "Opciones",
// //       key: "options",
// //       width: "10%",
// //       render: (text, record) => {
// //         const tipoPublicacion = Object.keys(record).find((key) =>
// //           key.startsWith("id_")
// //         );
// //         const tipoSinPrefijo = tipoPublicacion
// //           ? tipoPublicacion.replace("id_", "")
// //           : "desconocido";
// //         const id = record[tipoPublicacion];

// //         const items = [
// //           {
// //             label: (
// //               <a
// //                 href={obtenerDireccionDePublicacion(tipoSinPrefijo, id)}
// //                 target="_blank"
// //               >
// //                 Ver Publicación
// //               </a>
// //             ),
// //             key: "0",
// //           },
// //           {
// //             label: (
// //               <div className="w-full" onClick={() => showModalQR(record)}>
// //                 Generar código QR
// //               </div>
// //             ),
// //             key: "1",
// //           },
// //           {
// //             label: (
// //               <div className="w-full" onClick={() => showModalEditar(record)}>
// //                 Editar
// //               </div>
// //             ),
// //             key: "2",
// //           },
// //           {
// //             label: (
// //               <div className="w-full" onClick={() => showModalEliminar(record)}>
// //                 Eliminar
// //               </div>
// //             ),
// //             key: "3",
// //             danger: true,
// //           },
// //         ];

// //         return (
// //           <div className="flex justify-center">
// //             <Dropdown menu={{ items }} trigger={["click"]}>
// //               <a onClick={(e) => e.preventDefault()}>
// //                 <Space>
// //                   <MenuOutlined />
// //                 </Space>
// //               </a>
// //             </Dropdown>
// //           </div>
// //         );
// //       },
// //     },
// //   ];

// //   const filteredColumns = useMemo(() => {
// //     if (windowSize.width <= 768) {
// //       return columns.filter(column =>
// //         ['portada', 'titulo', 'options'].includes(column.key)
// //       );
// //     }
// //     return columns;
// //   }, [windowSize.width, columns]);

// //   return (
// //     <div className="overflow-x-auto">
// //       <div className="flex space-x-2 my-2">
// //         <Input
// //           type="text"
// //           placeholder="Buscar publicaciones..."
// //           value={searchQuery}
// //           onChange={(e) => {
// //             setSearchQuery(e.target.value);
// //             setPage(1);
// //           }}
// //           className="max-w-sm mb-2"
// //         />
// //       </div>
// //       <Table
// //         dataSource={data?.publicaciones || []}
// //         columns={filteredColumns}
// //         loading={isLoading}
// //         rowKey={(record) => {
// //           const tipoPublicacion = Object.keys(record).find(key => key.startsWith('id_'));
// //           return `${record[tipoPublicacion]}_${tipoPublicacion}`;
// //         }}
// //         pagination={{
// //           current: page,
// //           total: data?.totalCount || 0,
// //           pageSize: 25,
// //           onChange: (newPage) => setPage(newPage),
// //           showSizeChanger: false,
// //           showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} items`,
// //           position: ['bottomLeft'],
// //         }}
// //         size="small"
// //         scroll={{ x: true }}

// //       />
// //       <EditarPublicacionModal
// //         updateData={updateData}
// //         selectedItem={selectedItem}
// //         isModalOpen={isModalOpen}
// //         setIsModalOpen={setIsModalOpen}
// //         mostrarCargarToast={mostrarCargarToast}
// //         mostrarExitoToast={mostrarExitoToast}
// //         mostrarFalloToast={mostrarFalloToast}
// //         setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
// //       />
// //       <EliminarPublicacionModal
// //         updateData={updateData}
// //         selectedItem={selectedItem}
// //         isModalOpen={isModalOpenEliminar}
// //         setIsModalOpen={setIsModalOpenElimininar}
// //         mostrarCargarToast={mostrarCargarToast}
// //         mostrarExitoToast={mostrarExitoToast}
// //         mostrarFalloToast={mostrarFalloToast}
// //         setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
// //       />

// //       <GenerarQRModal
// //         selectedItem={selectedItem}
// //         isModalOpen={isModalOpenQR}
// //         setIsModalOpen={setIsModalOpenQR}
// //         setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
// //       />
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { Button, Dropdown, Input, Space } from "antd";
// import TablaGenerica from "../utils/TablaGenerica";
// import { GiKnifeFork } from "react-icons/gi";
// import { HomeOutlined } from "@ant-design/icons";
// import { FaRegNewspaper } from "react-icons/fa6";
// import { FaPeopleCarry } from "react-icons/fa";

// export default function TodasLasPublicaciones({
//   mostrarCargarToast,
//   mostrarExitoToast,
//   mostrarFalloToast,
//   setModalIsOpenForButtonFloat,
//   setTipoDePublicacionACrear,
//   setIsModalOpen,
// }) {
//   const [searchQuery, setSearchQuery] = useState("");

//   function handleCreate(tipoDePublicacion) {
//     setTipoDePublicacionACrear(tipoDePublicacion);
//     setIsModalOpen(true);
//     setModalIsOpenForButtonFloat(true);
//   }

//   const items = [
//     {
//       key: "1",
//       label: (
//        <div onClick={() => handleCreate('alquiler')}>
//         <HomeOutlined className="inline mr-2"/>  Crear Alquiler
//         </div>
//       ),
//     },
//     {
//       key: "2",
//       label: (
//        <div onClick={() => handleCreate('restaurante')}>
//          <GiKnifeFork className="inline mr-2"/> Crear Restaurante
//         </div>
//       ),
//     },
//     {
//       key: "3",
//       label: (
//        <div onClick={() => handleCreate('evento_noticia_actividad')}>
//         <FaRegNewspaper className="inline mr-2"/> Crear Evento, Noticia o Actividad
//         </div>
//       ),
//     },
//     {
//       key: "4",
//       label: (
//        <div onClick={() => handleCreate('servicio')}>
//          <FaPeopleCarry className="inline mr-2"/> Crear Servicio
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <div className="flex space-x-2 justify-between my-2 w-full">
//         <Input
//           type="text"
//           placeholder="Buscar..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="max-w-sm mb-2 w-full"
//         />
//         <div className="flex justify-center hidden sm:block">
//           <Dropdown menu={{ items }} trigger={["click"]}>
//             <Button onClick={(e) => e.preventDefault()} className="bg-[--verde] text-white">
//               <Space>Crear Publicación</Space>
//             </Button>
//           </Dropdown>
//         </div>
//       </div>

//       <TablaGenerica
//         apiEndpoint="/api/listapublicaciones"
//         searchQuery={searchQuery}
//         mostrarCargarToast={mostrarCargarToast}
//         mostrarExitoToast={mostrarExitoToast}
//         mostrarFalloToast={mostrarFalloToast}
//         setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
//         getRowKey={(record) => {
//           const tipoPublicacion = Object.keys(record).find((key) =>
//             key.startsWith("id_")
//           );
//           return `${record[tipoPublicacion]}_${tipoPublicacion}`;
//         }}
//       />
//     </div>
//   );
// }


import React, { useState } from "react";
import { Button, Dropdown, Input, Space } from "antd";
import TablaGenerica from "../utils/TablaGenerica";
import { GiKnifeFork } from "react-icons/gi";
import { HomeOutlined } from "@ant-design/icons";
import { FaRegNewspaper } from "react-icons/fa6";
import { FaPeopleCarry } from "react-icons/fa";

export default function TodasLasPublicaciones({
  mostrarCargarToast,
  mostrarExitoToast,
  mostrarFalloToast,
  setModalIsOpenForButtonFloat,
  setTipoDePublicacionACrear,
  setIsModalOpen,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleDropdownClick = ({ key }) => {
    const tipoPublicacionMap = {
      "1": "alquiler",
      "2": "restaurante",
      "3": "evento_noticia_actividad",
      "4": "servicio"
    };

    if (tipoPublicacionMap[key]) {
      setTipoDePublicacionACrear(tipoPublicacionMap[key]);
      setIsModalOpen(true);
      setModalIsOpenForButtonFloat(true);
    }
  };

  const getDropdownItems = () => [
    {
      key: "1",
      label: (
        <span>
          <HomeOutlined className="inline mr-2"/> Crear Alquiler
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <GiKnifeFork className="inline mr-2"/> Crear Restaurante
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <FaRegNewspaper className="inline mr-2"/> Crear Evento, Noticia o Actividad
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <span>
          <FaPeopleCarry className="inline mr-2"/> Crear Servicio
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex space-x-2 justify-between my-2 w-full">
        <Input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm mb-2 w-full"
        />
        <div className="flex justify-center hidden sm:block">
          <Dropdown 
            menu={{ 
              items: getDropdownItems(),
              onClick: handleDropdownClick
            }} 
            trigger={["click"]}
          >
            <Button onClick={(e) => e.preventDefault()} className="bg-[--verde] text-white">
              <Space>Crear Publicación</Space>
            </Button>
          </Dropdown>
        </div>
      </div>

      <TablaGenerica
        apiEndpoint="/api/listapublicaciones"
        searchQuery={searchQuery}
        mostrarCargarToast={mostrarCargarToast}
        mostrarExitoToast={mostrarExitoToast}
        mostrarFalloToast={mostrarFalloToast}
        setModalIsOpenForButtonFloat={setModalIsOpenForButtonFloat}
        getRowKey={(record) => {
          const tipoPublicacion = Object.keys(record).find((key) =>
            key.startsWith("id_")
          );
          return `${record[tipoPublicacion]}_${tipoPublicacion}`;
        }}
      />
    </div>
  );
}
