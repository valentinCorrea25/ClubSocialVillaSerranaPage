import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Switch } from 'antd';

import { FaHouse } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";
import { FaPeopleCarry } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";


const items = [
  {
    key: 'sub1',
    label: 'Todas las Publicaciones',
    icon: <AiOutlineRead />,
  },
  {
    key: 'sub1',
    label: 'Alquileres',
    icon: <FaHouse />,
  },
  {
    key: 'sub1',
    label: 'Restaurantes',
    icon: <GiKnifeFork />,
  },
  {
    key: 'sub1',
    label: 'Noticias, Actividades y Eventos',
    icon: <FaRegNewspaper />,
  },
  {
    key: 'sub1',
    label: 'Servicios',
    icon: <FaPeopleCarry />,
  },
  {
    key: 'sub1',
    label: 'Crear Nuevo Usuario',
    icon: <FaUserEdit />,
  },
];

const Alquileres = () => {
  const [current, setCurrent] = useState('1');

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="vertical"
        
        items={items}
      />
    </>
  );
};

export default Alquileres;
