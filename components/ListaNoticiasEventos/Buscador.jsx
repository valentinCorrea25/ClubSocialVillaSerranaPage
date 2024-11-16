'use client';

import { DatePicker } from 'antd';
import React, { useState } from 'react';

const Buscador = ({ onFilterChange, setStartDate, setEndDate, startDate, endDate, setPage }) => {
  return (
    <div className="bg-white mt-5 max-w-[1200px] rounded-lg shadow-md p-6 w-[96%] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap justify-center">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <label className="font-bold">Fecha Inicio:</label>
        <DatePicker
          onChange={(date) => setStartDate(date)}
          value={startDate}
          placeholder='Fecha inicio'
          className='w-full'
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <label className="font-bold">Fecha Fin:</label>
        <DatePicker
          onChange={(date) => setEndDate(date)}
          placeholder='Fecha fin'
          value={endDate}
          className='w-full'
        />
      </div>

      <button
        onClick={onFilterChange}
        className="bg-[--verde] text-white px-4 py-2 hover:bg-green-600 transition-colors w-full sm:w-auto"
      >
        Aplicar Filtro
      </button>

      <button
        onClick={() => {
          setStartDate(null);
          setEndDate(null);
          onFilterChange();
        }}
        className="bg-[--verde] text-white px-4 py-2 hover:bg-green-600 transition-colors w-full sm:w-auto"
      >
        Resetear Filtros
      </button>
    </div>
  );
};

export default Buscador;