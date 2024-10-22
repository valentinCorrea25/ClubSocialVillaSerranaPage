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
      const [eventosnoticias, total] = await Promise.all([
          prisma.eventosNoticia.findMany({
              where,
              skip: text ? undefined : skip,
              take: text ? undefined : take,
              orderBy: {
                id_EventoNoticia: 'desc'
              }
          }),
          prisma.eventosNoticia.count({ where })
      ]);
      const totalPages = Math.ceil(total / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;
      
      return NextResponse.json({
          count: total,
          totalPages,
          currentPage: page,
          next: hasNextPage ? `/api/eventosnoticias/lista?page=${page + 1}${text ? `&text=${text}` : ''}` : null,
          previous: hasPreviousPage ? `/api/eventosnoticias/lista?page=${page - 1}${text ? `&text=${text}` : ''}` : null,
          publicaciones: eventosnoticias,
      });
  } catch (error) {
      console.error('Error in eventosnoticias API:', error);
      return NextResponse.json({
          message: "Hubo un error en Alquileres, contactar con desarollador",
          code: 500,
      }, { status: 500 });
  }
}