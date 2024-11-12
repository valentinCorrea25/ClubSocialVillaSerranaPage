import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const queryString = request.url.split("?")[1];
  const queryParams = new URLSearchParams(queryString);
  const pageValue = queryParams.get("page");
  const text = searchParams.get("text") == "" ? null : searchParams.get("text");
  const page = pageValue ? parseInt(pageValue, 10) : 1;
  const web = searchParams.get("web") == "" ? null : searchParams.get("web");
  const pageSize = web ? 9 : 25;
  const skip = (page - 1) * pageSize;
  const take = parseInt(pageSize);

  try {
    const where = text
      ? {
          titulo: {
            contains: text,
            mode: "insensitive",
          },
        }
      : web
      ? { publicado: true }
      : {};
    const [actividades, total] = await Promise.all([
      prisma.actividad.findMany({
        where,
        skip: text ? undefined : skip,
        take: text ? undefined : take,
        orderBy: {
          id_Actividad: "desc",
        },
      }),
      prisma.actividad.count({ where }),
    ]);
    const totalPages = Math.ceil(total / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({
      count: total,
      totalPages,
      currentPage: page,
      next: hasNextPage
        ? `/api/actividades/lista?page=${page + 1}${
            text ? `&text=${text}` : ""
          }`
        : null,
      previous: hasPreviousPage
        ? `/api/actividades/lista?page=${page - 1}${
            text ? `&text=${text}` : ""
          }`
        : null,
      publicaciones: actividades,
    });
  } catch (error) {
    console.error("Error in actividades API:", error);
    return NextResponse.json(
      {
        message: "Hubo un error en Alquileres, contactar con desarollador",
        code: 500,
      },
      { status: 500 }
    );
  }
}
