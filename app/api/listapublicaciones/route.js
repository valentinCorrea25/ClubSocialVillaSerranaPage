import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const queryString = request.url.split("?")[1];
  const queryParams = new URLSearchParams(queryString);
  const pageValue = queryParams.get("page");
  const page = pageValue ? parseInt(pageValue, 10) : 1;
  const pageSize = 36;
  const skip = (page - 1) * (pageSize / 6);
  const take = parseInt(pageSize / 6);
  
  
  try {
    const data = await prisma.$transaction(async (tx) => {
      const servicios = await tx.servicio.findMany({
        orderBy: {
          fecha_publicacion: "asc",
        },
        skip,
        take,
      });

      const actividades = await tx.actividad.findMany({
        orderBy: {
          fecha_publicacion: "asc",
        },
        skip,
        take,
      });

      const eventosNoticias = await tx.eventosNoticia.findMany({
        orderBy: {
          fecha_publicacion: "asc",
        },
        skip,
        take,
      });

      const restaurantes = await tx.restaurant.findMany({
        orderBy: {
          fecha_publicacion: "asc",
        },
        skip,
        take,
      });

      const alquileres = await tx.alquiler.findMany({
        orderBy: {
          fecha_publicacion: "asc",
        },
        skip,
        take,
      });

      const totalACT = await prisma.actividad.count();
      const totalALQ = await prisma.alquiler.count();
      const totalRES = await prisma.restaurant.count();
      const totalEVT = await prisma.eventosNoticia.count();
      const totalSER = await prisma.servicio.count();

      const total = totalACT + totalALQ + totalRES + totalEVT + totalSER;

      return {
        servicios,
        actividades,
        eventosNoticias,
        restaurantes,
        alquileres,
        total,
      };
    });

    // Aplana los arrays en un solo array
    const allData = [
      ...data.servicios,
      ...data.actividades,
      ...data.eventosNoticias,
      ...data.alquileres,
      ...data.restaurantes,
    ];

    // Ordena el array combinado por fecha de publicación
    const sortedData = allData.sort((a, b) => {
      const dateA = a.fecha_publicacion
        ? new Date(a.fecha_publicacion)
        : new Date(0); // Si no hay fecha, asigna una fecha antigua
      const dateB = b.fecha_publicacion
        ? new Date(b.fecha_publicacion)
        : new Date(0);

      return dateA.getTime() - dateB.getTime(); // Ordena de más antiguo a más reciente
    });

    return NextResponse.json({
      count: data.total,
      next: `/api/listapublicaciones?page=${parseInt(page) + 1}`,
      previous:
        page > 1
          ? `api/listapublicaciones?page=${parseInt(page) - 1}`
          : null,
      publicaciones: sortedData,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Hubo un error en lista Publicaciones, contactar con desarollador",
      code: 500,
    });
  }
}
