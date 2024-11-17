"use client";

import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { FaHouse } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { FaRegFutbol } from "react-icons/fa";
import { FaPeopleCarry } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ListaItems from "./ListaItems";

const items = [
  {
    key: "1",
    label: (
      <div className="flex items-center gap-2 font-extrabold">
        <FaHouse />
        Alojamientos
      </div>
    ),
    children: <ListaItems type={1} />,
    type: 1,
  },
  {
    key: "2",
    label: (
      <div className="flex items-center gap-2 font-extrabold">
        <GiKnifeFork />
        Restaurantes
      </div>
    ),
    children: <ListaItems type={2} />,
    type: 2,
  },
  {
    key: "3",
    label: (
      <div className="flex items-center gap-2 font-extrabold">
        <FaRegNewspaper />
        Noticias y Eventos
      </div>
    ),
    children: <ListaItems type={3} />,
    type: 3,
  },
  {
    key: "4",
    label: (
      <div className="flex items-center gap-2 font-extrabold">
        <FaRegFutbol />
        Actividades
      </div>
    ),
    children: <ListaItems type={4} />,
    type: 4,
  },
  {
    key: "5",
    label: (
      <div className="flex items-center gap-2 font-extrabold">
        <FaPeopleCarry />
        Servicios
      </div>
    ),
    children: <ListaItems type={5} />,
    type: 5,
  },
];

export default function ListaCategorias() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if window is available
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="m-auto max-w-screen-xl mt-12 md:mt-20">
      <h1 className="text-[--azul] font-bold text-center md:text-5xl text-2xl md:px-0 px-4">
        Información Turistica Villa Serrana
      </h1>
      <h2 className="text-[--verde-oscuro] font-bold text-center md:text-xl text-sm md:px-0 px-4">
        Encuentra las mejores opciones para disfrutar en Villa Serrana.
      </h2>

      {isMobile ? (
        <ListaCatHomeMovile />
      ) : (
        <Tabs
          centered={isMobile ? false : true}
          defaultActiveKey="1"
          items={items}
          itemselectedcolor="#09A603"
          size="large"
        />
      )}
    </div>
  );
}

export function ListaCatHomeMovile() {
  const [activeCategory, setActiveCategory] = useState(0);

  const handlePrevCategory = () => {
    setActiveCategory((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNextCategory = () => {
    setActiveCategory((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const currentCategory = items[activeCategory];

  return (
    <div className="m-auto max-w-screen-xl mt-10">
      <div className="flex items-center justify-center gap-4 mb-4">
        <FaChevronLeft
          className="cursor-pointer text-2xl text-[--verde]"
          onClick={handlePrevCategory}
        />
        <h1 className="flex items-center gap-2 font-bold text-xl text-[--verde] ">
          {currentCategory.label}
        </h1>
        <FaChevronRight
          className="cursor-pointer text-2xl text-[--verde]"
          onClick={handleNextCategory}
        />
      </div>

      <ListaItems type={currentCategory.type} />
    </div>
  );
}
