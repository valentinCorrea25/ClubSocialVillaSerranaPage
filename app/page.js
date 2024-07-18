import Image from "next/image";
import Footer from "@/components/home/Footer";
import ListaCatHome from "@/components/home/ListaCatHome/ListaCatHome";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F6EE]">
      <main className="flex-1 flex justify-center items-center text-5xl p-20">
        <ListaCatHome/>
      </main>
    </div>
  );
}
 