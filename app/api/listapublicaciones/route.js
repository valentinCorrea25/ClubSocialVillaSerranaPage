import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

const PAGE_SIZE = 25;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const text = searchParams.get("text") == '' ? null : searchParams.get("text");
  const offset = (page - 1) * PAGE_SIZE;

  try {
    const whereClause = text != undefined
      ? {
          OR: [
            { titulo: { contains: text, mode: "insensitive" } },
          ],
        }
      : {};

    // Obtenemos todos los datos sin límite
    const [servicios, actividades, eventosNoticias, restaurantes, alquileres] = await prisma.$transaction([
      prisma.servicio.findMany({ 
        where: whereClause, 
        orderBy: { fecha_publicacion: "desc" }
      }),
      prisma.actividad.findMany({ 
        where: whereClause, 
        orderBy: { fecha_publicacion: "desc" }
      }),
      prisma.eventosNoticia.findMany({ 
        where: whereClause, 
        orderBy: { fecha_publicacion: "desc" }
      }),
      prisma.restaurant.findMany({ 
        where: whereClause, 
        orderBy: { fecha_publicacion: "desc" }
      }),
      prisma.alquiler.findMany({ 
        where: whereClause, 
        orderBy: { fecha_publicacion: "desc" }
      }),
    ]);

    // Combina todos los resultados
    const allData = [...servicios, ...actividades, ...eventosNoticias, ...restaurantes, ...alquileres];
    
    // Ordena por fecha de publicación
    const sortedData = allData.sort((a, b) => 
      new Date(b.fecha_publicacion || 0) - new Date(a.fecha_publicacion || 0)
    );

    const totalCount = sortedData.length;
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    // Aplicamos la paginación después de tener todos los datos ordenados
    const paginatedData = sortedData.slice(offset, offset + PAGE_SIZE);

    return NextResponse.json({
      pageSize: paginatedData.length,
      count: totalCount,
      totalPages,
      next: totalCount > (page * PAGE_SIZE) 
        ? `/api/listapublicaciones?page=${page + 1}${text ? `&text=${encodeURIComponent(text)}` : ''}`
        : null,
      previous: page > 1 
        ? `/api/listapublicaciones?page=${page - 1}${text ? `&text=${encodeURIComponent(text)}` : ''}` 
        : null,
      publicaciones: paginatedData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Hubo un error en lista Publicaciones, contactar con desarrollador",
      code: 500,
    }, { status: 500 });
  }
}