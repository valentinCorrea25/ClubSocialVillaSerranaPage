import Image from "next/image";
import Footer from "@/components/home/Footer";
import ListaCatHome from "@/components/home/ListaCatHome/ListaCatHome";
import { ListaDeUltimasPublicaciones } from "@/components/home/publicacionesHome/PostList";
import Mapa from "@/components/home/MostrarMapa/Mapa";
import SobreNosotros from "@/components/home/SobreNosotros/SobreNosotros";
import MainVideo from "@/components/home/MainVideo";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F6EE]">
      <MainVideo/>
      <main className="flex-1 flex justify-center items-center text-5xl py-20">
        <ListaCatHome />
      </main>
      <ListaDeUltimasPublicaciones />
      <Mapa />
      <SobreNosotros />
    </div>
  );
}

