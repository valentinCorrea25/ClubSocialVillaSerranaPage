import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const servicio = await prisma.servicio.findUnique({
      where: {
        id_Servicio: Number(params.id),
      },
    });

    if (!servicio) {
      return NextResponse.json({
        message: "Servicio no encontrado",
        code: 400,
      });
    }

    return NextResponse.json({servicio});

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Hubo un error en Servicio, contactar con desarollador",
      code: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.servicio.delete({
      where: {
        id_Servicio: Number(params.id),
      },
    });

    return NextResponse.json({
      message: 'Servicio eliminado con exito'
    });

  } catch (error) {
    console.log(error);
    if(error.code === 'P2025'){
      return NextResponse.json({
        message: "Servicio no encontrado",
        code: 500,
      });
    }

    return NextResponse.json({
      message: "Hubo un error al borrar en Servicioes, contactar con desarollador",
      code: 500,
    });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();
  console.log(data);

  try {
    const servicio = await prisma.servicio.update({
      where: {
        id_Servicio: Number(params.id),
      },
      data: data // De esta manera es posible pasar los valores a la claves que coincidan con el schema
    });

    console.log(servicio);

    return NextResponse.json({
      message: 'Servicio modificado con exito'
    });

  } catch (error) {
    console.log(error);
    if(error.code === 'P2025'){
      return NextResponse.json({
        message: "Servicio no encontrado",
        code: 400,
      });
    }

    return NextResponse.json({
      message: "Hubo un error en Servicio, contactar con desarollador",
      code: 500,
    });
  }
}