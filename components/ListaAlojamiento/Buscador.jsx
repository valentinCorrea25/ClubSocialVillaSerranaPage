'use client';

import React, { useState } from 'react';

const Buscador = ({ onFilterChange, setCapacity, capacity }) => {

  return (
    <div className="bg-white mt-1 max-w-[1200px] rounded-lg shadow-md p-6 w-[96%] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap justify-center">
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
        onClick={onFilterChange}
        className="bg-[--verde] text-white px-4 py-2  hover:bg-green-600 transition-colors w-full sm:w-auto"
      >
        Aplicar Filtro
      </button>

      <button
        onClick={()=> {setCapacity(null); onFilterChange();}}
        className="bg-[--verde] text-white px-4 py-2  hover:bg-green-600 transition-colors w-full sm:w-auto"
      >
        Resetear Filtros
      </button>
    </div>
  );
};



export default Buscador;
