import prisma from "@/libs/prisma";
const { NextResponse } = require("next/server");
const bcrypt = require("bcrypt");

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data);

    const hasRepeteadName = await prisma.usuario.findFirst({
      where: {
        nombre: data.nombre,
      },
    });

    const count = await prisma.usuario.count();

    if(count >= 6){
      return NextResponse.json({
        message: `No pueden crearse mas de 5 usuarios, sin contar al usuario principal`,
        code: 500,
      });
    }

    if (hasRepeteadName) {
      return NextResponse.json({
        message: `Nombre de usuario ya utilizado: ${hasRepeteadName.nombre}`,
        code: 500,
      });
    }

    data.hashPass = await bcrypt.hash(data.hashPass, 10);
    const result = await prisma.usuario.create({ data });

    console.log(result);

    return NextResponse.json({
      message: `El usuario ha sido creado \nid: ${result.id}`,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: `Error al crear usuario \nid: ${result.id}`,
      code: 500,
    });
  }
}
