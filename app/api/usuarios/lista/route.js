import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        nombre: true,
        id: true
      }
    });
    const response = NextResponse.json({
      usuarios,
      date: new Date().toString()
    });

    // Añadir headers anti-caché
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;

  } catch (error) {
    return NextResponse.json({
      message: "Hubo un error en Usuarios, contactar con desarollador",
      code: 500,
    });
  }
}