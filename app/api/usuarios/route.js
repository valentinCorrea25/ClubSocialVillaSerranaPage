import prisma from "@/libs/prisma";
const { NextResponse } = require("next/server");
const bcrypt = require('bcrypt');

export async function POST(req){
    const data = await req.json();
    console.log(data);
    
    const hasRepeteadName = await prisma.usuario.findFirst({where: {
        nombre: data.nombre,
      },});

    if(hasRepeteadName){
        return NextResponse.json({
            message: `Nombre de usuario ya utilizado! \n id: ${hasRepeteadName.id}`,
            code: 500
        })
    }

    data.hashPass = await bcrypt.hash(data.hashPass, 10);
    const result = await prisma.usuario.create({data})
    
    console.log(result);

    return NextResponse.json({
        message: `El usuario ha sido creado \nid: ${result.id}`
    })
}