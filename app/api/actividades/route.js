import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  console.log(data);

  try {
    const actividad = await prisma.actividad.create({ data });
    
    return NextResponse.json({
      message: `Actividad creada con exito\nid: ${actividad.id_Actividad}`,
    });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({
      message:
        "Hubo un error al crear el Actividades, contactar con desarollador",
      code: 500,
    });
  }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 9;

    const publicaciones = await prisma.actividad.findMany({
        take: limit,
        where:{
          publicado: true
      },
        orderBy: {
          fecha_publicacion: 'desc'
      },
    });
    if(!publicaciones) return NextResponse.json({message: 'Sin Publicaciones'});

    return NextResponse.json(publicaciones);
}
