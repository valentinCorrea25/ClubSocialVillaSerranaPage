import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req){
    const data = await req.json();
    try {
        const alquiler = await prisma.alquiler.create({data});
        
        return NextResponse.json({
            message: `Alquiler creado con exito \nid: ${alquiler.id_Alquiler}`
        })
    } 
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'Hubo un error al crear el Alquiler, contactar con desarollador',
            code: 500
        })
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 9;

    const total = await prisma.alquiler.count();
    const random = Math.floor(Math.random() * (total - 9 < 1 ? 1 : total - 9));

    const publicaciones = await prisma.alquiler.findMany({
        orderBy: {
            fecha_publicacion: 'desc'
        },
        skip: random,
        take: limit,
    });
    if(!publicaciones) return NextResponse.json({message: 'Sin Publicaciones'});

    return NextResponse.json(publicaciones);
}