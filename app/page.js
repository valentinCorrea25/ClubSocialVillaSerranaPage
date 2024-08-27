import ListaCatHome from "@/components/home/ListaCatHome/ListaCatHome";
import { ListaDeUltimasPublicaciones } from "@/components/home/publicacionesHome/PostList";
import Mapa from "@/components/home/MostrarMapa/Mapa";
import SobreNosotros from "@/components/home/SobreNosotros/SobreNosotros";
import MainVideo from "@/components/home/MainVideo";



export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F6EE]">
      <MainVideo/>
      <ListaCatHome />
      <ListaDeUltimasPublicaciones />
      <Mapa />
      {/* <SobreNosotros />  // cambiar a sobre nosotros y aca poner lo que hay actualmente en sobre nosotros*/} 
    </div>
  );
}

