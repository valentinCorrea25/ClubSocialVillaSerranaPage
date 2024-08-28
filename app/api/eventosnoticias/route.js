import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req){
    const data = await req.json();
    console.log(data);

    try {
        const eventonoticias = await prisma.eventosNoticia.create({data});
        return NextResponse.json({
            message: `${eventonoticias.fecha_evento ? 'Evento creado' : 'Noticia creada'} con exito\nid: ${eventonoticias.id_EventoNoticia}`
        })
    } 
    catch (error) {
        return NextResponse.json({
            message: 'Hubo un error al crear la publicacion, contactar con desarollador',
            code: 500
        })
    }
}