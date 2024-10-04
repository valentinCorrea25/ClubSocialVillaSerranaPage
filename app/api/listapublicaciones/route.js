import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

const PAGE_SIZE = 25;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const text = searchParams.get("text") == ''  ? null : searchParams.get("text");
  const take = Math.floor(PAGE_SIZE / 5);
  const skip = (page - 1) * take;

  console.log(text);
  

  try {
    const whereClause = text != undefined
      ? {
          OR: [
            { titulo: { contains: text, mode: "insensitive" } },
          ],
        }
      : {};

    const [servicios, actividades, eventosNoticias, restaurantes, alquileres] = await prisma.$transaction([
      prisma.servicio.findMany({ where: whereClause, orderBy: { fecha_publicacion: "desc" }, take, skip }),
      prisma.actividad.findMany({ where: whereClause, orderBy: { fecha_publicacion: "desc" }, take, skip }),
      prisma.eventosNoticia.findMany({ where: whereClause, orderBy: { fecha_publicacion: "desc" }, take, skip }),
      prisma.restaurant.findMany({ where: whereClause, orderBy: { fecha_publicacion: "desc" }, take, skip }),
      prisma.alquiler.findMany({ where: whereClause, orderBy: { fecha_publicacion: "desc" }, take, skip }),
    ]);

    // Calcular el total de publicaciones de todos los modelos
    const [serviciosCount, actividadesCount, eventosNoticiasCount, restaurantesCount, alquileresCount] = await Promise.all([
      prisma.servicio.count({ where: whereClause }),
      prisma.actividad.count({ where: whereClause }),
      prisma.eventosNoticia.count({ where: whereClause }),
      prisma.restaurant.count({ where: whereClause }),
      prisma.alquiler.count({ where: whereClause }),
    ]);

    const totalCount = serviciosCount + actividadesCount + eventosNoticiasCount + restaurantesCount + alquileresCount;

    // Combina y ordena los resultados
    const allData = [...servicios, ...actividades, ...eventosNoticias, ...restaurantes, ...alquileres];
    const sortedData = allData.sort((a, b) => new Date(b.fecha_publicacion || 0) - new Date(a.fecha_publicacion || 0));

    return NextResponse.json({
      pageSize: sortedData.length,
      count: totalCount,
      next: `/api/listapublicaciones?page=${page + 1}${text ? `&text=${encodeURIComponent(text)}` : ''}`,
      previous: page > 1 ? `/api/listapublicaciones?page=${page - 1}${text ? `&text=${encodeURIComponent(text)}` : ''}` : null,
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
