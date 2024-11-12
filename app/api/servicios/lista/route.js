import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const queryString = request.url.split("?")[1];
  const queryParams = new URLSearchParams(queryString);
  const pageValue = queryParams.get("page");
  const text = searchParams.get("text") == "" ? null : searchParams.get("text");
  const tipoServicio =
    searchParams.get("tiposervicio") == ""
      ? null
      : searchParams.get("tiposervicio");
  const page = pageValue ? parseInt(pageValue, 10) : 1;
  const web = searchParams.get("web") == "" ? null : searchParams.get("web");
  const pageSize = web ? 9 : 25;
  const skip = (page - 1) * pageSize;
  const take = parseInt(pageSize);

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

  if (!tipoServicio) {
    try {
      const [servicios, total] = await Promise.all([
        prisma.servicio.findMany({
          where,
          skip: text ? undefined : skip,
          take: text ? undefined : take,
          orderBy: {
            id_Servicio: "desc",
          },
        }),
        prisma.servicio.count({ where }),
      ]);
      const totalPages = Math.ceil(total / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return NextResponse.json({
        count: total,
        totalPages,
        currentPage: page,
        next: hasNextPage
          ? `/api/servicios/lista?page=${page + 1}${
              text ? `&text=${text}` : ""
            }${web ? "&web=true" : ""}`
          : null,
        previous: hasPreviousPage
          ? `/api/servicios/lista?page=${page - 1}${
              text ? `&text=${text}` : ""
            }${web ? "&web=true" : ""}`
          : null,
        publicaciones: servicios,
      });
    } catch (error) {
      console.error("Error in servicios API:", error);
      return NextResponse.json(
        {
          message: "Hubo un error en Servicios, contactar con desarollador",
          code: 500,
        },
        { status: 500 }
      );
    }
  } else {
    try {
      const [servicios, total] = await Promise.all([
        prisma.servicio.findMany({
          where: { titulo_Servicio: tipoServicio },
          skip: tipoServicio ? undefined : skip,
          take: tipoServicio ? undefined : take,
          orderBy: {
            id_Servicio: "desc",
          },
        }),
        prisma.servicio.count({ where: { titulo_Servicio: tipoServicio } }),
      ]);
      const totalPages = Math.ceil(total / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return NextResponse.json({
        count: total,
        totalPages,
        currentPage: page,
        next: hasNextPage
          ? `/api/servicios/lista?page=${page + 1}${
              tipoServicio ? `&tiposervicio=${tipoServicio}` : ""
            }${web ? "&web=true" : ""}`
          : null,
        previous: hasPreviousPage
          ? `/api/servicios/lista?page=${page - 1}${
              tipoServicio ? `&tiposervicio=${tipoServicio}` : ""
            }${web ? "&web=true" : ""}`
          : null,
        publicaciones: servicios,
      });
    } catch (error) {
      console.error("Error in servicios API:", error);
      return NextResponse.json(
        {
          message: "Hubo un error en Servicios, contactar con desarollador",
          code: 500,
        },
        { status: 500 }
      );
    }
  }
}
