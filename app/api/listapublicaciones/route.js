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

    // Primero obtenemos los conteos totales
    const [serviciosCount, actividadesCount, eventosNoticiasCount, restaurantesCount, alquileresCount] = await Promise.all([
      prisma.servicio.count({ where: whereClause }),
      prisma.actividad.count({ where: whereClause }),
      prisma.eventosNoticia.count({ where: whereClause }),
      prisma.restaurant.count({ where: whereClause }),
      prisma.alquiler.count({ where: whereClause }),
    ]);

    const totalCount = serviciosCount + actividadesCount + eventosNoticiasCount + restaurantesCount + alquileresCount;

    // Calculamos cuántos elementos obtener de cada modelo de forma proporcional
    const calculateTake = (modelCount) => {
      return Math.ceil((modelCount / totalCount) * PAGE_SIZE);
    };

    // Obtenemos los datos de forma dinámica
    const [servicios, actividades, eventosNoticias, restaurantes, alquileres] = await prisma.$transaction([
      prisma.servicio.findMany({ 
        where: whereClause, 
        orderBy: { fecha_publicacion: "desc" }, 
        take: calculateTake(serviciosCount),
        skip: offset 
      }),
      prisma.actividad.findMany({ 
        where: whereClause, 
        orderBy: { fecha_publicacion: "desc" }, 
        take: calculateTake(actividadesCount),
        skip: offset 
      }),
      prisma.eventosNoticia.findMany({ 
        where: whereClause, 
        orderBy: { fecha_publicacion: "desc" }, 
        take: calculateTake(eventosNoticiasCount),
        skip: offset 
      }),
      prisma.restaurant.findMany({ 
        where: whereClause, 
        orderBy: { fecha_publicacion: "desc" }, 
        take: calculateTake(restaurantesCount),
        skip: offset 
      }),
      prisma.alquiler.findMany({ 
        where: whereClause, 
        orderBy: { fecha_publicacion: "desc" }, 
        take: calculateTake(alquileresCount),
        skip: offset 
      }),
    ]);

    // Combina y ordena los resultados
    const allData = [...servicios, ...actividades, ...eventosNoticias, ...restaurantes, ...alquileres];
    const sortedData = allData
      .sort((a, b) => new Date(b.fecha_publicacion || 0) - new Date(a.fecha_publicacion || 0))
      .slice(0, PAGE_SIZE); // Nos aseguramos de no devolver más de PAGE_SIZE elementos

    return NextResponse.json({
      pageSize: sortedData.length,
      count: totalCount,
      next: totalCount > (page * PAGE_SIZE) 
        ? `/api/listapublicaciones?page=${page + 1}${text ? `&text=${encodeURIComponent(text)}` : ''}`
        : null,
      previous: page > 1 
        ? `/api/listapublicaciones?page=${page - 1}${text ? `&text=${encodeURIComponent(text)}` : ''}` 
        : null,
      publicaciones: sortedData,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Hubo un error en lista Publicaciones, contactar con desarrollador",
      code: 500,
    }, { status: 500 });
  }
}