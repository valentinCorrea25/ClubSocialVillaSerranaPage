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
    const servicio = await prisma.servicio.findMany({
      skip,
      take,
    });

    const total = await prisma.servicio.count();

    return NextResponse.json({
        count: total,
        next: `/api/servicios/page?page=${parseInt(page) + 1}`,
        previous:
          page > 1
            ? `api/servicios/page?page=${parseInt(page) - 1}`
            : null,
        publicaciones: servicio,
      });
  } catch (error) {
    return NextResponse.json({
      message:
        "Hubo un error en Servicios, contactar con desarollador",
      code: 500,
    });
  }
}