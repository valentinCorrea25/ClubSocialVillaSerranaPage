"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { Button, Divider, Layout } from "antd";
import { useRouter } from "next/navigation";
import { Menu, Switch } from "antd";
import { FaHouse } from "react-icons/fa6";
import { FaRegNewspaper, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";
import { FaPeopleCarry } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";
import Alquileres from "@/components/panelDeControl/Alquileres";
import { signOut } from "next-auth/react";
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
      key: "tmp-0",
      icon: <AiOutlineRead />,
      label: "Todas las Publicaciones",
    },
    {
      key: "tmp-1",
      icon: <FaHouse />,
      label: "Alquileres",
    },
    {
      key: "tmp-2",
      icon: <GiKnifeFork />,
      label: "Restaurantes",
    },
    {
      key: "tmp-3",
      icon: <FaRegNewspaper />,
      label: "Noticias, Actividades y Eventos",
    },
    {
      key: "tmp-4",
      icon: <FaPeopleCarry />,
      label: "Servicios",
    },
    {
      key: "tmp-5",
      icon: <FaUserEdit />,
      label: "Control de Usuario",
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
        setCurrentTitle("Control de Usuario");
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

  const handleLogout = () => {
    signOut()
    router.push("/admin");
  };

  return (
    <Layout style={{ minHeight: "100vh"}}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        width={'250px'}
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
        <div className="max-w-28 m-auto relative">
          <Image
            src={logo}
            width={0}
            height={0}
            className="md:w-[100%] w-full py-5 relative"
            alt="Logo Villa Serrana Club Social y Deportivo"
          />
          <div className="absolute right-[-80%] top-5 transition-all ease-in-out opacity-100 block lg:opacity-0 lg:hidden pointer-events-none">
            
            <CloseOutlined className="scale-125 bg-white p-2 trigger"  onClick={() => setcollapsed(!collapsed)} />
          </div>
        </div>
        <h1 className=" text-lg text-center">Panel de control</h1>
        <h1 className=" text-lg text-center">Menu</h1>
        <Divider className="mt-2"/>

        <Menu
          className="bg-white custom-menu"
          theme="light"
          mode="inline"
          defaultActiveFirst
          defaultSelectedKeys={["4"]}
          onClick={onClick}
          items={items}
        />
        {!collapsed && (
          <div style={{ position: "absolute", bottom: "20px", width: "100%" }}>
            <Button
              icon={<FaSignOutAlt />} 
              onClick={handleLogout}
              style={{ width: "100%", textAlign: "left" }}
              className="border-none bg-[blanco] shadow-lg"
            >
              Cerrar Sesión
            </Button>
          </div>
        )}
      </Sider>
      <Layout
        style={{
          marginLeft: windowsize.width > 768 && !collapsed ? 250 : 0,
          transition: "margin-left 0.2s",
        }}
      >
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            className="trigger flex items-center"
            onClick={() => setcollapsed(!collapsed)}
            style={{ padding: "0 24px", fontSize: "18px", cursor: "pointer" }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            <h1 className="w-full text-center font-medium">{currentTitle}</h1>
          </div>
          
        </Header>
        <Content
          className="max-w-screen-xl mx-auto w-full p-5"
          // style={{ margin: "24px 16px 0", overflow: "initial" }}
        >
          {renderComponent()}
        </Content>
      </Layout>
      <style jsx global>{`
        .custom-menu .ant-menu-item {
          height: auto;
          line-height: 1.5;
          padding: 6px 14px;
          white-space: normal;
        }
        .custom-menu .ant-menu-item-icon {
          min-width: 14px;
          font-size: 18px;
          margin-right: 10px;
        }
        .custom-menu .ant-menu-title-content {
          flex: 1;
          overflow-wrap: break-word;
          word-wrap: break-word;
          white-space: normal;
        }
      `}</style>
    </Layout>
  );
}
