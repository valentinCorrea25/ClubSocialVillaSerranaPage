import React, { useState } from 'react'
import { Table } from 'antd';
import { HiMenu } from "react-icons/hi";
import { Button } from 'antd/es/radio';
import { Dropdown, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

export default function TodasLasPublicaciones() {
  const [optionsVisible ,setOptionsVisible] = useState(false);

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: 'a danger item',
    },
  ];

  const dataSource = [
    {
      key: '1',
      foto: <img src='https://picsum.photos/id/160/200/110'/>,
      title: 'Parrila el cania',
      ubicacion: <a href='https://www.google.com/maps/place/Domingo+P%C3%A9rez+740,+30000+Minas,+Departamento+de+Lavalleja/@-34.3738391,-55.2349163,21z/data=!4m6!3m5!1s0x950aba2fb28ebfb9:0xbac440ceb51919e9!8m2!3d-34.3738226!4d-55.2349413!16s%2Fg%2F11h80370ps?entry=ttu' target='_blank'>Ubicacion a GoogleMaps</a>,
      tipo_publicacion: 'Restaurant',
      opt: <Button className='flex justify-center items-center w-5'>
             <HiMenu />
          </Button>
    },
    {
      key: '2',
      foto: <img src='https://picsum.photos/id/163/200/110'/>,
      title: 'Casita',
      ubicacion: <a href='https://www.google.com/maps/place/Domingo+P%C3%A9rez+740,+30000+Minas,+Departamento+de+Lavalleja/@-34.3738391,-55.2349163,21z/data=!4m6!3m5!1s0x950aba2fb28ebfb9:0xbac440ceb51919e9!8m2!3d-34.3738226!4d-55.2349413!16s%2Fg%2F11h80370ps?entry=ttu' target='_blank'>Ubicacion a GoogleMaps</a>,
      tipo_publicacion: 'Alquiler',
      opt: <Button className='flex justify-center items-center w-5'>
             <HiMenu />
          </Button>
    },
    {
      key: '4',
      foto: <img src='https://picsum.photos/id/162/200/110'/>,
      title: 'Casa grande',
      ubicacion: <a href='https://www.google.com/maps/place/Domingo+P%C3%A9rez+740,+30000+Minas,+Departamento+de+Lavalleja/@-34.3738391,-55.2349163,21z/data=!4m6!3m5!1s0x950aba2fb28ebfb9:0xbac440ceb51919e9!8m2!3d-34.3738226!4d-55.2349413!16s%2Fg%2F11h80370ps?entry=ttu' target='_blank'>Ubicacion a GoogleMaps</a>,
      tipo_publicacion: 'Alquiler',
      opt: <Button className='flex justify-center items-center w-5'>
             <HiMenu />
          </Button>
    },
    {
      key: '5',
      foto: <img src='https://picsum.photos/id/165/200/110'/>,
      title: 'el marocoyo',
      ubicacion: <a href='https://www.google.com/maps/place/Domingo+P%C3%A9rez+740,+30000+Minas,+Departamento+de+Lavalleja/@-34.3738391,-55.2349163,21z/data=!4m6!3m5!1s0x950aba2fb28ebfb9:0xbac440ceb51919e9!8m2!3d-34.3738226!4d-55.2349413!16s%2Fg%2F11h80370ps?entry=ttu' target='_blank'>Ubicacion a GoogleMaps</a>,
      tipo_publicacion: 'Alquiler',
      opt: <Button className='flex justify-center items-center w-5'>
             <HiMenu />
          </Button>
    },
    {
      key: '6',
      foto: <img src='https://picsum.photos/id/166/200/110'/>,
      title: 'la pizzeta',
      ubicacion: <a href='https://www.google.com/maps/place/Domingo+P%C3%A9rez+740,+30000+Minas,+Departamento+de+Lavalleja/@-34.3738391,-55.2349163,21z/data=!4m6!3m5!1s0x950aba2fb28ebfb9:0xbac440ceb51919e9!8m2!3d-34.3738226!4d-55.2349413!16s%2Fg%2F11h80370ps?entry=ttu' target='_blank'>Ubicacion a GoogleMaps</a>,
      tipo_publicacion: 'Alquiler',
      opt: <Button className='flex justify-center items-center w-5'>
             <HiMenu />
          </Button>
    },
    {
      key: '7',
      foto: <img src='https://picsum.photos/id/167/200/110'/>,
      title: 'natufood',
      ubicacion: <a href='https://www.google.com/maps/place/Domingo+P%C3%A9rez+740,+30000+Minas,+Departamento+de+Lavalleja/@-34.3738391,-55.2349163,21z/data=!4m6!3m5!1s0x950aba2fb28ebfb9:0xbac440ceb51919e9!8m2!3d-34.3738226!4d-55.2349413!16s%2Fg%2F11h80370ps?entry=ttu' target='_blank'>Ubicacion a GoogleMaps</a>,
      tipo_publicacion: 'Restaurant',
      opt: <Button className='flex justify-center items-center w-5'>
             <HiMenu />
          </Button>
    },
    {
      key: '8',
      foto: <img src='https://picsum.photos/id/168/200/110'/>,
      title: 'michale jackson',
      ubicacion: <a href='https://www.google.com/maps/place/Domingo+P%C3%A9rez+740,+30000+Minas,+Departamento+de+Lavalleja/@-34.3738391,-55.2349163,21z/data=!4m6!3m5!1s0x950aba2fb28ebfb9:0xbac440ceb51919e9!8m2!3d-34.3738226!4d-55.2349413!16s%2Fg%2F11h80370ps?entry=ttu' target='_blank'>Ubicacion a GoogleMaps</a>,
      tipo_publicacion: 'Noticia',
      opt: <Button className='flex justify-center items-center w-5'>
             <HiMenu />
          </Button>
    },
  ];
  
  const columns = [
    {
      title: 'foto',
      dataIndex: 'foto',
      key: 'foto',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'ubicacion',
      dataIndex: 'ubicacion',
      key: 'ubicacion',
    },
    {
      title: 'tipo publicacion',
      dataIndex: 'tipo_publicacion',
      key: 'tipo_publicacion',
    },
    {
      title: 'Opciones',
      dataIndex: 'opt',
      key: 'opt',
    },
  ];
  
  
  return (
    <div className='p-10'>
      <h1 className='text-center'>Tabla de todas las publicaciones</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
