import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const eventosNoticia = await prisma.eventosNoticia.findUnique({
      where: {
        id_EventoNoticia: Number(params.id),
        publicado: true,
      },
    });

    if (!eventosNoticia) {
      return NextResponse.json({
        message: "Publicacion no encontrada",
        code: 400,
      });
    }
    eventosNoticia.fecha_evento
      ? (eventosNoticia.isEvento = true)
      : (eventosNoticia.isEvento = false);

    const publicacionesRelacionadas = await prisma.eventosNoticia.findMany({
      where: {
        id_EventoNoticia: {
          not: eventosNoticia.id_EventoNoticia,
        },
        publicado: true,
      },
      take: 5,
    });

    const respuesta = {
      publicacion: eventosNoticia,
      publicacionesRelacionadas: publicacionesRelacionadas
        ? publicacionesRelacionadas
        : null,
    };
    return NextResponse.json({ respuesta });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message:
        "Hubo un error en Eventos - Noticias, contactar con desarollador",
      code: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.eventosNoticia.delete({
      where: {
        id_EventoNoticia: Number(params.id),
      },
    });

    return NextResponse.json({
      message: "Evento - Noticia eliminada con exito",
    });
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      return NextResponse.json({
        message: "Evento - Noticia no encontrada",
        code: 500,
      });
    }

    return NextResponse.json({
      message:
        "Hubo un error al borrar en Evento - Noticia, contactar con desarollador",
      code: 500,
    });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();
  console.log(data);

  try {
    const eventosNoticia = await prisma.eventosNoticia.update({
      where: {
        id_EventoNoticia: Number(params.id),
      },
      data: data.datos, // De esta manera es posible pasar los valores a la claves que coincidan con el schema
    });

    console.log(eventosNoticia);

    return NextResponse.json({
      message: "Evento - Noticia modificada con exito",
    });
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      return NextResponse.json({
        message: "Evento - Noticia no encontrada",
        code: 400,
      });
    }

    return NextResponse.json({
      message: "Hubo un error en Evento - Noticia, contactar con desarollador",
      code: 500,
    });
  }
}
