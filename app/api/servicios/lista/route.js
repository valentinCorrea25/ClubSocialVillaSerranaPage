import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { searchParams } = new URL(request.url);
    const queryString = request.url.split("?")[1];
    const queryParams = new URLSearchParams(queryString);
    const pageValue = queryParams.get("page");
    const text = searchParams.get("text") == ''  ? null : searchParams.get("text");
    const page = pageValue ? parseInt(pageValue, 10) : 1;
    const pageSize = 25;
    const skip = (page - 1) * pageSize;
    const take = parseInt(pageSize);

    try {
      const where = text ? {
          titulo: {
              contains: text,
              mode: "insensitive"
          }
      } : {};
      const [servicios, total] = await Promise.all([
          prisma.servicio.findMany({
              where,
              skip: text ? undefined : skip,
              take: text ? undefined : take,
              orderBy: {
                id_Servicio: 'desc'
              }
          }),
          prisma.servicio.count({ where })
      ]);
      const totalPages = Math.ceil(total / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;
      
      return NextResponse.json({
          count: total,
          totalPages,
          currentPage: page,
          next: hasNextPage ? `/api/servicios/lista?page=${page + 1}${text ? `&text=${text}` : ''}` : null,
          previous: hasPreviousPage ? `/api/servicios/lista?page=${page - 1}${text ? `&text=${text}` : ''}` : null,
          publicaciones: servicios,
      });
  } catch (error) {
      console.error('Error in servicios API:', error);
      return NextResponse.json({
          message: "Hubo un error en Alquileres, contactar con desarollador",
          code: 500,
      }, { status: 500 });
  }
}