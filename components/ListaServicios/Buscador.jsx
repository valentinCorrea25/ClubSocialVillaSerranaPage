import React, { useState } from "react";
import { Select, Button, Space } from "antd";
import { tituloCorrectoServicio } from "../utils/ControlPublicaciones";

const { Option } = Select;

const Buscador = ({ categories, onFilterChange }) => {
  // Convertir el objeto de categorías en un array para poder mapearlo
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryArray = Object.keys(categories);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onFilterChange(value);
  };

  const handleShowAll = () => {
    setSelectedCategory("");
    onFilterChange("");
  };

  return (
    <div
      style={{
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Select
        placeholder="Selecciona una categoría"
        style={{ width: "200px", marginRight: "16px" }}
        onChange={handleCategoryChange}
        allowClear
        value={selectedCategory}
      >
        <Option value="">Todos</Option>
        {[...categoryArray]
          .sort((a, b) =>
            // Add a null check and provide a default empty string
            (tituloCorrectoServicio(categories[a]) || "").localeCompare(
              tituloCorrectoServicio(categories[b]) || "",
              "es"
            )
          )
          .map((category) => (
            <Option key={category} value={category}>
              {tituloCorrectoServicio(categories[category])}
            </Option>
          ))}
      </Select>
      <Button type="primary" onClick={() => handleShowAll()}>
        Mostrar Todos
      </Button>
    </div>
  );
};

export default Buscador;
