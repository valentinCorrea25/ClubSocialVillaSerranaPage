import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        nombre:true,
        id: true
      }
    });

    return NextResponse.json({
        usuarios
      });
  } catch (error) {
    return NextResponse.json({
      message:
        "Hubo un error en Usuarios, contactar con desarollador",
      code: 500,
    });
  }
}