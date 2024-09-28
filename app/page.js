import ListaCatHome from "@/components/home/ListaCatHome/ListaCatHome";
import { ListaDeUltimasPublicaciones } from "@/components/home/publicacionesHome/PostList";
import Mapa from "@/components/home/MostrarMapa/Mapa";
import MainVideo from "@/components/home/MainVideo";
import dynamic from 'next/dynamic';

const ListaCategorias = dynamic(() => import('@/components/home/ListaCatHome/ListaCatHome'), { ssr: false });


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F6EE]">
      <MainVideo/>
      <ListaCategorias/>
      <ListaDeUltimasPublicaciones />
      <Mapa /> 
    </div>
  );
}

