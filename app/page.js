import ListaCatHome from "@/components/home/ListaCatHome/ListaCatHome";
import { ListaDeUltimasPublicaciones } from "@/components/home/publicacionesHome/PostList";
import Mapa from "@/components/home/MostrarMapa/Mapa";
import MainVideo from "@/components/home/MainVideo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F6EE]">
      <MainVideo/>
      <ListaCatHome/>
      <ListaDeUltimasPublicaciones />
      <Mapa /> 
    </div>
  );
}

