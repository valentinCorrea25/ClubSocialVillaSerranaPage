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
    const restaurant = await prisma.restaurant.findMany({
      skip,
      take,
    });

    const total = await prisma.restaurant.count();

    return NextResponse.json({
        count: total,
        next: `/api/restaurantes/page?page=${parseInt(page) + 1}`,
        previous:
          page > 1
            ? `api/restaurantes/page?page=${parseInt(page) - 1}`
            : null,
        publicaciones: restaurant,
      });
  } catch (error) {
    return NextResponse.json({
      message:
        "Hubo un error en Restaurantes, contactar con desarollador",
      code: 500,
    });
  }
}