import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const queryString = request.url.split("?")[1];
    const queryParams = new URLSearchParams(queryString);
    const pageValue = queryParams.get("page");
    const page = pageValue ? parseInt(pageValue, 10) : 1;
    const pageSize = 20;
    const skip = (page - 1) * pageSize;
    const take = parseInt(pageSize);

  try {
    const actividad = await prisma.actividad.findMany({
      skip,
      take,
    });

    const total = await prisma.actividad.count();

    return NextResponse.json({
        count: total,
        next: `/api/actividades/page?page=${parseInt(page) + 1}`,
        previous:
          page > 1
            ? `api/actividades/page?page=${parseInt(page) - 1}`
            : null,
        publicaciones: actividad,
      });
  } catch (error) {
    return NextResponse.json({
      message:
        "Hubo un error en Actividades, contactar con desarollador",
      code: 500,
    });
  }
}