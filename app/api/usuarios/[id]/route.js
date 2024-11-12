import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const USUARIO_PRICIPAL = 7

    if (params.id == USUARIO_PRICIPAL) {
      return NextResponse.json({
        message: "No se puede eliminar al usuario pricipal Martin",
        code: 500,
      });
    }
    await prisma.usuario.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json({
      message: "Usuario eliminado con exito",
    });
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      return NextResponse.json({
        message: "Usuario no encontrado",
        code: 500,
      });
    }

    return NextResponse.json({
      message:
        "Hubo un error al borrar en Usuarios, contactar con desarollador",
      code: 500,
    });
  }
}
