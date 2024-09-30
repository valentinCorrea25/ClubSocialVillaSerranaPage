"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { Button, Layout } from "antd";
import { useRouter } from "next/navigation";
import { Menu, Switch } from "antd";
import { FaHouse } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";
import { FaPeopleCarry } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";
import Alquileres from "@/components/panelDeControl/Alquileres";
import {
  CloseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import CrearNuevoUsuario from "@/components/panelDeControl/CrearNuevoUsuario";
import NoticiasEA from "@/components/panelDeControl/NoticiasEA";
import TodasLasPublicaciones from "@/components/panelDeControl/TodasLasPublicaciones";
import Servicios from "@/components/panelDeControl/Servicios";
import Restaurantes from "@/components/panelDeControl/Restaurantes";
import Sider from "antd/es/layout/Sider";
import { Footer, Header, Content } from "antd/es/layout/layout";
import useWindowSize from "@/components/utils/useWindowSize";

export default function PanelDeControl() {
  const [currentComponent, setCurrentComponent] = useState(
    "TodasLasPublicaciones"
  );
  const [currentTitle, setCurrentTitle] = useState("Todas las Publicaciones");
  const router = useRouter();
  const [current, setCurrent] = useState("1");
  const [collapsed, setcollapsed] = useState(false);
  const colorBgContainer = "#fff";
  const windowsize = useWindowSize();

  const items = [
    {
      label: "Todas las Publicaciones",
      icon: <AiOutlineRead />,
    },
    {
      label: "Alquileres",
      icon: <FaHouse />,
    },
    {
      label: "Restaurantes",
      icon: <GiKnifeFork />,
    },
    {
      label: "Noticias, Actividades y Eventos",
      icon: <FaRegNewspaper />,
    },
    {
      label: "Servicios",
      icon: <FaPeopleCarry />,
    },
    {
      label: "Crear Nuevo Usuario",
      icon: <FaUserEdit />,
    },
  ];

  function setComponent(component) {
    switch (component) {
      case "tmp-0":
        setCurrentComponent("TodasLasPublicaciones");
        setCurrentTitle("Todas las publicaciones");
        break;
      case "tmp-1":
        setCurrentComponent("Alquileres");
        setCurrentTitle("Alquileres");
        break;
      case "tmp-2":
        setCurrentComponent("Restaurantes");
        setCurrentTitle("Restaurantes");
        break;
      case "tmp-3":
        setCurrentComponent("NoticiasEA");
        setCurrentTitle("Noticias, Activiadades y Eventos");
        break;
      case "tmp-4":
        setCurrentComponent("Servicios");
        setCurrentTitle("Servicios");
        break;
      case "tmp-5":
        setCurrentComponent("CrearNuevoUsuario");
        setCurrentTitle("Crear nuevo usuario");
        break;
    }
  }

  const renderComponent = () => {
    switch (currentComponent) {
      case "TodasLasPublicaciones":
        return <TodasLasPublicaciones />;
      case "Alquileres":
        return <Alquileres />;
      case "Restaurantes":
        return <Restaurantes />;
      case "NoticiasEA":
        return <NoticiasEA />;
      case "Servicios":
        return <Servicios />;
      case "CrearNuevoUsuario":
        return <CrearNuevoUsuario />;
      default:
        return <TodasLasPublicaciones />;
    }
  };

  const onClick = (e) => {
    console.log("click ", e);
    setComponent(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          ...(windowsize.width > 768
            ? {
                position: "fixed",
                background: "#fff",
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 1,
              }
            : {
                position: "absolute",
                background: "#fff",
                left: 0,
                top: 0,
                bottom: 0,
                zIndex: 1,
              }),
        }}
      >
        <div className="max-w-24 m-auto relative">
          <Image
            src={logo}
            width={0}
            height={0}
            className="md:w-[100%] w-full py-5 relative"
            alt="Logo Villa Serrana Club Social y Deportivo"
          />
          <div className="absolute right-[-75%] top-5 transition-all ease-in-out opacity-100 block md:opacity-0 md:hidden pointer-events-none"> <CloseOutlined className="scale-125" /> </div>
        </div>

        <Menu
          className="bg-white"
          theme="light"
          mode="inline"
          defaultActiveFirst
          defaultSelectedKeys={["4"]}
          onClick={onClick}
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: windowsize.width > 768 && !collapsed ? 200 : 0,
          transition: "margin-left 0.2s",
        }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            className="trigger"
            onClick={() => setcollapsed(!collapsed)}
            style={{ padding: "0 24px", fontSize: "18px", cursor: "pointer" }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {renderComponent()}
        </Content>
      </Layout>
    </Layout>
  );
}
