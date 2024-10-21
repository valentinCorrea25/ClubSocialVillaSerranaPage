import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React from "react";
import { FaPeopleCarry } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";

export default function FloatButtonCustom({
  setcollapsed,
  setTipoDePublicacionACrear,
  setIsModalOpen,
  setModalIsOpenForButtonFloat,
  windowsize
}) {
  function handleSelect(tipoDePublicacion) {
    setTipoDePublicacionACrear(tipoDePublicacion);
    setIsModalOpen(true);
    setModalIsOpenForButtonFloat(true);
  }

  return (
    <FloatButton.Group
      shape="square"
      trigger="click"
      style={{ insetInlineEnd: 25, fontSize: "50px" }}
      icon={<PlusOutlined />}
      className="text-xl z-[30000]"
      onClick={() => windowsize.width <= 768 ? setcollapsed(true) : null}
    >
      <div
        className="relative"
        onClick={() => {
          handleSelect("alquiler");
        }}
      >
        <FloatButton icon={<HomeOutlined />} />
        <div className="absolute w-36 h-10  left-[-10.5em] top-0 bg-white shadow-md py-2 px-3 rounded rounded-b-none cursor-pointer hover:bg-stone-100 p-[0.1rem]">
          Crear Alquiler
        </div>
      </div>

      <div
        className="relative"
        onClick={() => {
          handleSelect("restaurante");
        }}
      >
        <FloatButton icon={<GiKnifeFork />} />
        <div className="absolute w-36 h-10 left-[-10.5em] top-0 bg-white shadow-md py-2 px-3 rounded border-t-stone-50 border-opacity-50 border-t-[0.1px] rounded-t-none rounded-b-none  cursor-pointer hover:bg-stone-100 p-[0.1rem]">
          Crear Restaurante
        </div>
      </div>

      <div
        className="relative"
        onClick={() => {
          handleSelect("evento_noticia_actividad");
        }}
      >
        <FloatButton icon={<FaRegNewspaper />} />
        <div className="absolute flex items-center w-36 h-10 left-[-12.25em] top-0 bg-white shadow-md py-2 px-3 rounded border-t-stone-50 border-opacity-50 border-t-[0.1px] rounded-t-none rounded-b-none text-xs  cursor-pointer hover:bg-stone-100 p-[0.1rem]">
          Crear Evento Noticia <br />
          Actividad
        </div>
      </div>

      <div
        className="relative"
        onClick={() => {
          handleSelect("servicios");
        }}
      >
        <FloatButton icon={<FaPeopleCarry />} />
        <div className="absolute w-36 h-10 left-[-10.5em] top-0 bg-white shadow-md py-2 px-3 rounded border-t-stone-50 border-opacity-50 border-t-[0.1px] rounded-t-none cursor-pointer hover:bg-stone-100 p-[0.1rem]">
          Crear Servicio
        </div>
      </div>
    </FloatButton.Group>
  );
}
