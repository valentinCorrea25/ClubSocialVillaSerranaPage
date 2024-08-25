import React from 'react';
import { Select, Button, Space } from 'antd';

const { Option } = Select;

const Buscador = ({ categories, onFilterChange }) => {
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
        {categories.map((category) => (
          <Option key={category} value={category}>
            {category}
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
