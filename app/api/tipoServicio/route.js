import prisma from "@/libs/prisma";
import { ServicioTitulo } from '@prisma/client'
import { NextResponse } from "next/server";

export async function GET() {
    if(!ServicioTitulo) return NextResponse.json({message: 'Sin tipos de servicio'});

    return NextResponse.json(ServicioTitulo);
}