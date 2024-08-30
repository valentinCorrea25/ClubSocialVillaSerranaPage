import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function POST(req){
    const data = await req.json();
    // const session = await getServerSession(authOptions); // AGREGAR ESTO AL RESTO DE RUTAS O CAMBIAR EL PARADIGMA DE RUTAS
    // if (!session)
    //     return NextResponse.json({
    //       message: "Wait a second! You are not allow to do this",
    //       code: 401,
    // });

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

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 3;

    const publicaciones = await prisma.eventosNoticia.findMany({
        orderBy: {
            fecha_publicacion: 'desc',
        },
        take: limit,
    });
    if(!publicaciones) return NextResponse.json({message: 'Sin Publicaciones'});

    return NextResponse.json(publicaciones);
}
