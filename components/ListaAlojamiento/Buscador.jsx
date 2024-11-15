'use client';

import React, { useState } from 'react';
import { InputNumber, Button, Space } from 'antd';

// const Buscador = ({ onFilterChange }) => {
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(40000); 
//   const [capacity, setCapacity] = useState(0);

//   const handleFilterChange = () => {
//     onFilterChange({
//       priceRange: [minPrice, maxPrice],
//       capacity,
//     });
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', padding: '16px', 
//       backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
//       flexWrap: 'wrap', }}>

//       <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
//         <label style={{ fontWeight: 'bold' }}>Rango de Precio:</label>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//           <InputNumber 
//             min={0} 
//             max={40000} 
//             value={minPrice} 
//             onChange={(value) => setMinPrice(value)} 
//             placeholder="Precio mínimo" 
//             style={{ width: '120px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }} 
//           />
//           <span style={{ fontSize: '18px' }}> - </span>
//           <InputNumber 
//             min={0} 
//             max={40000} 
//             value={maxPrice} 
//             onChange={(value) => setMaxPrice(value)} 
//             placeholder="Precio máximo" 
//             style={{ width: '120px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }} 
//           />
//         </div>
//       </div>

//       <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
//         <label style={{ fontWeight: 'bold' }}>Capacidad:</label>
//         <InputNumber 
//           min={0} 
//           value={capacity} 
//           onChange={(value) => setCapacity(value)} 
//           placeholder="Capacidad máxima" 
//           style={{ width: '120px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }} 
//         />
//       </div>

//       <Button 
//         type="primary" 
//         onClick={handleFilterChange} 
//         style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }}>
//         Aplicar Filtros
//       </Button>

//       <style jsx>{`
//         @media (max-width: 768px) {
//           div {
//             flex-direction: column;
//             align-items: stretch;
//           }
//           button {
//             align-self: stretch; 
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

const Buscador = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [capacity, setCapacity] = useState(0);

  const handleFilterChange = () => {
    onFilterChange({
      priceRange: [minPrice, maxPrice],
      capacity,
    });
  };

  return (
    <div className=" w-[1200px] bg-white mt-1 rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap ">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <label className="font-bold whitespace-nowrap">Rango de Precio:</label>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="number"
            min={0}
            max={40000}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="0"
            className="w-full sm:w-24 p-2 border rounded"
          />
          <span className="text-xl">-</span>
          <input
            type="number"
            placeholder="5000"
            min={0}
            max={40000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full sm:w-24 p-2 border rounded"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <label className="font-bold">Capacidad:</label>
        <input
          type="number"
          min={0}
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          placeholder="0"
          className="w-full sm:w-24 md:p-2 border rounded"
        />
      </div>

      <button
        onClick={handleFilterChange}
        className="bg-[--verde] text-white px-4 py-2  hover:bg-green-600 transition-colors w-full sm:w-auto"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};



export default Buscador;
