import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req){
    const data = await req.json();
    console.log(data);

    try {
        const alquiler = await prisma.alquiler.create({data});
        
        return NextResponse.json({
            message: `Alquiler creado con exito \nid: ${alquiler.id_Alquiler}`
        })
    } 
    catch (error) {
        return NextResponse.json({
            message: 'Hubo un error al crear el Alquiler, contactar con desarollador',
            code: 500
        })
    }
}