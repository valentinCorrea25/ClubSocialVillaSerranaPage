import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  if(!params.id){
    return NextResponse.json({
      message: "Id no entrado",
      code: 500,
    });
  }
  
  try {

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id_Restaurant: Number(params.id),
      },
    });

    if (!restaurant) {
      return NextResponse.json({
        message: "Restaurant no encontrado",
        code: 400,
      });
    }

    const count = await prisma.restaurant.count();
    const skip = Math.floor(Math.random() * count);

    const publicacionesRelacionadas = await prisma.restaurant.findMany({
      where: {
        id_Restaurant: {
          not: restaurant.id_Restaurant,
        },
      },
      take: 5,
      skip: skip,
    });

    const respuesta = {publicacion: restaurant, publicacionesRelacionadas: publicacionesRelacionadas ? publicacionesRelacionadas : null}
    return NextResponse.json({respuesta});

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Hubo un error en Restaurant, contactar con desarollador",
      code: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.restaurant.delete({
      where: {
        id_Restaurant: Number(params.id),
      },
    });

    return NextResponse.json({
      message: 'Restaurant eliminado con exito'
    });

  } catch (error) {
    console.log(error);
    if(error.code === 'P2025'){
      return NextResponse.json({
        message: "Restaurant no encontrado",
        code: 500,
      });
    }

    return NextResponse.json({
      message: "Hubo un error al borrar en Restaurantes, contactar con desarollador",
      code: 500,
    });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();
  console.log(data);

  try {
    const restaurant = await prisma.restaurant.update({
      where: {
        id_Restaurant: Number(params.id),
      },
      data: data.datos // De esta manera es posible pasar los valores a la claves que coincidan con el schema
    });

    return NextResponse.json({
      message: 'Restaurant modificado con exito'
    });

  } catch (error) {
    console.log(error);
    if(error.code === 'P2025'){
      return NextResponse.json({
        message: "Restaurant no encontrado",
        code: 400,
      });
    }

    return NextResponse.json({
      message: "Hubo un error en Restaurantes, contactar con desarollador",
      code: 500,
    });
  }
}
