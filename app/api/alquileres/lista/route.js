import { excluirNoPublicados } from "@/components/utils/ControlPublicaciones";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const queryString = request.url.split("?")[1];
  const queryParams = new URLSearchParams(queryString);
  const pageValue = queryParams.get("page");
  const text = searchParams.get("text") == "" ? null : searchParams.get("text");
  const web = searchParams.get("web") == "" ? null : searchParams.get("web");
  const capacity =
    searchParams.get("capacity") == "" ? null : searchParams.get("capacity");
  const page = pageValue ? parseInt(pageValue, 10) : 1;
  const pageSize = web ? 9 : 25;
  const skip = (page - 1) * pageSize;
  const take = parseInt(pageSize);

  try {
    const where = {
      ...(text
        ? {
            titulo: {
              contains: text,
              mode: "insensitive",
            },
          }
        : web
        ? { publicado: true }
        : {}),
      ...(capacity ? { capacidad: parseInt(capacity) } : {}),
    };

    const [alquileres, total] = await Promise.all([
      prisma.alquiler.findMany({
        where,
        skip: text ? undefined : skip,
        take: text ? undefined : take,
        orderBy: {
          id_Alquiler: "desc",
        },
      }),
      prisma.alquiler.count({ where }),
    ]);
    const totalPages = Math.ceil(total / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({
      count: total,
      totalPages,
      currentPage: page,
      next: hasNextPage
        ? `/api/alquileres/lista?page=${page + 1}${
            text ? `&text=${text}` : ""
          }${web ? "&web=true" : ""}`
        : null,
      previous: hasPreviousPage
        ? `/api/alquileres/lista?page=${page - 1}${
            text ? `&text=${text}` : ""
          }${web ? "&web=true" : ""}`
        : null,
      publicaciones: web ? excluirNoPublicados(alquileres) : alquileres,
    });
  } catch (error) {
    console.error("Error in alquileres API:", error);
    return NextResponse.json(
      {
        message: "Hubo un error en Alquileres, contactar con desarollador",
        code: 500,
      },
      { status: 500 }
    );
  }
}
