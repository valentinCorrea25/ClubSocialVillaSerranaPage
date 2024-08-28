import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { ServicioTitulo } from "@prisma/client";

export async function POST(req){
    const data = await req.json();
    console.log(data);

    try {
        console.log(ServicioTitulo);
        
        if (!ServicioTitulo[data.titulo_Servicio]) {
            return NextResponse.json({
                message: 'El título del servicio no es válido.',
                code: 500
            });
        }

        const servicio = await prisma.servicio.create({data});
        return NextResponse.json({
            message: `Servicio creada con exito\nid: ${servicio.id_Servicio}`
        })
    } 
    catch (error) {
        return NextResponse.json({
            message: 'Hubo un error al crear el Servicio, contactar con desarollador',
            code: 500
        })
    }
}