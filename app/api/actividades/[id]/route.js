import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const actividad = await prisma.actividad.findUnique({
      where: {
        id_Actividad: Number(params.id),
      },
    });

    if (!actividad) {
      return NextResponse.json({
        message: "Actividad no encontrada",
        code: 400,
      });
    }

    return NextResponse.json({actividad});

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Hubo un error en Actividades, contactar con desarollador",
      code: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.actividad.delete({
      where: {
        id_Actividad: Number(params.id),
      },
    });

    return NextResponse.json({
      message: 'Actividad eliminada con exito'
    });

  } catch (error) {
    console.log(error);
    if(error.code === 'P2025'){
      return NextResponse.json({
        message: "Actividad no encontrada",
        code: 500,
      });
    }

    return NextResponse.json({
      message: "Hubo un error al borrar en Actividades, contactar con desarollador",
      code: 500,
    });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();
  console.log(data);

  try {
    const actividad = await prisma.actividad.update({
      where: {
        id_Actividad: Number(params.id),
      },
      data: data // De esta manera es posible pasar los valores a la claves que coincidan con el schema
    });

    console.log(actividad);

    return NextResponse.json({
      message: 'Actividad modificada con exito'
    });

  } catch (error) {
    console.log(error);
    if(error.code === 'P2025'){
      return NextResponse.json({
        message: "Actividad no encontrada",
        code: 400,
      });
    }

    return NextResponse.json({
      message: "Hubo un error en Actividades, contactar con desarollador",
      code: 500,
    });
  }
}