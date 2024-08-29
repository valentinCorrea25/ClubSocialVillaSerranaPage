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
    return NextResponse.json({
      message:
        "Hubo un error al crear el Actividades, contactar con desarollador",
      code: 500,
    });
  }
}
