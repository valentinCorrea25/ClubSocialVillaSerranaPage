import React from 'react';
import { Select, Button, Space } from 'antd';
import { tituloCorrectoServicio } from '../utils/ControlPublicaciones';

const { Option } = Select;

const Buscador = ({ categories, onFilterChange }) => {
  // Convertir el objeto de categorías en un array para poder mapearlo
  const categoryArray = Object.keys(categories);

  const handleCategoryChange = (value) => {
    onFilterChange(value);
  };

  return (
    <div style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Select
        placeholder="Selecciona una categoría"
        style={{ width: '200px', marginRight: '16px' }}
        onChange={handleCategoryChange}
        allowClear
      >
        <Option value="">Todos</Option>
        {categoryArray.map((category) => (
          <Option key={category} value={category}>
            {tituloCorrectoServicio(categories[category])}
          </Option>
        ))}
      </Select>
      <Button type="primary" onClick={() => handleCategoryChange('')}>
        Mostrar Todos
      </Button>
    </div>
  );
};

export default Buscador;