import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req){
    const data = await req.json();
    console.log(data);
    // data.coordenadas = convertirAUrlEmbed(data.coordenadas);
    

    try {
        const restaurant = await prisma.restaurant.create({data});
        return NextResponse.json({
            message: `Restaurant creada con exito\nid: ${restaurant.id_Restaurant}`
        })
    } 
    catch (error) {
        console.log(error);
        
        return NextResponse.json({
            message: 'Hubo un error al crear el Restaurant, contactar con desarollador',
            code: 500
        })
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 9;

    const total = await prisma.restaurant.count();
    const random = Math.floor(Math.random() * (total - 9 < 1 ? 1 : total - 9));

    const publicaciones = await prisma.restaurant.findMany({
        skip: random,
        take: limit,
        orderBy: {
            fecha_publicacion: 'desc'
        },
        where:{
            publicado: true
        },
    });
    if(!publicaciones) return NextResponse.json({message: 'Sin Publicaciones'});

    return NextResponse.json(publicaciones);
}