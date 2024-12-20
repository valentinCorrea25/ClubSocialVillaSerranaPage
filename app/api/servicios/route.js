import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { ServicioTitulo } from "@prisma/client";

export async function POST(req) {
  const data = await req.json();
  console.log(data);

  try {
    console.log(ServicioTitulo[data.titulo_Servicio]);

    if (!ServicioTitulo[data.titulo_Servicio]) {
      return NextResponse.json({
        message: "El título del servicio no es válido.",
        code: 500,
      });
    }

    const servicio = await prisma.servicio.create({ data });
    return NextResponse.json({
      message: `Servicio creada con exito\nid: ${servicio.id_Servicio}`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Hubo un error al crear el Servicio, contactar con desarollador",
      code: 500,
    });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit")) || 9;

  const total = await prisma.servicio.count();
  const random = Math.floor(Math.random() * (total - 9 < 1 ? 1 : total - 9));

  const publicaciones = await prisma.servicio.findMany({
    skip: random,
    take: limit,
    where: {
      publicado: true,
    },
  });
  if (!publicaciones)
    return NextResponse.json({ message: "Sin Publicaciones" });

  return NextResponse.json(publicaciones);
}
