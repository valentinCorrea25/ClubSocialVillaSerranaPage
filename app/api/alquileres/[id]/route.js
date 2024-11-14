import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const alquiler = await prisma.alquiler.findUnique({
      where: {
        id_Alquiler: Number(params.id),
        publicado: true
      },
    });

    if (!alquiler) {
      return NextResponse.json({
        message: "Alquiler no encontrado",
        code: 400,
      });
    }

    const publicacionesRelacionadas = await prisma.alquiler.findMany({
      where: {
        id_Alquiler: {
          not: alquiler.id_Alquiler,
        },
        publicado: true,
      },
      take: 5,
    });
    

    const respuesta = {publicacion: alquiler, publicacionesRelacionadas: publicacionesRelacionadas ? publicacionesRelacionadas : null}
    return NextResponse.json({respuesta});

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Hubo un error en Alquileres, contactar con desarollador",
      code: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.alquiler.delete({
      where: {
        id_Alquiler: Number(params.id),
      },
    });

    return NextResponse.json({
      message: 'Alquiler eliminada con exito'
    });

  } catch (error) {
    console.log(error);
    if(error.code === 'P2025'){
      return NextResponse.json({
        message: "Alquiler no encontrada",
        code: 500,
      });
    }

    return NextResponse.json({
      message: "Hubo un error al borrar en Alquileres, contactar con desarollador",
      code: 500,
    });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();
  console.log(data);

  try {
    const alquiler = await prisma.alquiler.update({
      where: {
        id_Alquiler: Number(params.id),
      },
      data: data.datos // De esta manera es posible pasar los valores a la claves que coincidan con el schema
    });

    return NextResponse.json({
      message: 'Alquiler modificado con exito'
    });

  } catch (error) {
    console.log(error);
    if(error.code === 'P2025'){
      return NextResponse.json({
        message: "Alquiler no encontrada",
        code: 400,
      });
    }

    return NextResponse.json({
      message: "Hubo un error en Alquileres, contactar con desarollador",
      code: 500,
    });
  }
}
