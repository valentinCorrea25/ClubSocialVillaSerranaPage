"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { Button, Divider, Layout, Menu, message, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { FaHouse } from "react-icons/fa6";
import { FaRegNewspaper, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";
import { FaPeopleCarry } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";
import Alquileres from "@/components/panelDeControl/Alquileres";
import { signOut } from "next-auth/react";
import FloatButtonCustom from "@/components/panelDeControl/FloatButtonCustom";
import {
  CloseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import CrearNuevoUsuario from "@/components/panelDeControl/CrearNuevoUsuario";
import NoticiasEA from "@/components/panelDeControl/NoticiasEA";
import TodasLasPublicaciones from "@/components/panelDeControl/TodasLasPublicaciones";
import Servicios from "@/components/panelDeControl/Servicios";
import Restaurantes from "@/components/panelDeControl/Restaurantes";
import Sider from "antd/es/layout/Sider";
import { Header, Content } from "antd/es/layout/layout";
import useWindowSize from "@/components/utils/useWindowSize";
import { AdminContext } from "@/context/adminContext";
import ModalCrearPublicacionesControl from "@/components/panelDeControl/modals/modalsCreacionDePublicaciones/ModalCrearPublicacionesControl";
import Actividades from "@/components/panelDeControl/Actividades";

export default function PanelDeControl() {
  const [currentComponent, setCurrentComponent] = useState(
    "TodasLasPublicaciones"
  );
  const [currentTitle, setCurrentTitle] = useState("Todas las Publicaciones");
  const router = useRouter();
  const colorBgContainer = "#fff";
  const windowsize = useWindowSize();
  const [collapsed, setcollapsed] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tipoDePublicacionACrear, setTipoDePublicacionACrear] = useState(false);
  const {
    mostrarFalloToast,
    mostrarExitoToast,
    mostrarCargarToast,
    contextHolder,
  } = useContext(AdminContext);
  const [isModalOpenCREACIONES, setIsModalOpenCREACIONES] = useState(false);

  useEffect(() => {
    setcollapsed(windowsize.width <= 768);
  }, [windowsize.width]);

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
      icon: <FaRegNewspaper />,
      label: "Actividades",
    },
    {
      key: "tmp-5",
      icon: <FaPeopleCarry />,
      label: "Servicios",
    },
    {
      key: "tmp-6",
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
        setCurrentComponent("Actividades");
        setCurrentTitle("Actividades");
        break;
      case "tmp-5":
        setCurrentComponent("Servicios");
        setCurrentTitle("Servicios");
        break;
      case "tmp-6":
        setCurrentComponent("CrearNuevoUsuario");
        setCurrentTitle("Control de Usuario");
        break;
    }
  }

  const renderComponent = () => {
    switch (currentComponent) {
      case "TodasLasPublicaciones":
        return (
          <TodasLasPublicaciones
            mostrarCargarToast={mostrarCargarToast}
            mostrarExitoToast={mostrarExitoToast}
            mostrarFalloToast={mostrarFalloToast}
            setModalIsOpenForButtonFloat={setModalIsOpen}
            setTipoDePublicacionACrear={setTipoDePublicacionACrear}
            setIsModalOpen={setIsModalOpenCREACIONES}
          />
        );
      case "Alquileres":
        return (
          <Alquileres
            mostrarCargarToast={mostrarCargarToast}
            mostrarExitoToast={mostrarExitoToast}
            mostrarFalloToast={mostrarFalloToast}
            setModalIsOpenForButtonFloat={setModalIsOpen}
            setTipoDePublicacionACrear={setTipoDePublicacionACrear}
            setIsModalOpen={setIsModalOpenCREACIONES}
          />
        );
      case "Restaurantes":
        return (
          <Restaurantes
            mostrarCargarToast={mostrarCargarToast}
            mostrarExitoToast={mostrarExitoToast}
            mostrarFalloToast={mostrarFalloToast}
            setModalIsOpenForButtonFloat={setModalIsOpen}
            setTipoDePublicacionACrear={setTipoDePublicacionACrear}
            setIsModalOpen={setIsModalOpenCREACIONES}
          />
        );
      case "NoticiasEA":
        return (
          <NoticiasEA
            mostrarCargarToast={mostrarCargarToast}
            mostrarExitoToast={mostrarExitoToast}
            mostrarFalloToast={mostrarFalloToast}
            setModalIsOpenForButtonFloat={setModalIsOpen}
            setTipoDePublicacionACrear={setTipoDePublicacionACrear}
            setIsModalOpen={setIsModalOpenCREACIONES}
          />
        );
      case "Servicios":
        return (
          <Servicios
            mostrarCargarToast={mostrarCargarToast}
            mostrarExitoToast={mostrarExitoToast}
            mostrarFalloToast={mostrarFalloToast}
            setModalIsOpenForButtonFloat={setModalIsOpen}
            setTipoDePublicacionACrear={setTipoDePublicacionACrear}
            setIsModalOpen={setIsModalOpenCREACIONES}
          />
        );
      case "CrearNuevoUsuario":
        return (
          <CrearNuevoUsuario
            mostrarCargarToast={mostrarCargarToast}
            mostrarExitoToast={mostrarExitoToast}
            mostrarFalloToast={mostrarFalloToast}
            setModalIsOpenForButtonFloat={setModalIsOpen}
          />
        );
        case "Actividades":
          return (
            <Actividades
              mostrarCargarToast={mostrarCargarToast}
              mostrarExitoToast={mostrarExitoToast}
              mostrarFalloToast={mostrarFalloToast}
              setModalIsOpenForButtonFloat={setModalIsOpen}
              setTipoDePublicacionACrear={setTipoDePublicacionACrear}
              setIsModalOpen={setIsModalOpenCREACIONES}
            />
          );
      default:
        return (
          <TodasLasPublicaciones
            mostrarCargarToast={mostrarCargarToast}
            mostrarExitoToast={mostrarExitoToast}
            mostrarFalloToast={mostrarFalloToast}
            setModalIsOpenForButtonFloat={setModalIsOpen}
            setTipoDePublicacionACrear={setTipoDePublicacionACrear}
            setIsModalOpen={setIsModalOpenCREACIONES}
          />
        );
    }
  };

  const onClick = (e) => {
    console.log("click ", e);
    if(windowsize.width <= 768){
      setcollapsed(true);
    }
    setComponent(e.key);
  };

  const handleLogout = () => {
    signOut();
    router.push("/admin");
  };

  return (
    <>
      {contextHolder} 
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          width={"250px"}
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
                  zIndex: 1001,
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
            <div className="absolute right-[-80%] top-5 transition-all ease-in-out opacity-100 block lg:opacity-0 lg:hidden pointer-events-none md:hidden">
              <CloseOutlined
                className="scale-125 bg-white p-2 trigger"
                onClick={() => setcollapsed(!collapsed)}
              />
            </div>
          </div>
          <h1 className=" text-lg text-center">Panel de control</h1>
          <h1 className=" text-lg text-center">Menu</h1>
          <Divider className="mt-2" />

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
            <div
              style={{ position: "absolute", bottom: "20px", width: "100%" }}
            >
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
            position: "relative",
          }}
        >
          {!collapsed && windowsize.width <= 768 && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Color negro semi-transparente
                zIndex: 1000,
                transition: "opacity 0.5s",
              }}
              onClick={() => setcollapsed(true)} // Cerrar el menú al hacer clic en el overlay
            />
          )}
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div
              className="trigger flex items-center justify-between"
              onClick={() => setcollapsed(!collapsed)}
              style={{ padding: "0 24px", fontSize: "18px", cursor: "pointer" }}
            >
              <div>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
              <h1 className="font-medium text-lg lg:text-xl pl-5 text-center flex-grow">
                {currentTitle}
              </h1>
              <div style={{ width: "24px" }}></div>{" "}
              {/* Placeholder to balance the layout */}
            </div>
          </Header>
          <Content className="max-w-screen-xl mx-auto lg:w-[60em] w-full p-5">
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
        {!modalIsOpen ? (
          <FloatButtonCustom
            setcollapsed={setcollapsed}
            setTipoDePublicacionACrear={setTipoDePublicacionACrear}
            setIsModalOpen={setIsModalOpenCREACIONES}
            setModalIsOpenForButtonFloat={setModalIsOpen}
            windowsize={windowsize}
          />
        ) : null}
        {tipoDePublicacionACrear ? (
          <ModalCrearPublicacionesControl
            tipoDePublicacion={tipoDePublicacionACrear}
            setIsModalOpen={setIsModalOpenCREACIONES}
            isModalOpen={isModalOpenCREACIONES}
            setModalIsOpenForButtonFloat={setModalIsOpen}

            mostrarCargarToast={mostrarCargarToast}
            mostrarExitoToast={mostrarExitoToast}
            mostrarFalloToast={mostrarFalloToast}
          />
        ) : null}
        
      </Layout>
    </>
  );
}
